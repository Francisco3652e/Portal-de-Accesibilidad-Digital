---
name: Mosaic
description: Portal de Accesibilidad Digital de El Salvador. Un tablero de piezas neobrutalistas sobre crema, donde cada control es una tecla física que se hunde al pulsarla.
colors:
  paper: "#fff8e8"
  card: "#fffdf6"
  ink: "#111111"
  ink-2: "#3f3a30"
  yellow: "#ffd23f"
  pink: "#ff8fb1"
  mint: "#9bf0c8"
  sky: "#8ed3ff"
  error-ink: "#b3003b"
  error-bg: "#ffe1ea"
  hc-black: "#000000"
  hc-white: "#ffffff"
  hc-yellow: "#ffe600"
typography:
  display:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 500
    lineHeight: 1.55
  body:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  control:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.2
  label:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.08em"
  hint:
    fontFamily: "Lexend, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    lineHeight: 1.55
rounded:
  focus: "4px"
  sm: "8px"
  md: "12px"
  pill: "999px"
spacing:
  xs: "0.35rem"
  sm: "0.6rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
  xxl: "1.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  section: "clamp(1.75rem, 4vw, 3rem)"
  wall: "1200px"
components:
  piece:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  piece-lg:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "clamp(1.25rem, 3vw, 2rem)"
  piece-tight:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.875rem 1rem"
  piece-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-sky:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.6em 1.15em"
    height: "3rem"
  button-flat-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  button-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-lg:
    typography: "{typography.lead}"
    padding: "0.7em 1.4em"
    height: "3.75rem"
  button-sq:
    padding: "0"
    width: "3rem"
    height: "3rem"
  key:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1rem"
    height: "4.25rem"
  key-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tag:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2em 0.7em"
  tag-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2em 0.7em"
  ibox:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    size: "3.25rem"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.7em 0.9em"
    height: "3.25rem"
  input-invalid:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.ink}"
  choice:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.9rem 1rem"
  choice-checked:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.ink}"
  toggle-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem"
  switch:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.pill}"
    width: "4rem"
    height: "2.25rem"
  switch-checked:
    backgroundColor: "{colors.mint}"
  topnav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5em 0.85em"
  topnav-link-current:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5em 0.85em"
  tabbar-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "0.4rem 0.2rem"
    height: "4.25rem"
  tabbar-link-current:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
---

# Design System: Mosaic

## Overview

**Creative North Star: "El tablero de piezas"**

Mosaic es un tablero de piezas físicas sobre un fondo crema. Cada bloque de contenido y cada control es una pieza con borde de tinta grueso, sombra dura desplazada sin difuminado y relleno plano: crema para el contenido, tinta para el estado encendido y uno de cuatro pigmentos (amarillo, rosa, menta, celeste) cuando el módulo tiene un rol propio. Nada flota, nada se degrada, nada se transparenta: la profundidad es un desplazamiento de tinta que se mueve con la mano. Las piezas se elevan al pasar el cursor y se hunden hasta perder la sombra al pulsarlas, igual que una tecla con recorrido.

La densidad es alta pero legible: todo escala con `rem` para que la escala de letra del usuario (87.5 % a 140 %) agrande la interfaz completa, los objetivos táctiles nunca bajan de 3rem y el texto de cuerpo se fija en Lexend 500 a 1.0625rem. Los titulares van en Lexend 800 con tracking negativo; las mayúsculas espaciadas se reservan para etiquetas de estado. El mundo se declara neobrutalista por decisión vinculante del producto y rechaza dos patrones: la "app Material" de tarjetas blancas flotantes con sombra difusa, y la "landing" de hero más rejilla de tarjetas iguales.

El sistema tiene tres versiones del mismo tablero: el estándar de crema y pigmentos, y dos esquemas de alto contraste (blanco sobre negro; amarillo #ffe600 sobre negro) en los que los cuatro pigmentos colapsan a negro y toda la jerarquía se sostiene con tinta, borde y relleno invertido. Un solo juego de tokens gobierna las tres versiones porque sombras, bordes y rellenos de estado están todos escritos con `var(--ink)` y `var(--paper)`.

**Key Characteristics:**
- Bordes sólidos de 3px (`--line`) en tinta sobre cada pieza, control, campo y separador.
- Sombras duras desplazadas sin blur (`5px 5px 0`), en el color de la tinta; la elevación es un gesto de estado, no una capa ambiental.
- Cuatro pigmentos con rol fijo: amarillo = acción, rosa = voz y audio, menta = señas y ayuda humana, celeste = visión y ajustes.
- Recorrido de tecla: hover eleva a `7px 7px 0`, `:active` hunde `translate(5px, 5px)` con sombra 0 y transición de 0ms.
- Encendido = relleno de tinta con texto crema (`aria-pressed`, `aria-current`, `aria-checked`, `.is-on`).
- Un solo tipo, Lexend variable autohospedada (400–900), sin fuente de display separada.
- Iconos SVG de trazo 2.4 en un sprite inline `#i-*`, siempre dentro de un contenedor cuadrado con borde (`.ibox`).
- Toda preferencia de accesibilidad vive como atributo `data-*` en `<html>` y el CSS responde a ella sin JS adicional.

## Colors

Una crema cálida y una tinta casi negra sostienen cuatro pigmentos saturados de rol fijo; ningún pigmento es "el primario": el amarillo es el de la acción, y los otros tres nombran módulos.

### Primary
- **Amarillo acción** (`--yellow`, `{colors.yellow}`): acción principal y energía. Relleno del eslogan del hero, del enlace de navegación activo (`.topnav a[aria-current="page"]`, `.tabbar a[aria-current="page"]`), del skip link, del hover de botones planos y de teclas segmentadas, del `summary` abierto en detalles, de la selección de texto (`::selection`) y de la etiqueta de estado dentro de una tecla encendida.

### Secondary
- **Rosa voz** (`--pink`, `{colors.pink}`): voz y audio. Pieza del servicio "Lector de pantalla", relleno de la palabra actual en la transcripción (`.word-node.is-current`) y relleno de progreso en la línea de tiempo del reproductor.
- **Menta señas** (`--mint`, `{colors.mint}`): lengua de señas y ayuda humana. Pieza del servicio LESSA, ventana PiP del intérprete, pista del interruptor encendido (`.switch input:checked`), etiqueta "Se guardan aquí".
- **Celeste visión** (`--sky`, `{colors.sky}`): visión y ajustes. Contenedor de icono de "Alto contraste", fondo del escenario de video, opción de tarjeta seleccionada (`.choice:has(input:checked)`) y, como `--focus`, el anillo de foco del sistema.

### Neutral
- **Crema papel** (`--paper`, `{colors.paper}`): fondo de página, cabecera y barra inferior; texto sobre piezas de tinta; fondo de la transcripción y del estado de tecla.
- **Crema tarjeta** (`--card`, `{colors.card}`): superficie por defecto de piezas, botones, campos, etiquetas y contenedores de icono. Un paso más claro que el papel para que una pieza se lea como objeto encima del tablero sin necesitar más sombra.
- **Tinta** (`--ink`, `{colors.ink}`): texto, bordes, sombras, relleno de estado encendido y pulgar de la barra de desplazamiento.
- **Tinta suave** (`--ink-2`, `{colors.ink-2}`): texto secundario (`.muted`, pistas, `.brand__page`, descripciones de sección, placeholder). Es la única segunda tonalidad de texto; no hay grises intermedios.
- **Error** (`--error-ink` como `{colors.error-ink}`, fondo `{colors.error-bg}`): borde y fondo del campo inválido y del bloque `.error`. Literales en la hoja (no son custom properties); son los únicos colores fuera de la paleta de :root.

### Alto contraste
- **Esquema blanco/negro** (`html[data-contrast="dark"]`): `--paper` y `--card` = `{colors.hc-black}`; `--ink` y `--ink-2` = `{colors.hc-white}`; los cuatro pigmentos = negro; `--focus` = `{colors.hc-yellow}`.
- **Esquema amarillo/negro** (`html[data-contrast="yellow"]`): papel y tarjeta = negro; `--ink` y `--ink-2` = `{colors.hc-yellow}`; pigmentos = negro; `--focus` = blanco.
- En ambos, todo estado que en el tema base se marcaba con un pigmento (eslogan, nav activo, palabra actual, `summary` abierto, opción marcada, interruptor encendido, progreso) pasa a relleno de tinta con texto papel; la sombra interna del campo se elimina; el campo inválido pasa a borde discontinuo sobre negro; la marca pierde su `drop-shadow`.

### Named Rules
**La regla del pigmento con oficio.** Cada pigmento tiene un rol y no se intercambia: amarillo para la acción, rosa para voz, menta para señas y ayuda humana, celeste para visión y ajustes. Una nueva superficie elige su pigmento por el módulo al que pertenece, no por gusto.

**La regla de la tinta encendida.** El estado activo, presionado o actual de un control se muestra siempre como relleno `--ink` con texto `--paper`. Solo dos excepciones existen en el build y ambas son selectores nativos: la opción de tarjeta marcada (celeste) y el interruptor encendido (menta).

**La regla del colapso.** En alto contraste los cuatro pigmentos valen `#000`. Toda diferencia que una superficie nueva exprese solo con pigmento desaparece en esos esquemas; debe sobrevivir con borde, relleno invertido o texto.

## Typography

**Display Font:** Lexend (con Segoe UI, Helvetica Neue, Arial, sans-serif)
**Body Font:** Lexend (misma fuente variable, `font-weight: 400 900`, `assets/fonts/Lexend-latin.woff2`, `font-display: swap`)

**Character:** Una sola familia geométrica de alta legibilidad, dibujada para lectores con dificultades de lectura, usada en dos pesos: 800 para todo lo que manda (titulares, botones, etiquetas, títulos de fila) y 500 para todo lo que se lee. La jerarquía la hacen el peso y el tamaño, no un segundo tipo.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 7vw, 5.25rem)`, 1.1; en el hero de inicio 0.95, tracking -0.02em): el `h1` de cada página. Solo "Mosaic" alcanza el tope de la escala.
- **Headline** (800, `clamp(1.75rem, 3.2vw, 2.5rem)`, 1.1): `h2` de sección. Dentro de la consola de ajustes rápidos baja a 1.75rem.
- **Title** (800, 1.375rem, 1.1): `h3` de pieza; en las piezas de servicio sube a 1.5rem, en las de ética a 1.3rem, en tarjetas de video a 1.2rem.
- **Subtitle** (700, 1.125rem, 1.1): `h4`.
- **Lead** (500, 1.2rem, 1.55): párrafo introductorio bajo cada `h1` (`.lead`) y texto de la transcripción (1.2rem, 1.8).
- **Body** (500, 1.0625rem, 1.55): cuerpo. Medida máxima 68ch (`.measure`).
- **Control** (800, hereda 1.0625rem, 1.2): texto de botones, teclas, títulos de fila y enlaces de navegación (0.95rem en `.topnav`, 0.7rem en `.tabbar`).
- **Label** (800, 0.75rem, tracking 0.08em, MAYÚSCULAS): etiquetas de estado `.tag`, `.key__state`, `.res__meta`. `.tag--proper` desactiva las mayúsculas y sube a 0.85rem para nombres propios.
- **Hint** (500, 0.9rem–0.95rem, color `--ink-2`): pistas bajo títulos de fila, opción y canal.

### Named Rules
**La regla de los dos pesos.** 800 manda, 500 lee, 700 solo en `h4`, `.radio` y subtítulos de video. No se introducen 400 ni 600 en el texto de interfaz; el ancho variable de la fuente existe para la escala del usuario, no para matices.

**La regla de las mayúsculas de estado.** Las mayúsculas espaciadas solo aparecen en etiquetas de estado y metadatos (tags, contadores, duración). Nunca en titulares, botones ni navegación.

**La regla del rem.** Todo tamaño de texto, control y espaciado se escribe en `rem` o `em` para que `html[data-font-scale]` (87.5 %, 100 %, 118 %, 140 %) escale la interfaz entera. Solo los bordes (`--line`), las sombras y el anillo de foco quedan en px.

## Layout

Un contenedor central `.shell` de `min(100% - 2 * var(--gutter), 1200px)` con gutter fluido `clamp(1rem, 4vw, 2.5rem)`. Dentro, `.stack` apila secciones con separación `clamp(1.75rem, 4vw, 3rem)` y `padding-block` fluido. Cada sección es una pieza o una rejilla de piezas; no hay franjas de fondo de ancho completo ni imágenes de fondo.

Rejillas: `.grid--2` y `.grid--3` son auto-fit con mínimos de 18rem y 16rem (gap 1.25rem). Las rejillas de página tienen su propio punto de quiebre, todos con una sola columna por defecto:
- 720px: `.services` pasa a 3 columnas y el bento se forma con las piezas 1 y 4 en `span 2` (patrón 2+1 / 1+2); el diálogo se centra verticalmente.
- 800px: `.help-band` 1.3fr 1fr.
- 900px: aparece `.topnav` y desaparece `.tabbar`; el `padding-bottom` de 5.5rem del `body` (reservado para la barra inferior) se elimina; `.player`, `.ethics` (3 columnas) y `.about-hero` toman su forma de escritorio.
- 960px: `.hero` 1.15fr 1fr, `.settings` 2 columnas con `.span-2`, `.contact-grid` 1fr 1.2fr.
- 1000px: `.featured` 1.55fr 1fr.
- 560px (mínimo) muestra la palabra "Alto contraste" junto al interruptor de la cabecera; por debajo de 559px la ventana PiP y los subtítulos se reducen.
- 640–959px: `.channels` en dos columnas (una columna fuera de ese rango).

**La regla del min-width 0.** Todo hijo directo de una rejilla o flex de página (`.grid`, `.settings`, `.services`, `.hero`, `.contact-grid`, `.featured`, `.ethics`, `.about-hero`, `.channels`, `.player`, `.help-band`, `.console__keys`, `.stack`) recibe `min-width: 0` para que ninguna pieza fuerce desbordamiento horizontal en móvil. Una rejilla nueva se añade a esa lista.

Ritmo interno: piezas con 1.25rem (`.piece`), `clamp(1.25rem, 3vw, 2rem)` para piezas grandes, `0.875rem 1rem` para la barra guiada; filas de control con 0.75rem–1rem; clusters de etiquetas 0.6rem; listas 0.35rem entre ítems. La cabecera es `sticky` con alto mínimo 4.5rem y borde inferior de 3px; la barra guiada se pega a `top: 4.5rem` debajo de ella. La barra inferior móvil es `fixed`, seis celdas iguales de 4.25rem de alto separadas por bordes de 3px y respeta `safe-area-inset-bottom`.

Cuando `html[data-guided-mode="true"]`, aparece `.guide-bar` y el `main` muestra una sola sección `[data-step]` a la vez; las demás llevan `hidden` y `display: none !important`.

## Elevation & Depth

Profundidad por desplazamiento de tinta, no por luz. Cada pieza y control con reposo elevado lleva una sombra sólida sin blur del mismo color que el borde. La sombra no sugiere una fuente de luz: sugiere una pieza de cartón sobre otra. La elevación cambia con el estado (se acerca al cursor, se hunde al pulsar) y nunca se usa para separar capas de contenido: dentro de una pieza, las piezas hijas planas (`.piece--flat`, `.toggle-row`, `.checklist li`, `details`) solo tienen borde.

Existen además dos capas no sombreadas: la cabecera y la barra inferior se separan con borde de 3px, y el diálogo de ayuda oscurece el fondo con `rgba(17, 17, 17, 0.55)` (0.85 en alto contraste).

### Shadow Vocabulary
- **Reposo** (`--shadow`: `box-shadow: 5px 5px 0 var(--ink)`): piezas, botones, teclas, grupos segmentados, opciones de tarjeta, interruptor de contraste, skip link, campo enfocado, marco de video.
- **Hover** (`box-shadow: 7px 7px 0 var(--ink)` con `transform: translate(-2px, -2px)`): todo control con reposo elevado. La pieza no crece; se separa del tablero 2px en diagonal.
- **Hover de servicio** (`--shadow-lg`: `8px 8px 0 var(--ink)` con `translate(-3px, -3px)`): solo las piezas del bento de servicios, que son enlaces de página completa.
- **Pulsado / encendido con recorrido** (`box-shadow: 0 0 0 var(--ink)` o `none` con `translate(5px, 5px)` y `transition-duration: 0ms`): `:active` de botones, teclas, servicios, recursos, canales y del interruptor de contraste; opción de tarjeta marcada.
- **Sombra corta** (`3px 3px 0 var(--ink)`): enlace de navegación actual y `drop-shadow` de la marca. **`4px 4px 0`**: ventana PiP. **`2px 2px 0`**: palabra actual de la transcripción.
- **Sombra interna de campo** (`inset 4px 4px 0 rgba(17, 17, 17, 0.08)`): campos en reposo; al enfocar pasa a `--shadow` externa. En alto contraste se elimina.
- **Botón plano** (`.btn--flat`, sin sombra): acciones secundarias dentro de una pieza ya sombreada (barra guiada, transporte del reproductor). Su hover es relleno amarillo y su `:active` hunde 2px.

### Named Rules
**La regla de la sombra de tinta.** Toda sombra es `N N 0 var(--ink)`: sin blur, sin alfa, sin segundo color. Con eso el alto contraste la convierte en blanca o amarilla sin reglas adicionales.

**La regla del recorrido.** Un control que se eleva en hover debe hundirse en `:active` con la misma distancia (5px) y sin transición. Un control sin sombra no se eleva; como mucho cambia de relleno.

**La regla de la pieza dentro de la pieza.** La pieza contenedora lleva la sombra; los controles dentro de ella también, pero las subpiezas de solo lectura (filas de ajuste, ítems de lista, detalles) van planas con borde.

## Shapes

Rectángulos con esquinas ligeramente redondeadas y borde de tinta de 3px en todo: piezas (`--radius` 12px), controles, campos y contenedores de icono (`--radius-sm` 8px), etiquetas, estados, interruptor y pista de tiempo (píldora 999px), anillo de foco 4px, esquinas superiores de un `summary` abierto 5px, muestras de color 6px, duración de video 6px. No hay círculos salvo el punto del radio y el pulgar del interruptor. No hay recortes diagonales, blobs ni formas orgánicas; el único gesto fuera de eje es el eslogan del hero, rotado -1.5deg.

El borde es constante: `var(--line)` (3px) sólido en `--ink`. Un borde discontinuo señala lo simulado o auxiliar (`.tag--demo`, `.font-preview`, `.input[aria-invalid]` en alto contraste, `data-highlight-clickable`). Bordes de 2px solo en `.res__meta` y en los `.ibox` de la lista de comprobación, por su tamaño reducido.

Los iconos son SVG de trazo (`stroke-width: 2.4`, extremos y uniones redondeados, sin relleno), tamaño 1.5em (`.ic`) o 1.15em (`.ic--sm`), y viven en el sprite inline `#i-*` repetido en la cabecera de cada página. Se presentan dentro de un `.ibox` cuadrado de 3.25rem con borde y relleno de pigmento o tinta.

**La regla de la marca.** La marca Mosaic es el SVG inline `.brand__mark`: cuatro teselas 2×2 de los cuatro pigmentos con borde de tinta y `drop-shadow(3px 3px 0)`, con nombre en Lexend 900 y tracking -0.03em. No existe versión raster; `assets/logo.png` fue eliminado.

## Components

### Piezas (`.piece`)
Un bloque de contenido es una pieza: crema tarjeta, borde 3px, radio 12px, sombra de reposo, padding 1.25rem. Modificadores de pigmento (`--yellow`, `--pink`, `--mint`, `--sky`) y de tinta (`--ink`, texto crema); `--flat` retira la sombra para subpiezas; `--lg` amplía el padding; `--tight` lo reduce para barras. Los enlaces-pieza (`.svc`, `.res`, `.channel`) añaden el recorrido de tecla completo.

### Botones (`.btn`)
- **Forma:** rectángulo de esquinas suaves (8px), borde 3px, alto mínimo 3rem, padding `0.6em 1.15em`, Lexend 800, icono opcional con gap 0.55em.
- **Por defecto:** crema tarjeta con texto tinta y sombra de reposo. Pigmento por modificador (`--yellow` para la acción principal, `--pink`/`--mint`/`--sky` para acciones del módulo) o `--ink` para el paso siguiente y acciones fuertes.
- **Hover / Active / Focus:** eleva 2px con sombra 7px; hunde 5px sin sombra y sin transición; foco visible con anillo 3px `--focus` y offset 3px.
- **Encendido:** `aria-pressed="true"`, `aria-checked="true"`, `aria-current="true"` o `.is-on` rellenan de tinta con texto crema.
- **Plano (`--flat`):** sin sombra, hover en amarillo, hunde 2px; para acciones secundarias dentro de piezas sombreadas.
- **Tamaños:** `--lg` (3.75rem, 1.125rem), `--sq` (3rem cuadrado sin padding; 4.25rem con `--lg`, usado en el transporte del reproductor), `--block` (ancho completo).
- **Deshabilitado:** opacidad 0.55, sin sombra ni transform.

### Grupo segmentado (`.seg`)
Botones pegados en un solo marco: borde 3px, radio 8px, sombra de reposo; cada botón sin borde propio salvo el separador derecho de 3px, mínimo 3rem por lado. Hover en amarillo; el actual (`aria-current`/`aria-checked`) en tinta. `--full` estira los botones a partes iguales. El anillo de foco va hacia dentro (`outline-offset: -4px`). Usado en A- / A / A+ y velocidades.

### Consola y teclas (`.console`, `.key`)
La consola de ajustes rápidos es una pieza grande con una rejilla de teclas de una columna. Cada tecla es un botón de 4.25rem de alto con icono en `.ibox`, nombre a la izquierda y una píldora de estado `.key__state` (label en mayúsculas sobre papel) a la derecha. Encendida: relleno de tinta, píldora amarilla y `.ibox` en papel. `--static` desactiva el recorrido para teclas que contienen otro control (el segmentado de texto).

### Etiquetas (`.tag`)
Píldora con borde 3px, Lexend 800 a 0.75rem en mayúsculas espaciadas, padding `0.2em 0.7em`, icono opcional `.ic--sm`. Se colocan después del título o en la cabecera de una pieza como metadato (categoría, estado, motor activo, contador de paso), nunca como antetítulo. Variantes de pigmento y `--ink`; `--proper` para nombres propios sin mayúsculas; `--demo` (tinta, borde discontinuo crema con `outline` de tinta) marca lo simulado.

### Contenedor de icono (`.ibox`)
Cuadrado de 3.25rem, borde 3px, radio 8px; relleno por pigmento del módulo o tinta (`--ink` con icono crema). En listas de comprobación baja a 2rem con borde de 2px.

### Campos (`.input`)
- **Estilo:** borde 3px, radio 8px, crema tarjeta, alto mínimo 3.25rem, padding `0.7em 0.9em`, Lexend 500, sombra interna leve; placeholder en `--ink-2` opaco.
- **Foco:** el anillo de foco pega al borde (`outline-offset: 0`) y la sombra interna se convierte en la sombra de reposo externa: el campo "sale" del tablero.
- **Error:** fondo `error-bg`, borde `error-ink`; el bloque `.error` reproduce el mismo par con peso 700.
- **Select:** sin apariencia nativa, chevron SVG inline a la derecha (color tinta; blanco o amarillo en alto contraste). **Textarea:** 8rem mínimo, redimensionable en vertical.
- **Radio simple (`.radio`):** input nativo de 1.5rem con `accent-color: var(--ink)`.

### Opción de tarjeta (`.choice`)
Radio envuelto en una pieza de 8px con sombra y recorrido de tecla: hover eleva; marcada hunde 5px sin sombra, se rellena de celeste y el punto `.dot` (círculo 1.5rem con borde) muestra su centro de tinta con `scale(0→1)` en 120ms. Foco en el input dibuja el anillo en la tarjeta. `--swatch` añade a la derecha una muestra `.swatch` (3rem × 2.25rem, radio 6px) con el esquema de contraste representado.

### Interruptor y fila de ajuste (`.switch`, `.toggle-row`)
Pista píldora de 4rem × 2.25rem con borde 3px, pulgar de tinta con inset 3px que se desliza 1.75rem en 150ms (`cubic-bezier(.2,.8,.2,1)`); encendido rellena la pista de menta. Vive a la derecha de una `.toggle-row`: pieza plana con borde, `.ibox` del módulo, título 800 y pista en `--ink-2`; el título es el `label` del input.

### Bento de servicios (`.svc`)
Cuatro piezas-enlace con pigmento propio (rosa voz, menta señas, celeste visión, amarillo navegación) en rejilla de tres columnas con las piezas 1 y 4 a doble ancho. Cabecera con `.ibox--ink` y `.tag` de categoría, `h3` 1.5rem, párrafo, y CTA 800 con flecha que se desplaza 4px en hover. Hover con `--shadow-lg`.

### Recursos y canales (`.res`, `.channel`)
Filas-enlace dentro de una pieza: `.ibox` a la izquierda, título 800 y metadato en píldora de 2px (recursos) o pista `--ink-2` (canales). Recorrido de tecla estándar.

### Video y línea de tiempo (`.video`, `.timeline`, `.vcard`)
Marco 16:9 con borde 3px, radio 12px, fondo celeste y sombra de reposo; escena SVG absoluta; ventana PiP 3:4 al 28 % (máx 9rem) en menta con sombra 4px y rótulo de tinta en mayúsculas; subtítulos en bloque de tinta con texto crema 700 y línea pequeña amarilla en mayúsculas (blanca en alto contraste). Línea de tiempo: pista píldora de 1.1rem con relleno rosa terminado en borde de tinta; números tabulares. Tarjetas de video con miniatura 16:9 y duración en píldora de tinta 6px.

### Barra guiada (`.guide-bar`)
Pieza amarilla `--tight` pegada bajo la cabecera (top 4.5rem, z 90), visible solo con `data-guided-mode="true"`. Izquierda: nombre de sección 800 a 1.1rem y `.tag` "Paso n de m"; derecha: Anterior (plano), Siguiente (tinta), Salir (plano).

### Diálogo y detalles (`.dialog`, `details`)
Diálogo fijo a pantalla completa con velo de tinta al 55 %, panel `.piece` de hasta 40rem y 90dvh, anclado abajo en móvil y centrado desde 720px. Dentro, acordeones `details` con borde 3px y radio 8px; el `summary` es una fila 800 con chevron que rota 180deg al abrir, y abierto se rellena de amarillo con borde inferior.

### Navegación
- **Cabecera (`.topbar`):** sticky, crema papel, borde inferior 3px, 4.5rem mínimo. Marca a la izquierda (mark + nombre 900 + nombre de página 700 en `--ink-2`); `.topnav` al centro desde 900px: enlaces 800 a 0.95rem con borde transparente de 3px, hover con borde y crema tarjeta, actual con relleno amarillo y sombra 3px. A la derecha, siempre visible, `.contrast-switch`: pieza-botón con icono, texto "Alto contraste" (oculto bajo 560px) y `.tag` de estado; presionado se rellena de tinta.
- **Barra inferior (`.tabbar`):** fija bajo 900px, seis celdas iguales de 4.25rem con icono arriba y rótulo 800 a 0.7rem, separadas por bordes de 3px; actual en amarillo; foco hacia dentro.
- **Skip link:** pieza amarilla con sombra que aparece a 1rem del borde superior al enfocar.

### Estados y movimiento (grammar transversal)
- **Foco:** `outline: 3px solid var(--focus)`, `outline-offset: 3px`, radio 4px, en todo elemento; `--focus` es celeste en el tema base, amarillo #ffe600 en el esquema blanco/negro, blanco en el amarillo/negro.
- **Transición de recorrido:** `--lift` = `transform 180ms var(--ease-out), box-shadow 180ms var(--ease-out)` con `--ease-out: cubic-bezier(.16, 1, .3, 1)`. Micro-transiciones de 120–200ms `ease` para chevrones, punto de radio, palabra actual y barras de onda.
- **Entrada del mosaico del hero:** `@keyframes tile-in` (opacidad 0 y `translate(-14px, -14px)` → reposo) en 600ms `cubic-bezier(.2,.8,.2,1)` con retardo escalonado de 60ms por tesela, solo bajo `prefers-reduced-motion: no-preference` y `html[data-reduce-motion="false"]`.
- **Reducción de movimiento:** `html[data-reduce-motion="true"]` y `prefers-reduced-motion: reduce` anulan toda animación, transición y `scroll-behavior` con `!important`.

### Preferencias en `<html>`
El JS persiste en `localStorage` y refleja en `<html>` los atributos que el CSS lee: `data-contrast` (`dark` | `yellow`), `data-font-scale` (`sm` | `lg` | `xxl`), `data-color-filter` (`protanopia` | `deuteranopia` | `tritanopia` mediante `filter: url(#f-*)` con `feColorMatrix` inline en cada página, y `grayscale`), `data-reduce-motion`, `data-highlight-clickable` (contorno discontinuo de 3px en `a`, `button`, `.choice`, `.switch`), `data-wide-spacing` (interlineado 2, tracking 0.04em, word-spacing 0.12em en `p`, `li` y transcripción) y `data-guided-mode`.

## Do's and Don'ts

### Do:
- **Do** construir toda superficie nueva con piezas: borde `var(--line)` sólido en `--ink`, radio 12px (contenedor) u 8px (control), sombra `5px 5px 0 var(--ink)` en reposo.
- **Do** dar a todo control elevado el recorrido completo: hover `translate(-2px, -2px)` + `7px 7px 0`, `:active` `translate(5px, 5px)` + sombra 0 + `transition-duration: 0ms`.
- **Do** marcar el estado activo con relleno `--ink` y texto `--paper` mediante `aria-pressed`, `aria-current` o `aria-checked`, y comprobar que sigue distinguible con los pigmentos en negro (alto contraste).
- **Do** escribir sombras, bordes y rellenos de estado con `var(--ink)` / `var(--paper)` para que los esquemas de contraste los hereden sin reglas nuevas.
- **Do** elegir el pigmento por el módulo (amarillo acción, rosa voz, menta señas/ayuda humana, celeste visión/ajustes) y presentar los iconos dentro de un `.ibox` con borde.
- **Do** medir todo en `rem`/`em`, mantener objetivos táctiles de al menos 3rem y añadir cada rejilla nueva a la lista de `min-width: 0`.
- **Do** usar el sprite `#i-*` inline y la Lexend autohospedada; ningún recurso remoto.

### Don't:
- **Don't** usar sombras con blur, sombras con alfa, degradados de superficie, transparencias ni tarjetas blancas flotantes: el mundo rechaza explícitamente la "app Material".
- **Don't** usar un segundo tipo, pesos 400 o 600 en interfaz, ni mayúsculas espaciadas fuera de etiquetas de estado.
- **Don't** introducir grises intermedios: el texto secundario es `--ink-2` y nada más.
- **Don't** expresar un estado solo con pigmento; en alto contraste los cuatro colapsan a negro.
- **Don't** elevar controles sin sombra (`.btn--flat`, teclas de `.seg`): cambian de relleno, no de posición.
- **Don't** componer una página como hero más rejilla de tarjetas iguales; el bento de servicios usa anchos distintos a propósito.
- **Don't** reintroducir un logotipo raster, un modo oscuro decorativo ni fuentes o iconos por CDN.
