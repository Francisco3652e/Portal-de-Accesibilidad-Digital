// Lógica de accesibilidad compartida entre las 6 páginas de Mosaic.
// Guarda las preferencias en localStorage para que se mantengan al navegar
// entre Inicio, Lector, Señas, Ajustes, Acerca y Contacto.
(function () {
  "use strict";

  // v2: se renombró la clave para descartar preferencias guardadas por la versión anterior
  // (que activaba "Destacar elementos clicables" por defecto).
  var STORAGE_KEY = "mosaicA11y.v2";
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
    guidedMode: false,
    easyMode: false
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
    html.setAttribute("data-easy-mode", state.easyMode ? "true" : "false");
    applyEasyText();
  }

  // Modo fácil: los elementos con data-easy muestran su frase corta; al
  // desactivarlo se restaura el texto completo.
  function applyEasyText() {
    if (!document.body) { return; }
    document.querySelectorAll("[data-easy]").forEach(function (el) {
      if (state.easyMode) {
        if (!el.hasAttribute("data-full")) { el.setAttribute("data-full", el.innerHTML); }
        el.textContent = el.getAttribute("data-easy");
      } else if (el.hasAttribute("data-full")) {
        el.innerHTML = el.getAttribute("data-full");
        el.removeAttribute("data-full");
      }
    });
  }

  // Aplicar de inmediato (antes de DOMContentLoaded) para evitar parpadeos.
  applyState();
  if ("IntersectionObserver" in window) { document.documentElement.setAttribute("data-reveal", ""); }

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
    var map = { "toggle-spacing": "wideSpacing", "toggle-guided-mode": "guidedMode", "toggle-highlight-clickable": "highlightClickable", "toggle-reduce-motion": "reduceMotion", "toggle-easy-mode": "easyMode" };
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

  // ------------------------------------------------------------------
  // Aparición en cascada: cada sección revela sus piezas al entrar en pantalla.
  // ------------------------------------------------------------------
  var GROUPS = ".grid, .services, .ethics, .channels, .checklist, .guide-list, .console__keys, .help-band__actions, .hero__title, .console, .featured__side, .setting-group, .form";
  function initReveal() {
    if (!("IntersectionObserver" in window)) { return; }
    var sections = document.querySelectorAll("main [data-step]");
    sections.forEach(function (section) {
      var items = [];
      Array.prototype.forEach.call(section.children, function (child) {
        if (child.matches(GROUPS) && child.children.length) {
          Array.prototype.push.apply(items, child.children);
        } else {
          items.push(child);
        }
      });
      items.forEach(function (el, i) { el.classList.add("rv"); el.style.setProperty("--i", i); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ------------------------------------------------------------------
  // "Leer esta pantalla": como Speak Screen (iOS) o Select to Speak
  // (Android). Reúne el contenido visible de <main> y lo manda al lector,
  // que lo lee en voz alta. Si ya estamos en el lector, alterna la lectura.
  // Se activa con el botón de la cabecera, Alt+Mayús+L o deslizando cuatro
  // dedos hacia abajo. El lector se registra en window.MosaicReader.
  // ------------------------------------------------------------------
  function collectScreenText() {
    var main = document.querySelector("main");
    if (!main) { return ""; }
    var seen = {};
    var parts = [];
    var nodes = main.querySelectorAll("h1, h2, h3, h4, p, li, dt, dd, blockquote, figcaption, summary, th, td, label, legend");
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.closest("#guide-bar, [hidden], .sr-only, [aria-hidden='true'], script, style")) { return; }
      if (el.querySelector("p, li")) { return; } // se leerán sus hijos
      if (!el.offsetParent && el.tagName !== "SUMMARY") { return; } // no visible
      var t = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      if (t.length < 2 || seen[t]) { return; }
      seen[t] = true;
      parts.push(t);
    });
    return parts.join("\n\n");
  }

  function readScreen() {
    if (window.MosaicReader) { window.MosaicReader.toggle(); return; }
    var text = collectScreenText();
    if (!text) { announce("No hay texto para leer en esta pantalla."); return; }
    try {
      sessionStorage.setItem("mosaic.readScreen", JSON.stringify({ title: document.title, text: text }));
    } catch (e) { /* sin almacenamiento: el lector pedirá el texto */ }
    announce("Abriendo el lector para leer esta pantalla.");
    window.location.href = "lector.html?leer=pantalla";
  }

  // Atajos de teclado (Alt+Mayús+tecla, para no chocar con NVDA/JAWS/VoiceOver)
  // y gestos táctiles válidos en todo el sitio. En el lector, además, hay
  // teclas de reproductor (Espacio, flechas) definidas en lector.html.
  var COMBOS = { l: "toggle", j: "rewind", k: "forward", r: "repeat", p: "paste", d: "dictate", c: "camera" };
  function initShortcuts() {
    document.addEventListener("keydown", function (e) {
      if (!e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) { return; }
      var key = (e.key || "").toLowerCase();
      // Con Alt+Mayús algunos teclados entregan el código en vez de la letra.
      if (!COMBOS[key] && /^Key[A-Z]$/.test(e.code || "")) { key = e.code.slice(3).toLowerCase(); }
      var action = COMBOS[key];
      if (!action) { return; }
      e.preventDefault();
      if (action === "toggle") { readScreen(); return; }
      if (window.MosaicReader && window.MosaicReader[action]) { window.MosaicReader[action](); }
      else if (action === "paste" || action === "dictate" || action === "camera") { window.location.href = "lector.html#entradas"; }
    });

    // Gestos: cuatro dedos hacia abajo = leer pantalla; dos dedos (toque) =
    // pausa/reanudar; un dedo a la izquierda/derecha = retroceder/avanzar.
    // El de cuatro dedos se detecta durante el movimiento (touchmove) porque
    // el navegador suele "quedarse" el gesto multitáctil (zoom/desplazamiento)
    // y dispara touchcancel en vez de touchend.
    var start = null;
    document.addEventListener("touchstart", function (e) {
      var t = e.touches[0];
      if (start && e.touches.length > 1) { start.n = Math.max(start.n, e.touches.length); return; }
      start = { x: t.clientX, y: t.clientY, n: e.touches.length, at: Date.now(), target: e.target, fired: false };
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      if (!start) { return; }
      if (e.touches.length > start.n) { start.n = e.touches.length; }
      if (start.fired || start.n < 4) { return; }
      var t = e.touches[0];
      var dy = t.clientY - start.y, dx = t.clientX - start.x;
      if (dy > 80 && Math.abs(dx) < 90) { start.fired = true; readScreen(); }
    }, { passive: true });
    document.addEventListener("touchcancel", function () { start = null; }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (!start || e.touches.length) { return; }
      var s = start; start = null;
      if (s.fired) { return; }
      if (s.target && s.target.closest && s.target.closest("input, textarea, select, video, audio, .cam")) { return; }
      var t = e.changedTouches[0];
      var dx = t.clientX - s.x, dy = t.clientY - s.y, dt = Date.now() - s.at;
      var moved = Math.abs(dx) > 20 || Math.abs(dy) > 20;
      if (s.n >= 4 && dy > 80 && Math.abs(dx) < 90) { readScreen(); return; }
      if ((s.n === 2 || s.n === 3) && !moved && dt < 350) { e.preventDefault(); toggleReader(); return; }
      if (s.n === 1 && dt < 700 && Math.abs(dx) > 90 && Math.abs(dy) < 50 && window.MosaicReader) {
        if (dx < 0) { window.MosaicReader.rewind(); } else { window.MosaicReader.forward(); }
      }
    });
  }
  function toggleReader() {
    if (window.MosaicReader) { window.MosaicReader.toggle(); } else { readScreen(); }
  }

  function initApp() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) { return; }
    navigator.serviceWorker.register("sw.js").catch(function () { /* opcional */ });
  }

  function init() {
    applyEasyText();
    initReveal();
    initShortcuts();
    initApp();
    document.querySelectorAll('[data-action="read-screen"]').forEach(function (btn) {
      btn.addEventListener("click", readScreen);
    });
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
      ["toggle-reduce-motion", "reduceMotion", "Reducción de animaciones"],
      ["toggle-easy-mode", "easyMode", "Modo fácil"]
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

  window.PortalA11y = { setContrast: setContrast, setFontScale: setFontScale, stepFontScale: stepFontScale, setColorFilter: setColorFilter, setBool: setBool, readScreen: readScreen, collectScreenText: collectScreenText };
})();
