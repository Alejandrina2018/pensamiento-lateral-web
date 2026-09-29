# Reservas de turnos · Kermesse Solidaria BDS · Reloj mecánico (P4B + P4C)

Mini web para que cada familia reserve **un** turno de 15 minutos el **6 de Noviembre** (18:30 a 21:00, hasta 2 familias por turno).
Los datos se guardan en un Google Sheet que **solo vos** ves.

**Archivos:**

| Archivo | Qué es |
|---|---|
| `Code.gs` | El "motor": guarda reservas, controla el cupo, protege los datos. |
| `Index.html` | La pantalla que ven las familias (diseño + funcionamiento). |
| `capturas/` | Cómo se ve en el celular (solo de referencia, no hay que subirlas). |

---

## Paso a paso (sin conocimientos técnicos)

Usá una computadora y **una sola cuenta de Google** abierta (idealmente la del grupo o la tuya personal, la que va a "ser dueña" de la planilla).

### 1. Crear el Google Sheet
1. Entrá a <https://sheets.new> (se abre una planilla nueva y vacía).
2. Arriba a la izquierda, donde dice "Hoja de cálculo sin título", escribí: **Kermesse – Reloj mecánico – Turnos**.

### 2. Nombre de la pestaña
Abajo a la izquierda hay una pestaña que dice "Hoja 1". Hacé doble clic y cambiale el nombre a:

```
Reservas
```

(Con R mayúscula, sin espacios.) No hace falta escribir los encabezados: el sistema los crea solo en el paso 6.

### 3. Abrir Apps Script
Con la planilla abierta, en el menú de arriba: **Extensiones → Apps Script**.
Se abre una pestaña nueva con un editor de código. Arriba a la izquierda, donde dice "Proyecto sin título", ponele **Turnos Reloj mecánico**.

> Abrirlo **desde la planilla** es lo que "conecta" el código con el Sheet (paso 5). No lo crees desde otro lado.

### 4. Dónde pegar cada archivo
**Code.gs**
1. A la izquierda vas a ver un archivo `Código.gs` (o `Code.gs`) con unas líneas de ejemplo.
2. Borrá todo lo que tiene y pegá el contenido completo de `Code.gs`.
3. Guardá con el ícono del disquete (o Ctrl+S / Cmd+S).

**Index.html**
1. A la izquierda, al lado de "Archivos", tocá el **+** → **HTML**.
2. Escribí el nombre exactamente así: `Index` (sin ".html", Google lo agrega solo; I mayúscula).
3. Borrá lo que trae y pegá el contenido completo de `Index.html`.
4. Guardá.

Tienen que quedarte dos archivos: `Código.gs` e `Index.html`.

### 5. Conectar el código con el Google Sheet
Ya está: como abriste Apps Script desde **Extensiones** de la planilla, el código trabaja automáticamente sobre ese Sheet. No hay que pegar ningún ID ni link.

### 6. Permisos (se dan una sola vez)
1. Arriba, en la barra del editor, hay un desplegable con nombres de funciones. Elegí **configurarHoja**.
2. Tocá **Ejecutar**.
3. Google te va a pedir autorización: **Revisar permisos** → elegí tu cuenta.
4. Puede aparecer "Google no verificó esta app". Es normal porque la app la hiciste vos: tocá **Configuración avanzada** → **Ir a Turnos Reloj mecánico (no seguro)** → **Permitir**.

Qué permiso pide y por qué: **ver y editar hojas de cálculo** (para leer cuántas reservas hay y anotar las nuevas). No pide acceso a tu mail, a tu Drive entero ni a nada más.

Al terminar, volvé a la planilla: la pestaña **Reservas** tiene que tener la fila de títulos
`Horario | Familia | Grado | Celular | Fecha y hora de reserva`.

### 7. Probarlo antes de mandarlo
1. **Implementar → Probar implementaciones** → copiá la URL que termina en `/dev` y abrila. Es una versión de prueba que solo vos podés abrir.
2. Hacé una reserva de prueba y fijate que aparezca en la planilla.
3. Hacé una segunda reserva en el **mismo horario** con otro celular → tiene que pasar a **Completo**.
4. Intentá una tercera en ese horario desde otra pestaña que ya tenías abierta de antes → tiene que decir *"Ese horario acaba de completarse…"*.
5. Intentá reservar **otro horario con el primer celular**, escrito distinto (por ejemplo `+54 9 11…` en vez de `11…`) → tiene que decir *"Esta familia ya tiene un turno reservado."* y mostrar el horario que ya tiene.
6. **Borrá las filas de prueba** de la planilla (clic derecho sobre el número de fila → Eliminar fila). No borres la fila 1 de títulos.

### 8. Publicarlo como Web App
En el editor de Apps Script: **Implementar → Nueva implementación**.
1. Al lado de "Seleccionar tipo", tocá el engranaje ⚙️ → **Aplicación web**.
2. Descripción: `Versión 1`.

### 9. "Ejecutar como"
Elegí **Yo (tu mail)**.

Esto es clave para la privacidad: la página usa **tus** permisos para escribir en la planilla, así que las familias **no necesitan acceso al Sheet** y nunca lo ven.

### 10. "Quién tiene acceso"
Elegí **Cualquier usuario** (en inglés: *Anyone*).

Así cualquiera con el link puede reservar **sin iniciar sesión en Google** (importante: mucha gente abre los links desde WhatsApp en el celu y no tiene la sesión iniciada, o tiene varias cuentas, y eso genera errores).
Ojo: esto **no** da acceso a la planilla. Solo a la página de reservas.

Tocá **Implementar**.

### 11. El link para WhatsApp
Aparece una **URL de la aplicación web** que termina en **`/exec`**. Esa es la que va a WhatsApp.
Copiala (botón Copiar) y abrila vos primero desde tu celular para chequear.

Al abrirlo vas a ver arriba una franja gris de Google que dice algo como *"Esta aplicación fue creada por un usuario de Google Apps Script"*. Es normal con cuentas de Gmail y no se puede sacar; no afecta el funcionamiento.

Mensaje sugerido:

> ¡Hola familias de P4B y P4C! 🕰️ Para la Kermesse Solidaria BDS del 6 de Noviembre estamos a cargo del **Reloj mecánico**. Necesitamos 2 familias por turno de 15 minutos, de 18:30 a 21:00.
> Reservá tu horario acá (lleva 1 minuto): https://script.google.com/macros/s/……/exec
> ¡Gracias!

> ⚠️ **No mandes el link que termina en `/dev`**: ese solo funciona para vos.

---

## Si después cambiás algo del código
Guardar **no** actualiza el link público. Tenés que ir a **Implementar → Gestionar implementaciones → ✏️ (editar) → Versión: "Nueva versión" → Implementar**.
Así el link `/exec` queda **igual** y ya muestra los cambios. (Si hacés "Nueva implementación" se genera un link distinto.)

## Ajustes rápidos (en `Code.gs`, arriba de todo)
- **Cerrar las reservas:** cambiá `var RESERVAS_ABIERTAS = true;` por `false` y actualizá la versión. La página sigue mostrando los horarios pero ya no deja reservar.
- **Agregar el logo:** subí el logo a Google Drive → clic derecho → Compartir → "Cualquier persona con el vínculo" → copiá el ID del archivo (la parte larga del link entre `/d/` y `/view`) y poné:
  `var LOGO_URL = 'https://lh3.googleusercontent.com/d/ID_DEL_ARCHIVO';`
  (También sirve cualquier link directo a una imagen PNG/SVG, por ejemplo del sitio del colegio.)
- **Cambiar la fecha:** `var FECHA_EVENTO = '6 de Noviembre';` (se actualiza en las tres pantallas).
- **Cambiar el cupo:** `var CUPO_POR_TURNO = 2;`

## Cambios y cancelaciones (los hacés vos, en la planilla)
Las familias ven al pie: *"Si necesitás modificar tu turno, comunicate con las organizadoras del curso."*
- **Cancelar:** borrá la fila de esa familia (clic derecho sobre el número de fila → Eliminar fila). El lugar se libera solo y la familia puede volver a reservar desde la web.
- **Cambiar de horario:** editá la celda de **Horario** de esa fila, copiando el texto exacto de otro turno (por ejemplo `19:30 – 19:45`). Fijate antes que ese horario tenga lugar: la planilla **no** te frena si pasás de 2.
- **Una familia que cubre dos turnos:** agregá vos una fila nueva al final con Horario, Familia, Grado y Celular. La web solo bloquea las reservas que hacen las familias; lo que cargues a mano se respeta. Esa fila ocupa uno de los 2 lugares del horario.

## ¿Separar CSS y JavaScript?
No lo recomiendo para este caso: con un solo `Index.html` hay menos cosas para pegar y menos que se pueda romper. Si alguna vez lo querés hacer:
1. Creá dos archivos HTML nuevos: `Estilos` (pegás adentro todo el bloque `<style>…</style>`) y `Script` (el bloque `<script>…</script>` del final).
2. En `Code.gs` agregá:
   ```js
   function include(nombre) {
     return HtmlService.createHtmlOutputFromFile(nombre).getContent();
   }
   ```
3. En `Index.html`, donde estaban esos bloques, poné `<?!= include('Estilos'); ?>` y `<?!= include('Script'); ?>`.

---

## Qué se revisó (y cómo está resuelto)

| Requisito | Cómo se garantiza |
|---|---|
| **Máximo 2 familias por horario** | El servidor recuenta las reservas de ese horario justo antes de guardar. Si ya hay 2, rechaza. La pantalla no decide nada. Además valida que el horario sea uno de los 10 existentes. |
| **Varias personas al mismo tiempo** | `LockService`: las reservas se procesan **de a una**. Si dos familias tocan "Reservar" en el mismo segundo por el último lugar, la primera entra y la segunda recibe *"Ese horario acaba de completarse…"* y la lista se actualiza. El bloqueo se libera siempre, aunque haya un error. Si hay muchísima gente a la vez, cada una espera unos segundos; si pasan 20 s sin turno, se le pide reintentar. |
| **Una familia = un turno** | Antes de guardar, con el bloqueo tomado, el servidor busca si ese celular ya tiene una reserva en cualquier horario. Si la tiene, no guarda y muestra *"Esta familia ya tiene un turno reservado."* con el horario que ya tiene. El celular se compara sin importar el formato: `+54 9 11 5555-5555`, `011 15 5555 5555` y `11 5555 5555` cuentan como el mismo. |
| **Doble toque / se cortó internet** | El botón se desactiva mientras reserva. Si alguien reintenta después de un corte y la primera reserva sí se había guardado, no se duplica: le aparece el aviso de que ya tiene turno, con su horario. |
| **Privacidad** | La web solo recibe `horario` + `lugares disponibles`. Nombres y celulares nunca viajan al navegador de otra familia. El Sheet no se comparte con nadie. Las funciones internas (terminan en `_`) no se pueden llamar desde afuera. |
| **Planilla protegida** | Si alguien escribe algo como `=FÓRMULA` en el nombre, se limpia para que no se ejecute en tu planilla. Celular y horario se guardan como texto (no se "rompen" los +54 ni los ceros). |
| **Safari y Chrome en celulares** | Textos de campos en 17 px (evita el zoom automático del iPhone), teclado numérico para el celular, botones de 54–88 px de alto, `viewport` configurado desde el servidor (Apps Script ignora el del HTML), nada de funciones modernas que fallen en iPhones viejos. Probado en pantallas de 390 px y 320 px. |
| **Actualización automática** | La disponibilidad se refresca cada 30 s y cada vez que la persona vuelve a la pestaña (por ejemplo, después de ir a WhatsApp). Si su horario se llena mientras completa el formulario, se le avisa enseguida. |
| **Identidad visual** | Solo verde `#123D2F` + blanco y verdes muy suaves. Turnos completos en gris verdoso apagado, sin rojo. Sin ilustraciones. |

## Lo que la app **no** hace (para que lo sepas)
- **No envía confirmación por WhatsApp ni por mail.** Por eso la pantalla final sugiere sacar captura. Si querés recordatorios, se puede exportar la planilla y mandarlos a mano el día anterior.
- **Las familias no pueden cancelar ni cambiar solas.** Te escriben y lo hacés vos en la planilla (ver "Cambios y cancelaciones").
- **La familia se identifica por el celular, no por el apellido.** Si una misma familia reserva dos veces con **dos celulares distintos** (mamá y papá), la web no se da cuenta. Conviene mirar la planilla ordenada por Familia un par de días antes.
