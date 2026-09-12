// Paleta y tipografía del sistema de diseño "Clarity Accessible Design System"
// (misma paleta que la plantilla generada con Stitch — ver ../clarity_accessible_design_system/DESIGN.md)
// Nota: se corrigió "surface-container-highest" (en la plantilla original faltaba el "#").
//
// Repintado a un look minimalista (inspirado en eco-canje-sv.vercel.app): base
// neutra en escala de grises + un solo acento verde como color de marca, con
// teal/ámbar como acentos secundario/terciario. Cada tono se eligió para
// conservar (o mejorar) el contraste que ya tenía el color azul original al
// que reemplaza, ya que esta es una página de accesibilidad con controles de
// alto contraste que dependen de esos contrastes (ver assets/site.css). La
// tipografía (Atkinson Hyperlegible Next) se dejó intacta a propósito: es una
// fuente diseñada para legibilidad en baja visión, más importante aquí que
// imitar la tipografía del sitio de referencia.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#f9fafb",
        "tertiary-fixed": "#fef3c7",
        "surface-tint": "#166534",
        "on-background": "#111827",
        "on-secondary-fixed-variant": "#0f766e",
        "outline": "#9ca3af",
        "on-secondary-fixed": "#042f2e",
        "surface-container-low": "#f9fafb",
        "on-secondary-container": "#134e4a",
        "on-primary-fixed-variant": "#166534",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#86efac",
        "error-container": "#ffdad6",
        "surface-container": "#f3f4f6",
        "on-primary": "#ffffff",
        "primary-fixed": "#dcfce7",
        "on-error": "#ffffff",
        "error": "#ba1a1a",
        "tertiary-fixed-dim": "#fcd34d",
        "surface-container-high": "#e5e7eb",
        "surface-dim": "#e5e7eb",
        "secondary-fixed": "#99f6e4",
        "on-primary-fixed": "#052e16",
        "tertiary-container": "#78350f",
        "surface-variant": "#e5e7eb",
        "primary": "#14532d",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed-variant": "#92400e",
        "surface-bright": "#f9fafb",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#4b5563",
        "tertiary": "#92400e",
        "on-tertiary-fixed": "#451a03",
        "primary-container": "#166534",
        "on-tertiary-container": "#fde68a",
        "on-error-container": "#93000a",
        "secondary-fixed-dim": "#5eead4",
        "inverse-on-surface": "#f9fafb",
        "on-primary-container": "#bbf7d0",
        "outline-variant": "#d1d5db",
        "surface-container-highest": "#d1d5db",
        "secondary": "#0f766e",
        "surface": "#f9fafb",
        "secondary-container": "#ccfbf1",
        "inverse-surface": "#1f2937",
        "on-surface": "#111827",
        "primary-fixed-dim": "#86efac"
      },
      borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
      spacing: {
        "space-sm": "0.5rem", "space-lg": "1.5rem", "space-md": "1rem", "space-xs": "0.25rem",
        "gutter-desktop": "2rem", "gutter": "1.5rem", "margin-desktop": "3rem", "margin-tablet": "2rem",
        "space-xl": "2.5rem", "margin": "1rem"
      },
      fontFamily: {
        "label-lg": ["Atkinson Hyperlegible Next"], "body-sm": ["Atkinson Hyperlegible Next"],
        "label-sm": ["Atkinson Hyperlegible Next"], "display-hero-mobile": ["Atkinson Hyperlegible Next"],
        "body-lg": ["Atkinson Hyperlegible Next"], "body-md": ["Atkinson Hyperlegible Next"],
        "label-md": ["Atkinson Hyperlegible Next"], "headline-lg": ["Atkinson Hyperlegible Next"],
        "display-hero": ["Atkinson Hyperlegible Next"], "headline-sm": ["Atkinson Hyperlegible Next"],
        "headline-lg-mobile": ["Atkinson Hyperlegible Next"], "headline-md": ["Atkinson Hyperlegible Next"]
      },
      fontSize: {
        "label-lg": ["1rem", { "lineHeight": "1.5rem", "letterSpacing": "0.01em", "fontWeight": "600" }],
        "body-sm": ["0.875rem", { "lineHeight": "1.375rem", "letterSpacing": "0.015em", "fontWeight": "400" }],
        "label-sm": ["0.75rem", { "lineHeight": "1rem", "letterSpacing": "0.04em", "fontWeight": "700" }],
        "display-hero-mobile": ["2.25rem", { "lineHeight": "2.75rem", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "body-lg": ["1.125rem", { "lineHeight": "1.75rem", "letterSpacing": "0.01em", "fontWeight": "400" }],
        "body-md": ["1rem", { "lineHeight": "1.625rem", "letterSpacing": "0.01em", "fontWeight": "400" }],
        "label-md": ["0.875rem", { "lineHeight": "1.25rem", "letterSpacing": "0.02em", "fontWeight": "600" }],
        "headline-lg": ["2.25rem", { "lineHeight": "2.75rem", "letterSpacing": "-0.015em", "fontWeight": "700" }],
        "display-hero": ["3.25rem", { "lineHeight": "3.75rem", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-sm": ["1.375rem", { "lineHeight": "1.875rem", "letterSpacing": "0em", "fontWeight": "600" }],
        "headline-lg-mobile": ["1.75rem", { "lineHeight": "2.25rem", "letterSpacing": "0em", "fontWeight": "700" }],
        "headline-md": ["1.75rem", { "lineHeight": "2.25rem", "letterSpacing": "-0.01em", "fontWeight": "600" }]
      }
    }
  }
};
