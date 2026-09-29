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

var ENCABEZADOS = ['Horario', 'Familia', 'Grado', 'Celular', 'Fecha y hora de reserva'];

// ───────────────────────── PÁGINA WEB ─────────────────────────

function doGet() {
  var plantilla = HtmlService.createTemplateFromFile('Index');
  plantilla.logoUrl = LOGO_URL;
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
 * Registra una reserva. La validación del cupo se hace acá (en el servidor),
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

    // 3) Volver a contar las reservas de ESE horario, con el bloqueo tomado.
    var filas = leerReservas_(hoja);
    var ocupados = 0;
    var digitos = v.celular.replace(/\D/g, '');
    for (var i = 0; i < filas.length; i++) {
      if (filas[i].horario !== v.horario) continue;
      // Si el mismo celular ya reservó este horario (p. ej. tocó dos veces o se cortó
      // la conexión y reintentó), no se duplica: se confirma la reserva existente.
      if (filas[i].digitos === digitos) {
        return { ok: true, horario: v.horario, familia: v.familia };
      }
      ocupados++;
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

    return { ok: true, horario: v.horario, familia: v.familia };
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
    if (h) filas.push({ horario: h, digitos: String(valores[i][3]).replace(/\D/g, '') });
  }
  return filas;
}

function contarReservas_(hoja) {
  var conteo = {};
  leerReservas_(hoja).forEach(function (f) { conteo[f.horario] = (conteo[f.horario] || 0) + 1; });
  return conteo;
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
