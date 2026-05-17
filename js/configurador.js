// configurador.js
// Lógica del configurador de gorras — iteración 1 (solo modelo Puma, vista lateral).

(function () {
  'use strict';

  /* ═══════════════════ CONFIGURACIÓN ═══════════════════ */

  var STORAGE_KEY = 'young-hats-diseno';

  // Paleta de colores oficial de Young Hats.
  // Tonos sólidos que se ven bien al aplicarse con multiply sobre la base blanca.
  var PALETA_CUERPO = [
    '#FFFFFF', // Blanco
    '#000000', // Negro
    '#1A1A2E', // Azul marino
    '#8B0000', // Vino
    '#D4AF37', // Mostaza
    '#2D5016', // Verde oliva
    '#6B4423', // Café
    '#C0392B'  // Rojo
  ];

  var PALETA_BORDADO = [
    '#FFFFFF', // Blanco
    '#000000', // Negro
    '#D4AF37', // Dorado
    '#C0392B'  // Rojo
  ];

  var ESTADO_DEFAULT = {
    colorCuerpo:   '#FFFFFF',
    texto:         '',
    colorBordado:  '#FFFFFF'
  };

  /* ═══════════════════ ESTADO ═══════════════════ */

  var estado = Object.assign({}, ESTADO_DEFAULT);

  /* ═══════════════════ REFERENCIAS DOM ═══════════════════ */

  var $color         = document.querySelector('.gorra-canvas__color');
  var $bordado       = document.querySelector('.gorra-canvas__bordado');
  var $inputTexto    = document.getElementById('input-bordado');
  var $paletaCuerpo  = document.getElementById('paleta-cuerpo');
  var $paletaBordado = document.getElementById('paleta-bordado');
  var $btnReset      = document.querySelector('.btn--reset');

  /* ═══════════════════ RENDER ═══════════════════ */

  function render() {
    if ($color)   $color.style.background = estado.colorCuerpo;
    if ($bordado) {
      $bordado.textContent  = estado.texto;
      $bordado.style.color  = estado.colorBordado;
    }
    actualizarSwatchesActivos();
    guardarEstado();
  }

  /* ═══════════════════ PALETAS ═══════════════════ */

  function generarPaleta($contenedor, colores, callback) {
    if (!$contenedor) return;
    $contenedor.innerHTML = '';
    colores.forEach(function (color) {
      var $swatch = document.createElement('button');
      $swatch.type = 'button';
      $swatch.className = 'swatch';
      $swatch.style.background = color;
      $swatch.setAttribute('data-color', color);
      $swatch.setAttribute('aria-label', 'Color ' + color);
      $swatch.addEventListener('click', function () { callback(color); });
      $contenedor.appendChild($swatch);
    });
  }

  function actualizarSwatchesActivos() {
    if ($paletaCuerpo) {
      $paletaCuerpo.querySelectorAll('.swatch').forEach(function (s) {
        s.classList.toggle('activo', s.dataset.color === estado.colorCuerpo);
      });
    }
    if ($paletaBordado) {
      $paletaBordado.querySelectorAll('.swatch').forEach(function (s) {
        s.classList.toggle('activo', s.dataset.color === estado.colorBordado);
      });
    }
  }

  /* ═══════════════════ PERSISTENCIA ═══════════════════ */

  function guardarEstado() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    } catch (e) {
      console.warn('No se pudo guardar el diseño:', e);
    }
  }

  function cargarEstado() {
    try {
      var guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        estado = Object.assign({}, ESTADO_DEFAULT, JSON.parse(guardado));
        if ($inputTexto) $inputTexto.value = estado.texto;
      }
    } catch (e) {
      console.warn('No se pudo cargar el diseño guardado:', e);
      estado = Object.assign({}, ESTADO_DEFAULT);
    }
  }

  /* ═══════════════════ EVENTOS ═══════════════════ */

  if ($inputTexto) {
    $inputTexto.addEventListener('input', function (e) {
      estado.texto = e.target.value.toUpperCase().slice(0, 12);
      e.target.value = estado.texto; // refleja el upper en el input
      render();
    });
  }

  if ($btnReset) {
    $btnReset.addEventListener('click', function () {
      estado = Object.assign({}, ESTADO_DEFAULT);
      if ($inputTexto) $inputTexto.value = '';
      render();
    });
  }

  /* ═══════════════════ INICIALIZACIÓN ═══════════════════ */

  generarPaleta($paletaCuerpo, PALETA_CUERPO, function (color) {
    estado.colorCuerpo = color;
    render();
  });

  generarPaleta($paletaBordado, PALETA_BORDADO, function (color) {
    estado.colorBordado = color;
    render();
  });

  cargarEstado();
  render();

})();
