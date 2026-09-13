// Lógica de accesibilidad compartida entre las 6 páginas de Mosaic.
// Guarda las preferencias en localStorage para que se mantengan al navegar
// entre Inicio, Lector, Señas, Ajustes, Acerca y Contacto.
(function () {
  "use strict";

  var STORAGE_KEY = "portalAccesibleA11y";
  var FONT_ORDER = ["sm", "md", "lg", "xxl"];
  var FONT_LABELS = { sm: "Pequeña (85%)", md: "Normal (100%)", lg: "Grande (118%)", xxl: "Extra grande (140%)" };
  var CONTRAST_LABELS = { standard: "Contraste estándar", dark: "Alto contraste, blanco sobre negro", yellow: "Alto contraste, amarillo sobre negro" };

  var defaults = {
    contrast: "standard",
    fontScale: "md",
    colorFilter: "none",
    reduceMotion: false,
    highlightClickable: false,
    wideSpacing: false,
    guidedMode: false
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Object.assign({}, defaults, JSON.parse(raw)) : Object.assign({}, defaults);
    } catch (e) {
      return Object.assign({}, defaults);
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* almacenamiento no disponible */ }
  }

  var state = loadState();

  function applyState() {
    var html = document.documentElement;
    html.setAttribute("data-contrast", state.contrast);
    html.setAttribute("data-font-scale", state.fontScale);
    html.setAttribute("data-color-filter", state.colorFilter);
    html.setAttribute("data-reduce-motion", state.reduceMotion ? "true" : "false");
    html.setAttribute("data-highlight-clickable", state.highlightClickable ? "true" : "false");
    html.setAttribute("data-wide-spacing", state.wideSpacing ? "true" : "false");
    html.setAttribute("data-guided-mode", state.guidedMode ? "true" : "false");
  }

  // Aplicar de inmediato (antes de DOMContentLoaded) para evitar parpadeos.
  applyState();

  function announce(msg) {
    var region = document.getElementById("a11y-announcer");
    if (region) { region.textContent = msg; }
  }

  function setContrast(value) {
    state.contrast = value; saveState(); applyState();
    announce(CONTRAST_LABELS[value] || value);
    syncControls();
  }
  // El interruptor de la cabecera alterna entre estándar y blanco sobre negro.
  function toggleContrast() {
    setContrast(state.contrast === "standard" ? "dark" : "standard");
  }
  function setFontScale(value) {
    if (FONT_ORDER.indexOf(value) === -1) return;
    state.fontScale = value; saveState(); applyState();
    announce("Tamaño de texto: " + FONT_LABELS[value]);
    syncControls();
  }
  function stepFontScale(direction) {
    var i = FONT_ORDER.indexOf(state.fontScale);
    var next = direction === "up" ? Math.min(i + 1, FONT_ORDER.length - 1) : Math.max(i - 1, 0);
    setFontScale(FONT_ORDER[next]);
  }
  function setColorFilter(value) {
    state.colorFilter = value; saveState(); applyState();
    announce("Filtro de color aplicado: " + value);
    syncControls();
  }
  function setBool(key, value, label) {
    state[key] = value; saveState(); applyState();
    announce(label + (value ? " activado" : " desactivado"));
    syncControls();
    if (key === "guidedMode") { guided.refresh(); }
  }

  function syncControls() {
    var isHigh = state.contrast !== "standard";

    // Interruptor de alto contraste en la cabecera (presente en todas las páginas)
    document.querySelectorAll('[data-action="toggle-contrast"]').forEach(function (btn) {
      btn.setAttribute("aria-pressed", isHigh ? "true" : "false");
      var lbl = btn.querySelector(".contrast-switch__state");
      if (lbl) { lbl.textContent = isHigh ? "Sí" : "No"; }
    });

    // Tecla rápida de contraste en Inicio
    var quickContrastBtn = document.getElementById("btn-high-contrast");
    var quickContrastStatus = document.getElementById("contrast-status");
    if (quickContrastBtn && quickContrastStatus) {
      quickContrastBtn.setAttribute("aria-pressed", isHigh ? "true" : "false");
      quickContrastStatus.textContent = isHigh ? "Sí" : "No";
    }

    // Selector rápido A- / A / A+ en Inicio y botones completos en Ajustes
    document.querySelectorAll("[data-font-quick], [data-font-choice]").forEach(function (btn) {
      var v = btn.getAttribute("data-font-quick") || btn.getAttribute("data-font-choice");
      btn.setAttribute("aria-current", v === state.fontScale ? "true" : "false");
    });
    var fontIndicator = document.getElementById("font-indicator");
    if (fontIndicator) { fontIndicator.textContent = FONT_LABELS[state.fontScale]; }

    document.querySelectorAll('input[name="contrast-mode"]').forEach(function (r) {
      r.checked = (r.value === state.contrast);
    });
    var filterSelect = document.getElementById("color-filter-select");
    if (filterSelect) { filterSelect.value = state.colorFilter; }
    var map = { "toggle-spacing": "wideSpacing", "toggle-guided-mode": "guidedMode", "toggle-highlight-clickable": "highlightClickable", "toggle-reduce-motion": "reduceMotion" };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.checked = !!state[map[id]]; }
    });
  }

  // ------------------------------------------------------------------
  // Modo guiado: muestra una sola sección a la vez con Anterior / Siguiente.
  // Las secciones candidatas llevan data-step; su nombre sale del primer
  // encabezado o del aria-label.
  // ------------------------------------------------------------------
  var guided = (function () {
    var steps = [];
    var index = 0;
    var bar = null;

    function stepName(el) {
      var h = el.querySelector("h1, h2, h3");
      return (h && h.textContent.trim()) || el.getAttribute("aria-label") || "Sección";
    }

    function build() {
      steps = Array.prototype.slice.call(document.querySelectorAll("main [data-step]"));
      bar = document.getElementById("guide-bar");
      if (!steps.length || !bar) { return; }
      bar.querySelector("[data-guide-prev]").addEventListener("click", function () { go(index - 1); });
      bar.querySelector("[data-guide-next]").addEventListener("click", function () { go(index + 1); });
      bar.querySelector("[data-guide-exit]").addEventListener("click", function () {
        setBool("guidedMode", false, "Modo guiado paso a paso");
      });
    }

    function go(i) {
      index = Math.max(0, Math.min(steps.length - 1, i));
      render();
      var current = steps[index];
      current.setAttribute("tabindex", "-1");
      current.focus({ preventScroll: true });
      current.scrollIntoView({ block: "start", behavior: state.reduceMotion ? "auto" : "smooth" });
      announce("Paso " + (index + 1) + " de " + steps.length + ": " + stepName(current));
    }

    function render() {
      if (!steps.length || !bar) { return; }
      var on = state.guidedMode;
      steps.forEach(function (s, i) { s.hidden = on && i !== index; });
      if (!on) { return; }
      bar.querySelector("[data-guide-count]").textContent = "Paso " + (index + 1) + " de " + steps.length;
      bar.querySelector("[data-guide-title]").textContent = stepName(steps[index]);
      bar.querySelector("[data-guide-prev]").disabled = index === 0;
      bar.querySelector("[data-guide-next]").disabled = index === steps.length - 1;
    }

    return {
      init: function () { build(); render(); },
      refresh: function () { index = 0; render(); }
    };
  })();

  function init() {
    document.querySelectorAll('[data-action="toggle-contrast"]').forEach(function (btn) {
      btn.addEventListener("click", toggleContrast);
    });
    var quickContrastBtn = document.getElementById("btn-high-contrast");
    if (quickContrastBtn) { quickContrastBtn.addEventListener("click", toggleContrast); }

    document.querySelectorAll("[data-font-quick]").forEach(function (btn) {
      btn.addEventListener("click", function () { setFontScale(btn.getAttribute("data-font-quick")); });
    });
    document.querySelectorAll("[data-font-choice]").forEach(function (btn) {
      btn.addEventListener("click", function () { setFontScale(btn.getAttribute("data-font-choice")); });
    });
    document.querySelectorAll('input[name="contrast-mode"]').forEach(function (input) {
      input.addEventListener("change", function (e) { if (e.target.checked) setContrast(e.target.value); });
    });
    var filterSelect = document.getElementById("color-filter-select");
    if (filterSelect) {
      filterSelect.addEventListener("change", function (e) { setColorFilter(e.target.value); });
    }
    var bools = [
      ["toggle-spacing", "wideSpacing", "Espaciado e interlineado amplio"],
      ["toggle-guided-mode", "guidedMode", "Modo guiado paso a paso"],
      ["toggle-highlight-clickable", "highlightClickable", "Destacado de elementos clicables"],
      ["toggle-reduce-motion", "reduceMotion", "Reducción de animaciones"]
    ];
    bools.forEach(function (b) {
      var el = document.getElementById(b[0]);
      if (el) { el.addEventListener("change", function (e) { setBool(b[1], e.target.checked, b[2]); }); }
    });

    guided.init();
    syncControls();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.PortalA11y = { setContrast: setContrast, setFontScale: setFontScale, stepFontScale: stepFontScale, setColorFilter: setColorFilter, setBool: setBool };
})();
