// Lógica de accesibilidad compartida entre las 4 páginas del Portal Accesible.
// Guarda las preferencias en localStorage para que se mantengan al navegar
// entre Inicio, Lector, Señas y Ajustes.
(function () {
  "use strict";

  var STORAGE_KEY = "portalAccesibleA11y";
  var FONT_ORDER = ["sm", "md", "lg", "xxl"];
  var CONTRAST_ORDER = ["standard", "dark", "yellow"];
  var FONT_LABELS = { sm: "Pequeña (85%)", md: "Normal (100%)", lg: "Grande (125%)", xxl: "Extra grande (150%)" };
  var CONTRAST_LABELS = { standard: "Contraste estándar", dark: "Alto contraste, blanco sobre negro", yellow: "Alto contraste, negro sobre amarillo" };

  var defaults = {
    contrast: "standard",
    fontScale: "md",
    colorFilter: "none",
    reduceMotion: false,
    highlightClickable: true,
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
  function toggleTheme() {
    setContrast(state.contrast === "dark" ? "standard" : "dark");
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
  }

  function syncControls() {
    // Botón de tema claro/oscuro en la cabecera (presente en las 4 páginas)
    var isDark = state.contrast === "dark";
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    });

    // Interruptor rápido de contraste en Inicio
    var quickContrastBtn = document.getElementById("btn-high-contrast");
    var quickContrastStatus = document.getElementById("contrast-status");
    if (quickContrastBtn && quickContrastStatus) {
      quickContrastBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      quickContrastStatus.textContent = isDark ? "Sí" : "No";
      quickContrastBtn.classList.toggle("bg-inverse-surface", isDark);
      quickContrastBtn.classList.toggle("text-inverse-on-surface", isDark);
    }

    // Selector rápido A- / A / A+ en Inicio
    document.querySelectorAll("[data-font-quick]").forEach(function (btn) {
      var active = btn.getAttribute("data-font-quick") === state.fontScale;
      btn.setAttribute("aria-current", active ? "true" : "false");
      btn.classList.toggle("bg-primary", active);
      btn.classList.toggle("text-on-primary", active);
      btn.classList.toggle("bg-surface-container", !active);
      btn.classList.toggle("text-on-surface", !active);
    });

    // Controles completos en Ajustes
    document.querySelectorAll('input[name="contrast-mode"]').forEach(function (r) {
      r.checked = (r.value === state.contrast);
    });
    var filterSelect = document.getElementById("color-filter-select");
    if (filterSelect) { filterSelect.value = state.colorFilter; }
    var fontIndicator = document.getElementById("font-indicator");
    if (fontIndicator) { fontIndicator.textContent = FONT_LABELS[state.fontScale]; }
    document.querySelectorAll("[data-font-choice]").forEach(function (btn) {
      var active = btn.getAttribute("data-font-choice") === state.fontScale;
      btn.classList.toggle("bg-primary-container", active);
      btn.classList.toggle("text-on-primary", active);
      btn.classList.toggle("font-bold", active);
      btn.classList.toggle("bg-surface-container", !active);
      btn.classList.toggle("text-on-surface", !active);
    });
    var spacingToggle = document.getElementById("toggle-spacing");
    if (spacingToggle) { spacingToggle.checked = state.wideSpacing; }
    var guidedToggle = document.getElementById("toggle-guided-mode");
    if (guidedToggle) { guidedToggle.checked = state.guidedMode; }
    var highlightToggle = document.getElementById("toggle-highlight-clickable");
    if (highlightToggle) { highlightToggle.checked = state.highlightClickable; }
    var motionToggle = document.getElementById("toggle-reduce-motion");
    if (motionToggle) { motionToggle.checked = state.reduceMotion; }
  }

  // Oculta la cabecera y la barra inferior al bajar, las vuelve a mostrar al subir.
  function initScrollHide() {
    var lastY = window.scrollY;
    var ticking = false;
    var threshold = 12;

    function onScroll() {
      var y = window.scrollY;
      if (y <= 40) {
        document.body.classList.remove("scroll-hide-ui");
      } else if (y - lastY > threshold) {
        document.body.classList.add("scroll-hide-ui");
      } else if (lastY - y > threshold) {
        document.body.classList.remove("scroll-hide-ui");
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  function init() {
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.addEventListener("click", toggleTheme);
    });
    initScrollHide();

    var quickContrastBtn = document.getElementById("btn-high-contrast");
    if (quickContrastBtn) {
      quickContrastBtn.addEventListener("click", toggleTheme);
    }
    document.querySelectorAll("[data-font-quick]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setFontScale(btn.getAttribute("data-font-quick"));
      });
    });

    document.querySelectorAll('input[name="contrast-mode"]').forEach(function (input) {
      input.addEventListener("change", function (e) {
        if (e.target.checked) setContrast(e.target.value);
      });
    });
    var filterSelect = document.getElementById("color-filter-select");
    if (filterSelect) {
      filterSelect.addEventListener("change", function (e) { setColorFilter(e.target.value); });
    }
    document.querySelectorAll("[data-font-choice]").forEach(function (btn) {
      btn.addEventListener("click", function () { setFontScale(btn.getAttribute("data-font-choice")); });
    });
    var spacingToggle = document.getElementById("toggle-spacing");
    if (spacingToggle) {
      spacingToggle.addEventListener("change", function (e) { setBool("wideSpacing", e.target.checked, "Espaciado e interlineado amplio"); });
    }
    var guidedToggle = document.getElementById("toggle-guided-mode");
    if (guidedToggle) {
      guidedToggle.addEventListener("change", function (e) { setBool("guidedMode", e.target.checked, "Modo guiado paso a paso"); });
    }
    var highlightToggle = document.getElementById("toggle-highlight-clickable");
    if (highlightToggle) {
      highlightToggle.addEventListener("change", function (e) { setBool("highlightClickable", e.target.checked, "Destacado de elementos clicables"); });
    }
    var motionToggle = document.getElementById("toggle-reduce-motion");
    if (motionToggle) {
      motionToggle.addEventListener("change", function (e) { setBool("reduceMotion", e.target.checked, "Reducción de animaciones"); });
    }

    syncControls();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.PortalA11y = { setContrast: setContrast, setFontScale: setFontScale, stepFontScale: stepFontScale, setColorFilter: setColorFilter, setBool: setBool };
})();
