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
| `lector.html` | Lector de pantalla con síntesis de voz |
| `senas.html` | Videos en Lengua de Señas Salvadoreña (LESSA) |
| `ajustes.html` | Alto contraste, filtros de daltonismo, tamaño de letra, navegación simplificada |

## Diseño

Estilo neo-brutalista: bordes negros gruesos, sombras duras sin desenfoque, cuatro pigmentos planos (amarillo, rosa, menta, celeste) sobre crema y tipografía Lexend en negrita. Cada control es una "pieza" que se hunde al pulsarla. El alto contraste (blanco o amarillo sobre negro) está siempre disponible desde la cabecera y en Ajustes.

## Cómo verlo

Abrir `index.html` en el navegador. **No requiere internet**: la fuente (`assets/fonts/`), los iconos (SVG en línea) y las ilustraciones están incluidos en el proyecto.

## Estructura

- `assets/site.css` — hoja de estilos única (tokens, componentes, alto contraste, filtros de daltonismo).
- `assets/site.js` — preferencias de accesibilidad persistentes (`localStorage`) y modo guiado paso a paso.
- `assets/fonts/Lexend-latin.woff2` — fuente autohospedada (licencia OFL).
