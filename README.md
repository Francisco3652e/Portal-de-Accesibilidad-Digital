# Mosaic — Portal de Accesibilidad Digital

> *Cada pieza cuenta.*

Propuesta del **Equipo 6** para el programa gubernamental **"Tecnología para Todos"** (El Salvador).
Asignatura: Ética Profesional — Ingeniería en Sistemas y Redes Informáticas, Universidad Gerardo Barrios.

## ¿Por qué Mosaic?

Un mosaico está hecho de piezas distintas: ninguna sobra y solo juntas forman la imagen completa.
Cada ciudadano, con o sin discapacidad, es una pieza. Este portal existe para que cada pieza cuente.

## ¿A quién va dirigido?

Personas con discapacidad **visual**, **auditiva**, **cognitiva** y **motriz**, además de adultos mayores.

## Secciones

| Página | Contenido |
|---|---|
| `index.html` | Inicio, ajustes rápidos y **Servicios** |
| `acerca.html` | **Acerca del proyecto** y justificación ética (justicia, solidaridad, impacto) |
| `contacto.html` | **Contacto**: canales de atención y formulario accesible |
| `lector.html` | Lector de voz: texto, enlaces, portapapeles, dictado, foto y cámara en vivo (OCR) |
| `senas.html` | Videos en Lengua de Señas Salvadoreña (LESSA) |
| `ajustes.html` | Alto contraste, filtros de daltonismo, tamaño de letra, modo fácil, modo guiado |

## Cómo llega el texto al lector (sin verlo ni escribirlo)

Inspirado en *Speak Screen* / *Live Text* (Apple) y *Select to Speak* / *Bixby Vision* (Samsung):

- **Leer esta pantalla** — botón de la cabecera, `Alt+Mayús+L` o dos toques con dos dedos en cualquier página:
  reúne el contenido de la página y lo lee en el lector.
- **Pegar y leer** — lee lo último copiado (`navigator.clipboard`). `Alt+Mayús+P`.
- **Dictar por voz** — reconocimiento de voz del navegador (Chrome, Edge, Safari). `Alt+Mayús+D`.
- **Leer un enlace** — `api/leer.py` descarga la página y extrae el texto legible.
- **Cámara en vivo / Foto o imagen** — OCR en español en el navegador (Tesseract.js, se descarga al usarlo);
  la cámara puede leer sola cada pocos segundos. `Alt+Mayús+C`.
- **Compartir con Mosaic** — `manifest.json` (+ `sw.js`) permite instalar el sitio; en Android aparece en el
  menú Compartir y lo compartido se abre en el lector (`lector.html?text=…&url=…`).
- **Control sin mirar** — `Espacio`, `←`/`→`, `Esc`, `+`/`-`; en celular un toque con dos dedos (pausa), deslizar a los lados y
  botones de audífonos (Media Session).

## Diseño

Estilo neo-brutalista: bordes negros gruesos, sombras duras sin desenfoque, cuatro pigmentos planos (amarillo, rosa, menta, celeste) sobre crema y tipografía Lexend en negrita. Cada control es una "pieza" que se hunde al pulsarla. El alto contraste (blanco o amarillo sobre negro) está siempre disponible desde la cabecera y en Ajustes.

## Cómo verlo

Abrir `index.html` en el navegador. **No requiere internet**: la fuente (`assets/fonts/`), los iconos (SVG en línea) y las ilustraciones están incluidos en el proyecto.

El lector usa la voz del propio navegador (Web Speech API). Si el navegador no tiene voces instaladas
(p. ej. Brave/Chromium en Linux), el sitio publicado en Vercel genera el audio con `api/tts.py`;
esa parte sí necesita internet y no funciona al abrir el archivo localmente.

## Estructura

- `assets/site.css` — hoja de estilos única (tokens, componentes, alto contraste, filtros de daltonismo).
- `assets/site.js` — preferencias de accesibilidad persistentes (`localStorage`) y modo guiado paso a paso.
- `assets/fonts/Lexend-latin.woff2` — fuente autohospedada (licencia OFL).
- `api/tts.py` — función serverless (Vercel, Python + gTTS) que convierte texto en MP3; respaldo del
  lector cuando el navegador no puede sintetizar voz. Dependencias en `requirements.txt`.
- `api/leer.py` — función serverless que extrae el texto legible de una URL (modo lector).
- `manifest.json`, `sw.js`, `assets/icons/` — instalación como app y destino de "Compartir".
- `assets/media/` — medios demostrativos generados con `tools/make_media.py` (Pillow + ffmpeg + gTTS):
  `demo-lessa.mp4` y `demo-lessa.vtt` (video animado con narración y subtítulos descriptivos)
  y la transcripción en TXT. No son grabaciones reales
  de interpretación en LESSA; el sitio los marca como demostración.
