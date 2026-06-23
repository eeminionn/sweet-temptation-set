# Análisis visual

## Referencia consultada

- Sitio: `https://www.victoriassecret.cl/`
- Fecha de observación: 22 de junio de 2026
- Viewports revisados: 1280x720 y 390x844

## Estructura observada

- Franja superior rosada con mensaje de despacho.
- Cabecera blanca con selector de marcas, wordmark centrado, buscador a la derecha e iconografía de cuenta/favoritos/carro.
- Navegación principal horizontal en mayúsculas y espaciado amplio.
- Hero principal de campaña con fotografía dominante y panel magenta de oferta.
- Módulos de campaña secundarios en formato banner ancho.
- Sección editorial de beauty.
- Mosaicos comerciales/categorías.
- Footer claro con newsletter, ayuda, enlaces corporativos y redes sociales.

## Tipografías aproximadas

- Sans principal: `Public Sans`.
- Serif editorial/wordmark aproximado: `Cormorant Garamond` como sustituto local del estilo Didot/Bodoni visto en la referencia.

## Colores observados

- Fondo blanco cálido.
- Rosa pálido para barras promocionales.
- Magenta intenso para acentos de campaña y CTA.
- Gris muy claro para cajas de búsqueda.
- Negro suave para navegación y tipografía principal.

## Breakpoints aplicados

- `<= 768px`: adaptación móvil real con menú hamburguesa y hero en una sola columna.
- `<= 1024px`: reducción progresiva de la grilla y del número de tarjetas visibles.
- `>= 1280px`: composición de escritorio con fuerte aire editorial.

## Comportamiento de componentes

- Header sticky.
- Menú móvil con overlay y trampa básica de foco.
- Carrusel de productos con botones, dots, teclado, drag/touch y autoplay desactivable por interacción.
- CTA y enlaces simulados mediante botones que anuncian estado demostrativo en `aria-live`.
- Carro ficticio reseteable al recargar.
- Newsletter sin almacenamiento de datos.

## Decisiones de implementación

- Se evitó copiar código del sitio de referencia.
- Se reutilizaron solo recursos públicos observables del homepage y se almacenaron de forma local.
- Algunos bloques fueron reinterpretados como módulos estáticos consistentes para mantener fidelidad visual sin replicar el backend comercial.
- La futura sección `VS x FRUGELÉ` quedó preparada, pero deliberadamente vacía de productos/textos inventados.
