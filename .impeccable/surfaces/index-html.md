---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["acerca.html","contacto.html","lector.html","senas.html","ajustes.html"]
---

# Surface brief — Mosaic (todo el sitio: index, acerca, contacto, lector, senas, ajustes)

Scope: rediseño completo de las 6 páginas estáticas. Modo: **Operate** (la persona configura y usa herramientas de accesibilidad; Inicio y Acerca tienen un tono Persuade para la licitación, pero la tarea manda).

Audiencia y tarea: personas con discapacidad visual, auditiva, cognitiva y motriz en El Salvador; el evaluador de la licitación proyecta el prototipo en clase. Tareas: activar alto contraste / tamaño de letra en un toque, escuchar texto en voz, ver videos en LESSA, ajustar la navegación, leer la justificación ética, contactar.

Constraints: contenido y funcionalidad actuales intactos; sin CDN ni recursos remotos (fuente Lexend autohospedada, iconos SVG inline); el alto contraste siempre visible en la cabecera; modo oscuro eliminado; LESSA; sin cifras inventadas.

## Direction contract

THESIS: Un tablero de piezas. Cada control es una pieza física con borde negro y sombra dura que se hunde al pulsarla; la página entera es un mosaico de bloques de color plano sobre crema. Se rechaza el patrón "app Material con tarjetas blancas flotantes" del incumbente y el patrón "landing con hero + grid de cards iguales".

OWN-WORLD: Crema #FFF8E8 como fondo; tinta negra #111; bordes 3px sólidos; sombra 5px 5px 0 #111 (sin blur); radios 10–14px. Cuatro pigmentos con rol fijo: amarillo #FFD23F = acción principal/energía, rosa #FF8FB1 = voz y audio, menta #9BF0C8 = señas y ayuda humana, celeste #8ED3FF = visión y ajustes. Tipografía Lexend (autohospedada), 800 para titulares con tracking -0.02em, 500 cuerpo, mayúsculas espaciadas solo en etiquetas de estado. Iconos SVG trazo 2.5px, extremos redondeados, en un contenedor cuadrado con borde. Marca: mark "Mosaic" = 2×2 teselas de los cuatro pigmentos con borde y sombra. Estados: hover eleva (sombra 7px), :active hunde (translate 5px, sombra 0), foco = anillo 3px celeste con offset 3px, seleccionado = relleno del pigmento del módulo. Alto contraste: fondo negro, tinta y bordes blancos, sombras blancas; esquema amarillo: tinta y bordes #FFE600.

STORY: El visitante entiende en segundos que este portal se adapta a él (los ajustes rápidos están en la primera pantalla, con nombres llanos); cree que es serio y del Estado porque la rúbrica se cubre a la vista (Servicios, Acerca, Contacto, justificación ética); actúa pulsando una pieza: contraste, texto, voz.

FIRST VIEWPORT (index, desktop 1440): cabecera con marca Mosaic a la izquierda, navegación de 6 piezas al centro y a la derecha la pieza "Alto contraste" con interruptor. Debajo, titular "Mosaic" 5rem + "Cada pieza cuenta" en una banda amarilla inclinada 0° (bloque plano, no gradiente), y a su derecha el panel "Ajustes rápidos" como una consola: tres piezas grandes (Alto contraste, Tamaño de texto A-/A/A+, Activar lector). Bajo la línea de pliegue empieza "Servicios": cuatro bloques de distinto ancho (2+1 / 1+2) cada uno con su pigmento. Móvil (390): cabecera con marca + interruptor de contraste; barra inferior de 6 piezas; consola en columna.

FORM: Dirección pinada por el usuario (neo-brutalismo, referencia "Neo Brutalism UI Component Library"); gana al roll. Semilla concept-seed key dfdf491a (assigned index 5, mode operate). Aporte tomado del retador "creator-hardware desk instrument" (declinado en identificación de audiencia y claridad): la disciplina de tecla física — cada control tiene recorrido de pulsación (:active hunde y pierde la sombra) y el modo activo "enciende" su pieza con el pigmento; se traduce sin su material gunmetal. Interacción firma: el hundimiento de pieza + el modo guiado paso a paso que muestra una sola sección a la vez con "Anterior / Siguiente".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
