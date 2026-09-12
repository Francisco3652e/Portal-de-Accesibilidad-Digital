# Propuesta de Licitación Pública
## Portal de Accesibilidad Digital — Programa "Tecnología para Todos"
### Gobierno de El Salvador

*Trabajo académico — Materia de Ética Profesional. Documento listo para copiar y pegar en la propuesta escrita y como guion base de la exposición oral.*

---

## 1. Objeto de la licitación

El Estado salvadoreño, a través del programa **"Tecnología para Todos"**, requiere el diseño, desarrollo y puesta en producción de un **Portal de Accesibilidad Digital** que centralice herramientas de asistencia tecnológica (lectura de pantalla, interpretación en Lengua de Señas Salvadoreña, navegación simplificada y personalización visual) para que la ciudadanía con discapacidad pueda acceder en igualdad de condiciones a la información y los trámites del Estado publicados en medios digitales.

El presente documento constituye la propuesta técnica, ética y de gestión presentada por el equipo oferente, junto con el prototipo funcional adjunto (`index.html`, `acerca.html`, `servicios.html`, `lector.html`, `senas.html`, `contacto.html`, `ajustes.html`).

## 2. Alcance del proyecto

| Componente | Descripción |
|---|---|
| **Inicio** | Panel de accesos rápidos a los cuatro modos de navegación y a los canales de ayuda humana. |
| **Acerca del Proyecto** | Marco institucional, misión y fundamento ético del portal. |
| **Servicios** | Catálogo de herramientas de accesibilidad y trámites estatales destacados. |
| **Lector de Pantalla** | Síntesis de voz con resaltado sincronizado de palabras, control de velocidad y carga de texto propio. |
| **Lengua de Señas Salvadoreña (LESSA)** | Videoteca con intérpretes certificados, subtítulos descriptivos (SDH) y transcripción completa. |
| **Contacto** | Formulario accesible y canales humanos directos (videollamada LESSA, línea gratuita, correo). |
| **Ajustes** | Alto contraste (estándar / blanco-negro / negro-amarillo), filtros de daltonismo, escalado de texto, reducción de movimiento y modo guiado. |

**Fuera de alcance en esta fase:** integración con sistemas transaccionales reales del Estado (DUI, citas médicas, etc.); estos se presentan como maquetas de referencia para futuras fases de integración.

## 3. Marco ético del proyecto

### 3.1 Justicia

El proyecto adopta el principio de **justicia como equidad**: el Estado no cumple su deber de igualdad solo absteniéndose de discriminar, sino compensando activamente la desventaja de partida que enfrenta una persona con discapacidad frente a un servicio digital diseñado, por defecto, para la mayoría sin discapacidad. Este compromiso está además respaldado por:

- La **Convención sobre los Derechos de las Personas con Discapacidad (CDPD, ONU)**, ratificada por El Salvador, que en su artículo 9 obliga a los Estados parte a garantizar el acceso a la información y las comunicaciones, incluidos los sistemas y tecnologías de la información.
- La **Ley de Equiparación de Oportunidades para las Personas con Discapacidad** de El Salvador, que exige a las instituciones públicas adaptar sus servicios para eliminar barreras de acceso.

En términos prácticos, "justicia" se traduce en decisiones concretas de diseño: cumplimiento de **WCAG 2.1 nivel AA** como piso mínimo no negociable, control total del usuario sobre contraste y tamaño de texto, y equivalentes de audio/señas/texto para cada contenido relevante.

### 3.2 Solidaridad

El portal se sostiene sobre la idea de que la tecnología asistiva **no reemplaza el vínculo humano, lo extiende**. Por eso ningún módulo automatizado se ofrece como única puerta de salida: siempre existe un canal humano equivalente (videollamada con intérprete certificado, línea telefónica gratuita, formulario de contacto con respuesta comprometida). La solidaridad también se expresa en el proceso: los contenidos en LESSA se validan con intérpretes acreditados y con la propia comunidad sorda, evitando que el Estado "traduzca por" la comunidad sin escucharla.

### 3.3 Impacto social esperado

Según el *Informe Mundial sobre la Discapacidad* de la Organización Mundial de la Salud, aproximadamente **15% de la población mundial** vive con alguna forma de discapacidad. Un portal estatal no accesible excluye de facto a esa proporción de la ciudadanía de trámites esenciales de salud, identidad y educación. Indicadores de impacto propuestos para el seguimiento del programa:

- % de trámites prioritarios del Estado con versión accesible publicada (meta año 1: 30%).
- Número de videollamadas LESSA atendidas y tiempo promedio de respuesta.
- Nivel de cumplimiento WCAG 2.1 AA medido con auditoría externa (meta: 100% en páginas del portal).
- Encuesta de satisfacción con personas usuarias con discapacidad (meta: aplicarla trimestralmente con apoyo de CONAIPD).

> **Nota metodológica:** la cifra nacional específica de personas con discapacidad en El Salvador debe verificarse con fuentes oficiales (CONAIPD, DIGESTYC/EHPM) antes de la entrega final; aquí se usa la referencia internacional de la OMS por ser una fuente verificable y ampliamente citada.

## 4. Requisitos técnicos cumplidos (checklist WCAG 2.1 AA)

- [x] Estructura semántica con `header`, `main`, `nav`, `section` y encabezados jerárquicos.
- [x] Enlace "Saltar al contenido principal" en todas las páginas.
- [x] Región `aria-live` para anuncios dinámicos (cambios de ajustes, estado de lectura, envío de formularios).
- [x] Contraste de texto verificado (verde institucional `#14532d` sobre fondo claro ≈ 8.3:1; blanco/negro y negro/amarillo en modo alto contraste > 15:1).
- [x] Navegación e interacción completas por teclado (se corrigió un control de progreso con `role="slider"` sin soporte de teclado, cambiado a `role="progressbar"` de solo lectura).
- [x] Indicadores de foco visibles en todos los controles interactivos (se corrigió un `<select>` que anulaba el foco sin reemplazo).
- [x] Formularios con `<label>` asociado, agrupación con `<fieldset>`/`<legend>` y mensajes de error anunciados con `role="alert"`.
- [x] Tipografía Atkinson Hyperlegible, diseñada para legibilidad en baja visión.
- [x] Persistencia de preferencias de accesibilidad entre páginas (localStorage).

## 5. Cronograma referencial

| Fase | Duración | Entregable |
|---|---|---|
| Descubrimiento y validación con usuarios (incl. comunidad sorda) | 3 semanas | Informe de necesidades |
| Diseño UI/UX accesible | 3 semanas | Prototipo navegable (este repositorio) |
| Desarrollo e integración con trámites piloto | 8 semanas | Portal en ambiente de pruebas |
| Auditoría externa WCAG 2.1 AA | 2 semanas | Informe de conformidad |
| Lanzamiento y capacitación a funcionarios | 2 semanas | Portal en producción |

## 6. Presupuesto referencial (ilustrativo para fines académicos)

| Rubro | Estimado |
|---|---|
| Equipo de diseño e implementación | 45% |
| Intérpretes certificados LESSA y validación comunitaria | 20% |
| Auditoría de accesibilidad independiente | 15% |
| Infraestructura y mantenimiento (1 año) | 15% |
| Capacitación a personal público | 5% |

## 7. Guion de exposición (7–10 minutos)

| Minuto | Contenido | Responsable sugerido |
|---|---|---|
| 0:00–1:00 | Apertura: el problema — servicios estatales digitales que excluyen a personas con discapacidad. | Vocero 1 |
| 1:00–2:30 | Marco ético: Justicia y Solidaridad aplicadas al diseño del portal (sección 3 de este documento). | Vocero 1 |
| 2:30–5:30 | Demo en vivo del prototipo: Inicio → Lector de Pantalla → LESSA → Ajustes de alto contraste → Contacto. | Vocero 2 |
| 5:30–7:00 | Impacto social esperado e indicadores de seguimiento. | Vocero 1 |
| 7:00–8:30 | Cumplimiento técnico WCAG 2.1 AA y decisiones de diseño clave (contraste, teclado, foco visible). | Vocero 2 |
| 8:30–10:00 | Cierre: cronograma, próximos pasos y preguntas. | Ambos |

---

*Equipo oferente — trabajo académico de Ética Profesional.*
