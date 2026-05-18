# Young Hats — Configurador de Gorras Personalizado

Plataforma web para diseñar y pedir gorras personalizadas en tiempo real. El usuario puede elegir modelo, color, texto bordado y logo, ver el resultado al instante y enviar su pedido.

---

## Vista general

Young Hats es un sitio de una sola página (SPA estático) orientado al mercado mexicano. No requiere servidor backend ni frameworks: todo corre en el navegador usando HTML, CSS y JavaScript vanilla.

El flujo es simple:

1. El cliente elige modelo de gorra y ángulo de vista (lateral / frente).
2. Personaliza color del cuerpo, texto bordado y logo propio.
3. Envía su pedido con nombre y correo para coordinación manual.

---

## Funcionalidades principales

| Funcionalidad | Descripción |
|---|---|
| Selector de modelo y vista | 2 modelos (Normal y Puma), 2 ángulos por modelo (lateral y frente) |
| Color del cuerpo | 8 colores predefinidos + selector RGB personalizado |
| Texto bordado | Hasta 12 caracteres, curvado sobre la visera mediante SVG `textPath` |
| Color del bordado | 4 presets + selector RGB |
| Carga de logo | PNG o SVG, máx 2 MB (solo modelo Normal) |
| Vista previa en tiempo real | Sistema de capas CSS: imagen base + máscara SVG + color + logo + texto |
| Modo claro / oscuro | Detecta preferencia del sistema; toggle manual con persistencia en `localStorage` |
| Guardado automático | El diseño se guarda en `localStorage` y se restaura al recargar |
| Formulario de pedido | Nombre, correo y notas; notificación tipo toast al enviar |
| Diseño responsivo | Adaptado a móvil, tablet y escritorio |

---

## Tecnologías usadas

| Capa | Tecnología |
|---|---|
| Maquetado | HTML5 semántico (`section`, `aside`, `footer`, etc.) |
| Estilos | CSS3 — Grid, Flexbox, variables CSS, `mask-image`, `mix-blend-mode`, `backdrop-filter`, animaciones |
| Lógica | JavaScript ES5+ vanilla (sin frameworks ni bundler) |
| Tipografía | Google Fonts — Bebas Neue (display) + Inter (cuerpo) |
| Imágenes | PNG (fotos de gorras) + SVG (máscaras de color y filtros de bordado) |
| Persistencia | `localStorage` del navegador |
| Filtro bordado | SVG inline con `feTurbulence`, `feDisplacementMap` y `feGaussianBlur` para simular hilo |

No se usa npm, Webpack, ni ningún framework de JavaScript. El proyecto se puede abrir directamente en el navegador sin pasos de build.

---

## Estructura del proyecto

```
Customer_Hats/
├── index.html            # Sitio principal de producción
├── prueba.html           # Página de pruebas para máscaras SVG
├── css/
│   └── styles.css        # Todos los estilos (1 289 líneas, soporta modo claro/oscuro)
├── js/
│   ├── configurador.js   # Lógica del configurador (estado, render, eventos)
│   └── tema.js           # Toggle de tema claro/oscuro
└── img/
    ├── LOGO YH.png
    ├── gorra_blanca_fondo_blanco.png
    ├── gorra_blanca_fondo_blanco_de_frente.png
    ├── gorra_blanca_fondo_blanco_de_frente_puma.png
    ├── gorra_blanca_fondo_blanco_de_lado_puma.png
    └── mascaras/
        ├── gorra-frente-mascara.svg
        ├── gorra-lateral-mascara.svg
        ├── gorra-puma-frente-mascara.svg
        └── gorra-puma-lateral-mascara.svg
```

---

## Cómo funciona la vista previa (sistema de capas)

El canvas del configurador apila varias capas absolutas dentro de un contenedor:

```
┌────────────────────────────────┐
│  Texto bordado (SVG textPath)  │  ← capa superior
│  Logo del cliente (PNG/SVG)    │
│  Color con máscara SVG         │  ← mix-blend-mode: multiply
│  Imagen base de la gorra       │  ← capa inferior
└────────────────────────────────┘
```

La máscara SVG define exactamente qué zona del sombrero recibe el color, evitando que se pinte la visera, los ojales o las costuras. El texto sigue un arco SVG para imitar el bordado curvo real de la visera.

---

## Cómo usar

1. Abre `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
2. No se necesita servidor local; basta con abrir el archivo.
3. Para desarrollo, cualquier extensión de live-reload (como Live Server en VS Code) funciona correctamente.

---

## Compatibilidad

Requiere un navegador moderno con soporte para:

- CSS Grid y Flexbox
- CSS custom properties (`var()`)
- `mask-image` / `-webkit-mask-image`
- `backdrop-filter`
- `localStorage`
- FileReader API (para carga de logo)

No es compatible con Internet Explorer.

---

## Posibles mejoras futuras

- Hacer responsive la web para otros dispositivos.
---

## Autores

- Diego Iván Cundapí Leon
- Angel de Jesus Jimenez Pérez
