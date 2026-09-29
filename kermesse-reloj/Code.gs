/**
 * Kermesse Solidaria BDS — Reloj mecánico (P4B + P4C)
 * Backend de reservas de turnos de voluntarios.
 *
 * Base de datos: pestaña "Reservas" del Google Sheet al que está vinculado este script.
 * Columnas: Horario | Familia | Grado | Celular | Fecha y hora de reserva
 */

// ───────────────────────── CONFIGURACIÓN ─────────────────────────

var NOMBRE_HOJA = 'Reservas';
var CUPO_POR_TURNO = 2;
var GRADOS = ['P4B', 'P4C'];

var TURNOS = [
  '18:30 – 18:45',
  '18:45 – 19:00',
  '19:00 – 19:15',
  '19:15 – 19:30',
  '19:30 – 19:45',
  '19:45 – 20:00',
  '20:00 – 20:15',
  '20:15 – 20:30',
  '20:30 – 20:45',
  '20:45 – 21:00'
];

// Cuando tengas el logo, pegá acá el link público de la imagen (ver instrucciones).
// Mientras esté vacío, la cabecera muestra "BDS".
var LOGO_URL = '';

// Poné false para cerrar las reservas (la página sigue mostrando la disponibilidad).
var RESERVAS_ABIERTAS = true;

// Fecha del evento: se muestra en la pantalla principal, en el formulario y en la confirmación.
var FECHA_EVENTO = '6 de Noviembre';

var ENCABEZADOS = ['Horario', 'Familia', 'Grado', 'Celular', 'Fecha y hora de reserva'];

// ───────────────────────── PÁGINA WEB ─────────────────────────

function doGet() {
  var plantilla = HtmlService.createTemplateFromFile('Index');
  plantilla.logoUrl = LOGO_URL;
  plantilla.fecha = FECHA_EVENTO;
  return plantilla.evaluate()
    .setTitle('Kermesse Solidaria BDS · Reloj mecánico')
    // Sin esta línea, en celulares la página se ve "achicada".
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

// ───────────────────────── API PARA LA PÁGINA ─────────────────────────

/**
 * Devuelve SOLO horario + lugares disponibles. Nunca nombres ni celulares.
 */
function obtenerDisponibilidad() {
  var conteo = contarReservas_(obtenerHoja_());
  return {
    abiertas: RESERVAS_ABIERTAS,
    turnos: TURNOS.map(function (horario) {
      var ocupados = conteo[horario] || 0;
      return { horario: horario, disponibles: Math.max(0, CUPO_POR_TURNO - ocupados) };
    })
  };
}

/**
 * Registra una reserva. Todas las validaciones que dependen de la planilla
 * (familia ya anotada y cupo del horario) se hacen acá, en el servidor,
 * dentro de un bloqueo, para que dos personas no puedan tomar el mismo último lugar.
 */
function reservarTurno(datos) {
  if (!RESERVAS_ABIERTAS) {
    return { ok: false, codigo: 'CERRADO', mensaje: 'Las reservas están cerradas.' };
  }

  // 1) Validar y limpiar datos ANTES de bloquear (no hace falta el bloqueo para esto).
  var v = validarDatos_(datos);
  if (!v.ok) return v;

  // 2) Obtener el bloqueo: solo una reserva se procesa por vez.
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    return { ok: false, codigo: 'OCUPADO', mensaje: 'Hay muchas personas reservando en este momento. Probá de nuevo en unos segundos.' };
  }

  try {
    var hoja = obtenerHoja_();

    // 3) Con el bloqueo tomado, releer la planilla.
    var filas = leerReservas_(hoja);
    var clave = claveCelular_(v.celular);

    // 3a) Una familia = un turno: si ese celular ya tiene una reserva (en cualquier horario), no se guarda otra.
    for (var i = 0; i < filas.length; i++) {
      if (filas[i].clave === clave) {
        return {
          ok: false,
          codigo: 'YA_RESERVADO',
          mensaje: 'Esta familia ya tiene un turno reservado.',
          horario: filas[i].horario
        };
      }
    }

    // 3b) Contar las reservas de ESE horario.
    var ocupados = 0;
    for (var j = 0; j < filas.length; j++) {
      if (filas[j].horario === v.horario) ocupados++;
    }

    // 4) Si ya está completo, rechazar.
    if (ocupados >= CUPO_POR_TURNO) {
      return { ok: false, codigo: 'COMPLETO', mensaje: 'Ese horario acaba de completarse. Elegí otro horario disponible.' };
    }

    // 5) Guardar la reserva.
    var fila = hoja.getLastRow() + 1;
    // Texto plano en A:D para que Sheets no transforme el celular (+54…) ni el horario.
    hoja.getRange(fila, 1, 1, 4).setNumberFormat('@');
    hoja.getRange(fila, 5).setNumberFormat('dd/mm/yyyy hh:mm:ss');
    hoja.getRange(fila, 1, 1, 5).setValues([[v.horario, v.familia, v.grado, v.celular, new Date()]]);
    SpreadsheetApp.flush(); // asegura que quede escrita antes de liberar el bloqueo

    return { ok: true, horario: v.horario, familia: v.familia, grado: v.grado };
  } catch (e) {
    console.error(e);
    return { ok: false, codigo: 'ERROR', mensaje: 'No pudimos guardar la reserva. Probá de nuevo.' };
  } finally {
    // 6) Liberar el bloqueo siempre, pase lo que pase.
    lock.releaseLock();
  }
}

// ───────────────────────── FUNCIONES INTERNAS ─────────────────────────
// (Las que terminan en "_" no se pueden llamar desde la página web.)

function obtenerHoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
  }
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(ENCABEZADOS);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold');
    hoja.setFrozenRows(1);
    // Columnas de texto: evita que Sheets convierta horarios o celulares en números/horas.
    hoja.getRange('A:D').setNumberFormat('@');
  }
  return hoja;
}

function leerReservas_(hoja) {
  var ultimaFila = hoja.getLastRow();
  if (ultimaFila < 2) return [];
  var valores = hoja.getRange(2, 1, ultimaFila - 1, 4).getDisplayValues();
  var filas = [];
  for (var i = 0; i < valores.length; i++) {
    var h = normalizarHorario_(valores[i][0]);
    if (h) filas.push({ horario: h, clave: claveCelular_(valores[i][3]) });
  }
  return filas;
}

function contarReservas_(hoja) {
  var conteo = {};
  leerReservas_(hoja).forEach(function (f) { conteo[f.horario] = (conteo[f.horario] || 0) + 1; });
  return conteo;
}

// Identifica a una familia por su celular, sin importar cómo lo escriba:
// "+54 9 11 5555-5555", "011 15 5555 5555", "15 5555 5555" y "11 5555 5555" dan la misma clave.
// Se quitan los agregados argentinos (54, 9, 0 y el 15) y se comparan los últimos 8 dígitos.
function claveCelular_(texto) {
  var d = String(texto || '').replace(/\D/g, '');
  if (d.length > 10 && d.indexOf('54') === 0) d = d.slice(2);   // código de país
  if (d.length === 11 && d.charAt(0) === '9') d = d.slice(1);   // 9 de celular
  if (d.charAt(0) === '0') d = d.slice(1);                      // 0 de larga distancia
  if (d.length === 12) {                                        // característica + 15 + número
    for (var a = 2; a <= 4; a++) {
      if (d.substr(a, 2) === '15') { d = d.slice(0, a) + d.slice(a + 2); break; }
    }
  } else if (d.length === 10 && d.indexOf('15') === 0) {        // 15 + número, sin característica
    d = d.slice(2);
  }
  return d.slice(-8);
}

// Tolera variaciones si alguien edita la planilla a mano ("18:30-18:45", "18:30 - 18:45", etc.).
function normalizarHorario_(texto) {
  var m = String(texto).match(/(\d{1,2}):(\d{2})\s*[–\-]\s*(\d{1,2}):(\d{2})/);
  if (!m) return '';
  var pad = function (n) { return ('0' + n).slice(-2); };
  return pad(m[1]) + ':' + m[2] + ' – ' + pad(m[3]) + ':' + m[4];
}

function validarDatos_(datos) {
  datos = datos || {};
  var horario = normalizarHorario_(datos.horario || '');
  var familia = limpiarTexto_(datos.familia, 60);
  var grado = String(datos.grado || '').trim();
  var celular = String(datos.celular || '').replace(/[^\d+\s\-()]/g, '').trim().slice(0, 25);
  var digitos = celular.replace(/\D/g, '');

  if (TURNOS.indexOf(horario) === -1) {
    return { ok: false, codigo: 'DATOS', mensaje: 'Elegí un horario de la lista.' };
  }
  if (familia.length < 2) {
    return { ok: false, codigo: 'DATOS', mensaje: 'Escribí el apellido de la familia.' };
  }
  if (GRADOS.indexOf(grado) === -1) {
    return { ok: false, codigo: 'DATOS', mensaje: 'Elegí el grado.' };
  }
  if (digitos.length < 8 || digitos.length > 15) {
    return { ok: false, codigo: 'DATOS', mensaje: 'Revisá el número de celular.' };
  }
  return { ok: true, horario: horario, familia: familia, grado: grado, celular: celular };
}

function limpiarTexto_(texto, max) {
  var t = String(texto || '').replace(/\s+/g, ' ').trim().slice(0, max);
  // Evita que un texto que empieza con =, +, - o @ se interprete como fórmula en la planilla.
  return t.replace(/^[=+\-@]+/, '').trim();
}

// ───────────────────────── PARA LA ORGANIZADORA ─────────────────────────

/**
 * Ejecutala UNA vez desde el editor (botón "Ejecutar") para:
 *  - crear la pestaña "Reservas" con sus encabezados, y
 *  - dar los permisos que necesita el script.
 */
function configurarHoja() {
  var hoja = obtenerHoja_();
  console.log('Listo. Pestaña "' + hoja.getName() + '" preparada. Reservas actuales: ' + (hoja.getLastRow() - 1));
  console.log(JSON.stringify(obtenerDisponibilidad()));
}
