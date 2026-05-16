(function () {

  /* ══════════════════════════════════════
     TOGGLE DE TEMA
  ══════════════════════════════════════ */
  const root  = document.documentElement;
  const btn   = document.getElementById('btn-tema');
  const CLAVE = 'yh-tema';

  function aplicarTema(tema) {
    tema === 'claro'
      ? root.setAttribute('data-tema', 'claro')
      : root.removeAttribute('data-tema');
    localStorage.setItem(CLAVE, tema);
  }

  const guardado = localStorage.getItem(CLAVE);
  if (guardado) {
    aplicarTema(guardado);
  } else {
    aplicarTema(window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro');
  }

  btn.addEventListener('click', function () {
    aplicarTema(root.getAttribute('data-tema') === 'claro' ? 'oscuro' : 'claro');
  });


  /* ══════════════════════════════════════
     MODELOS Y SUS VISTAS
  ══════════════════════════════════════ */
  var modelos = {
    normal: [
      { src: 'img/gorra_blanca_fondo_blanco_de_frente.png', label: 'Frente'  },
      { src: 'img/gorra_blanca_fondo_blanco.png',           label: 'Lateral' }
    ],
    puma: [
      { src: 'img/gorra_blanca_fondo_blanco_de_frente_puma.png', label: 'Frente'  },
      { src: 'img/gorra_blanca_fondo_blanco_de_lado_puma.png',   label: 'Lateral' }
    ]
  };

  var modeloActivo = 'normal';
  var vistaActiva  = 0;

  var imgPrincipal  = document.getElementById('preview-principal');
  var thumbsWrapper = document.querySelector('.preview__thumbs');
  var botonesModelo = document.querySelectorAll('.btn-modelo');

  /* Cambia la imagen principal con fade */
  function cambiarImgPrincipal(src) {
    imgPrincipal.style.opacity = '0';
    setTimeout(function () {
      imgPrincipal.src = src;
      imgPrincipal.style.opacity = '1';
    }, 150);
  }

  /* Reconstruye los thumbnails según el modelo */
  function renderThumbs(modelo, vistaIdx) {
    thumbsWrapper.innerHTML = '';
    modelos[modelo].forEach(function (vista, i) {
      var btn = document.createElement('button');
      btn.className = 'thumb' + (i === vistaIdx ? ' activo' : '');
      btn.setAttribute('aria-label', vista.label);
      btn.dataset.src = vista.src;
      btn.innerHTML =
        '<img src="' + vista.src + '" alt="' + vista.label + '" />' +
        '<span>' + vista.label + '</span>';

      btn.addEventListener('click', function () {
        vistaActiva = i;
        cambiarImgPrincipal(vista.src);
        thumbsWrapper.querySelectorAll('.thumb').forEach(function (t) {
          t.classList.remove('activo');
        });
        btn.classList.add('activo');
      });

      thumbsWrapper.appendChild(btn);
    });
  }

  /* Cambia de modelo completo */
  function cambiarModelo(modelo) {
    modeloActivo = modelo;
    vistaActiva  = 0;
    cambiarImgPrincipal(modelos[modelo][0].src);
    renderThumbs(modelo, 0);

    botonesModelo.forEach(function (b) {
      b.classList.toggle('activo', b.dataset.modelo === modelo);
    });
  }

  /* Init */
  renderThumbs(modeloActivo, vistaActiva);

  botonesModelo.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.modelo !== modeloActivo) {
        cambiarModelo(b.dataset.modelo);
      }
    });
  });

})();
