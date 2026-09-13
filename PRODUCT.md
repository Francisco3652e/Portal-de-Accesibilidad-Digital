# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Sitio estático: HTML + CSS propio en `assets/site.css` + JS vanilla en `assets/site.js`. Sin CDN ni build step (decisión del usuario, 13-sep-2026): debe funcionar sin internet el día de la presentación. Las fuentes deben tener fallback de sistema; los iconos no pueden depender de una fuente remota.

## Users

Personas con discapacidad en El Salvador: visual (ceguera, baja visión, daltonismo, fotofobia), auditiva (sordera, hipoacusia — usuarias de LESSA), cognitiva/intelectual y motriz; también adultos mayores. Situación: acceder a información y trámites públicos digitales desde un móvil o computadora, a menudo con lector de pantalla o ampliación.

Audiencia secundaria: el "Gobierno" evaluador de la licitación simulada (docente y compañeros de clase).

## Product Purpose

Mosaic es el Portal de Accesibilidad Digital propuesto por el Equipo 6 al programa gubernamental "Tecnología para Todos". Es un prototipo navegable para una licitación simulada en la asignatura Ética Profesional (Ingeniería en Sistemas y Redes Informáticas, Universidad Gerardo Barrios), presentado en clase el lunes 14 de septiembre de 2026 en 7–10 minutos.

Éxito: convencer al evaluador de que la solución es la mejor; demostrar en vivo las cuatro propuestas exigidas; cumplir la rúbrica.

## Positioning

Un solo portal que se adapta a cada persona (voz, señas, contraste, modo guiado) en lugar de sitios separados "para ciegos" o "para sordos". Metáfora del nombre: cada ciudadano es una pieza del mosaico; ninguna sobra.

## Operating Context

Se proyecta en clase y se maneja en vivo ante la audiencia; puede no haber internet fiable. El evaluador revisa contra la rúbrica del PDF "LAB 1 - COMPUTO II".

## Capabilities and Constraints

Rúbrica (obligatoria):
- Secciones mínimas: Inicio, Acerca del proyecto, Servicios, Contacto + dos secciones temáticas adicionales.
- Propuestas exigidas: lectores de pantalla, alto contraste, videos con lengua de señas, navegación sencilla.
- Justificación ética: cómo aplica la justicia, cómo aplica la solidaridad, qué impacto tendría.

Funcionalidad existente que se conserva:
- Lector de voz real con `speechSynthesis` (`lector.html`).
- Reproductor simulado de video en LESSA con subtítulos descriptivos (`senas.html`); no hay video real.
- Ajustes persistentes en `localStorage` (`assets/site.js`): esquema de contraste (estándar / blanco-negro / negro-amarillo), filtro de daltonismo (SVG feColorMatrix), escala de fuente, espaciado amplio, modo guiado, destacar clicables, reducir animaciones.
- Formulario de contacto con validación en cliente (sin backend).
- Skip link, `aria-live`, roles ARIA, objetivos táctiles ≥ 44 px, navegación por teclado.

Restricciones:
- **La opción de alto contraste debe estar siempre disponible y visible** en cualquier rediseño (requisito del usuario).
- Contexto salvadoreño: LESSA (Lengua de Señas Salvadoreña), nunca LSE/LSM.
- Datos de contacto (teléfono, correo, oficina) son ficticios de prototipo; no inventar cifras adicionales.
- Modo oscuro eliminado (decisión 13-sep-2026): el control de cabecera activa alto contraste.

## Brand Commitments

Nombre: **Mosaic**. Eslogan: *Cada pieza cuenta*. Logo: `assets/logo.png`. Voz: cercana, en español salvadoreño con voseo cuando aplica ("adaptado a vos"), lenguaje llano.

Constraint visual vinculante (usuario, 13-sep-2026): estilo neo-brutalismo — bordes negros gruesos, sombras duras desplazadas sin blur, colores planos vibrantes (amarillo, rosa, verde menta, celeste) sobre crema, esquinas ligeramente redondeadas, tipografía sans bold. Referencia: captura "Neo Brutalism UI Component Library".

## Evidence on Hand

- Rúbrica: `~/Descargas/Etica C2/Semana 7/LAB 1- COMPUTO II.pdf`.
- Dato citado en Acerca: CONAIPD, Encuesta Nacional de Personas con Discapacidad (>6 % de la población).
- Imágenes de las páginas actuales son URLs externas de Google (placeholders); no hay fotografías propias ni videos reales en LESSA.
- No hay testimonios, métricas ni usuarios reales: no fabricar.

## Product Principles

1. La persona configura el portal, no al revés: cada preferencia se guarda y se respeta en todas las páginas.
2. Nada visible depende de un solo sentido: todo lo visual tiene equivalente en texto/voz y viceversa.
3. Cumplir la rúbrica es el mínimo; la demostración en vivo debe funcionar sin internet.
4. Contexto salvadoreño explícito (LESSA, voseo, instituciones locales).
5. Honestidad del prototipo: lo simulado se presenta como simulación, sin cifras inventadas.

## Accessibility & Inclusion

Objetivo WCAG 2.2 AA como mínimo (el sitio se autodeclara AAA en algunas etiquetas; no ampliar esa afirmación). Contraste de texto ≥ 4.5:1 en el tema base; el esquema de alto contraste debe alcanzar ≥ 7:1. Todo control operable por teclado y lector de pantalla; `prefers-reduced-motion` respetado además del ajuste manual.
