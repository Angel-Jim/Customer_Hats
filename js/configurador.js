// configurador.js — iteración 3: selector modelo+vista unificado

(function () {
  'use strict';

  /* ═══════════════════ CONFIGURACIÓN ═══════════════════ */

  var STORAGE_KEY = 'young-hats-diseno';

  var PALETA_CUERPO = [
    '#FFFFFF', '#000000', '#1A1A2E', '#8B0000',
    '#D4AF37', '#2D5016', '#6B4423', '#C0392B'
  ];

  var PALETA_BORDADO = [
    '#FFFFFF', '#000000', '#D4AF37', '#C0392B'
  ];

  var VISTAS = {
    puma: {
      lateral: {
        imagen:       'img/gorra_blanca_fondo_blanco_de_lado_puma.png',
        mascara:      'img/mascaras/gorra-puma-lateral-mascara.svg',
        maskSize:     '100% 100%',
        maskPosition: 'center',
        maskRepeat:   'no-repeat',
        colorTop:     '59px',
        colorHeight:  '258px',
        // Texto lateral: perspectiva 3D sobre el panel frontal (derecha de la imagen)
        textoTop:       '43%',
        textoLeft:      '-22%',
        textoWidth:     '100%',
        textoArco:      'M 20 72 Q 210 50 440 68',
        textoTransform: 'perspective(280px) rotateY(-22deg)',
        textoOrigin:    'right center'
      },
      frente: {
        imagen:       'img/gorra_blanca_fondo_blanco_de_frente_puma.png',
        mascara:      'img/mascaras/gorra-puma-frente-mascara.svg',
        maskSize:     'auto 90%',
        maskPosition: 'center',
        maskRepeat:   'no-repeat',
        colorTop:     '45px',
        colorHeight:  '288px',
        // Texto frente: arco centrado sin perspectiva
        textoTop:       '45%',
        textoLeft:      '0',
        textoWidth:     '100%',
        textoArco:      'M 20 75 Q 250 38 480 75',
        textoTransform: 'none',
        textoOrigin:    'center center'
      }
    },
    normal: {
      lateral: {
        imagen:       'img/gorra_blanca_fondo_blanco.png',
        mascara:      'img/mascaras/gorra-lateral-mascara.svg',
        maskSize:     '100% 100%',
        maskPosition: 'center',
        maskRepeat:   'no-repeat',
        colorTop:     '66px',
        colorHeight:  '237px',
        textoTop:       '37%',
        textoLeft:      '-18%',
        textoWidth:     '100%',
        textoArco:      'M 20 72 Q 210 50 440 68',
        textoTransform: 'perspective(280px) rotateY(-22deg)',
        textoOrigin:    'right center'
      },
      frente: {
        imagen:       'img/gorra_blanca_fondo_blanco_de_frente.png',
        mascara:      'img/mascaras/gorra-frente-mascara.svg',
        maskSize:     'auto 90%',
        maskPosition: 'center',
        maskRepeat:   'no-repeat',
        colorTop:     '44px',
        colorHeight:  '289px',
        textoTop:       '38%',
        textoLeft:      '0',
        textoWidth:     '100%',
        textoArco:      'M 20 75 Q 250 38 480 75',
        textoTransform: 'none',
        textoOrigin:    'center center'
      }
    }
  };

  var ESTADO_DEFAULT = {
    colorCuerpo:  '#FFFFFF',
    texto:        '',
    colorBordado: '#FFFFFF',
    modelo:       'puma',
    vista:        'lateral',
    logoSrc:      ''
  };

  /* ═══════════════════ ESTADO ═══════════════════ */

  var estado = Object.assign({}, ESTADO_DEFAULT);

  /* ═══════════════════ REFERENCIAS DOM ═══════════════════ */

  var $base          = document.querySelector('.gorra-canvas__base');
  var $color         = document.querySelector('.gorra-canvas__color');
  var $bordadoSVG    = document.querySelector('.gorra-canvas__bordado');
  var $textoSVG      = document.getElementById('texto-bordado');
  var $textPath      = document.querySelector('.gorra-canvas__bordado textPath');
  var $arcoBordado   = document.getElementById('arco-bordado');
  var $logo          = document.getElementById('preview-logo');
  var $inputTexto      = document.getElementById('input-bordado');
  var $inputColorCustom        = document.getElementById('input-color-custom');
  var $colorCustomHex          = document.getElementById('color-custom-hex');
  var $inputColorBordadoCustom = document.getElementById('input-color-bordado-custom');
  var $colorBordadoHex         = document.getElementById('color-bordado-hex');
  var $inputLogo               = document.getElementById('input-logo');
  var $btnQuitarLogo = document.getElementById('btn-quitar-logo');
  var $paletaCuerpo  = document.getElementById('paleta-cuerpo');
  var $paletaBordado = document.getElementById('paleta-bordado');
  var $btnReset      = document.querySelector('.btn--reset');

  /* ═══════════════════ RENDER ═══════════════════ */

  function render() {
    var cfg = VISTAS[estado.modelo] && VISTAS[estado.modelo][estado.vista];
    if (!cfg) return;

    if ($base) $base.src = cfg.imagen;

    if ($color) {
      $color.style.top                = cfg.colorTop;
      $color.style.height             = cfg.colorHeight;
      $color.style.webkitMaskImage    = "url('" + cfg.mascara + "')";
      $color.style.maskImage          = "url('" + cfg.mascara + "')";
      $color.style.webkitMaskSize     = cfg.maskSize;
      $color.style.maskSize           = cfg.maskSize;
      $color.style.webkitMaskPosition = cfg.maskPosition;
      $color.style.maskPosition       = cfg.maskPosition;
      $color.style.webkitMaskRepeat   = cfg.maskRepeat;
      $color.style.maskRepeat         = cfg.maskRepeat;
      $color.style.background         = estado.colorCuerpo;
    }

    // Bordado: posición, perspectiva y arco según vista
    if ($bordadoSVG) {
      $bordadoSVG.style.display         = '';
      $bordadoSVG.style.top             = cfg.textoTop;
      $bordadoSVG.style.left            = cfg.textoLeft;
      $bordadoSVG.style.width           = cfg.textoWidth;
      $bordadoSVG.style.transform       = cfg.textoTransform;
      $bordadoSVG.style.transformOrigin = cfg.textoOrigin;
    }
    if ($arcoBordado) $arcoBordado.setAttribute('d', cfg.textoArco);
    if ($textPath)    $textPath.textContent = estado.texto;
    if ($textoSVG)    $textoSVG.setAttribute('fill', estado.colorBordado);

    // Sincroniza pickers con colores activos
    if ($inputColorCustom)        $inputColorCustom.value                = estado.colorCuerpo;
    if ($colorCustomHex)          $colorCustomHex.textContent            = estado.colorCuerpo.toUpperCase();
    if ($inputColorBordadoCustom) $inputColorBordadoCustom.value         = estado.colorBordado;
    if ($colorBordadoHex)         $colorBordadoHex.textContent           = estado.colorBordado.toUpperCase();

    // Logo propio: solo disponible en modelo normal
    var $seccionLogo = document.getElementById('seccion-logo');
    if ($seccionLogo) {
      $seccionLogo.style.display = (estado.modelo === 'puma') ? 'none' : '';
    }
    if (estado.modelo === 'puma' && $logo) {
      $logo.src = '';
      $logo.classList.remove('visible');
    }

    // Perspectiva del logo igual que el texto según vista
    if ($logo) {
      if (estado.vista === 'lateral') {
        $logo.style.transform       = 'translateX(-50%) ' + cfg.textoTransform;
        $logo.style.transformOrigin = cfg.textoOrigin;
      } else {
        $logo.style.transform       = 'translateX(-50%)';
        $logo.style.transformOrigin = 'center center';
      }
    }

    actualizarSelectorActivo();
    actualizarSwatchesActivos();
    guardarEstado();
  }

  /* ═══════════════════ ACTUALIZACIONES UI ═══════════════════ */

  function actualizarSelectorActivo() {
    document.querySelectorAll('.btn-modelo-vista').forEach(function (btn) {
      var activo = btn.dataset.modelo === estado.modelo
                && btn.dataset.vista  === estado.vista;
      btn.classList.toggle('activo', activo);
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

  /* ═══════════════════ PERSISTENCIA ═══════════════════ */

  function guardarEstado() {
    try {
      var toSave = Object.assign({}, estado);
      delete toSave.logoSrc;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {}
  }

  function cargarEstado() {
    try {
      var guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        estado = Object.assign({}, ESTADO_DEFAULT, JSON.parse(guardado));
        if ($inputTexto) $inputTexto.value = estado.texto;
      }
    } catch (e) {
      estado = Object.assign({}, ESTADO_DEFAULT);
    }
  }

  /* ═══════════════════ EVENTOS ═══════════════════ */

  // Selector modelo + vista unificado
  document.querySelectorAll('.btn-modelo-vista').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modelo = btn.dataset.modelo;
      var vista  = btn.dataset.vista;
      if (!modelo || !vista || !VISTAS[modelo] || !VISTAS[modelo][vista]) return;
      estado.modelo = modelo;
      estado.vista  = vista;
      render();
    });
  });

  // Color personalizado (RGB picker)
  if ($inputColorCustom) {
    $inputColorCustom.addEventListener('input', function (e) {
      estado.colorCuerpo = e.target.value;
      if ($colorCustomHex) $colorCustomHex.textContent = e.target.value.toUpperCase();
      render();
    });
  }

  // Color personalizado del bordado (RGB picker)
  if ($inputColorBordadoCustom) {
    $inputColorBordadoCustom.addEventListener('input', function (e) {
      estado.colorBordado = e.target.value;
      if ($colorBordadoHex) $colorBordadoHex.textContent = e.target.value.toUpperCase();
      render();
    });
  }

  // Texto bordado
  if ($inputTexto) {
    $inputTexto.addEventListener('input', function (e) {
      estado.texto = e.target.value.toUpperCase().slice(0, 12);
      e.target.value = estado.texto;
      render();
    });
  }

  // Reset
  if ($btnReset) {
    $btnReset.addEventListener('click', function () {
      estado = Object.assign({}, ESTADO_DEFAULT);
      if ($inputTexto) $inputTexto.value = '';
      if ($textPath) $textPath.textContent = '';
      if ($textoSVG) $textoSVG.setAttribute('fill', ESTADO_DEFAULT.colorBordado);
      if ($logo) { $logo.src = ''; $logo.classList.remove('visible'); }
      if ($inputLogo) $inputLogo.value = '';
      if ($btnQuitarLogo) $btnQuitarLogo.style.display = 'none';
      render();
    });
  }

  // Subir logo
  if ($inputLogo) {
    $inputLogo.addEventListener('change', function (e) {
      var archivo = e.target.files[0];
      if (!archivo) return;
      if (archivo.size > 2 * 1024 * 1024) {
        alert('El archivo es muy grande. Máximo 2MB.');
        return;
      }
      var reader = new FileReader();
      reader.onload = function (ev) {
        if ($logo) { $logo.src = ev.target.result; $logo.classList.add('visible'); }
        if ($btnQuitarLogo) $btnQuitarLogo.style.display = '';
        estado.logoSrc = ev.target.result;
      };
      reader.readAsDataURL(archivo);
    });
  }

  if ($btnQuitarLogo) {
    $btnQuitarLogo.addEventListener('click', function () {
      if ($logo) { $logo.src = ''; $logo.classList.remove('visible'); }
      if ($inputLogo) $inputLogo.value = '';
      $btnQuitarLogo.style.display = 'none';
      estado.logoSrc = '';
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
