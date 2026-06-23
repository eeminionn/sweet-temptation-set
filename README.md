# Victoria's Secret x Frugelé — Concepto académico

Prototipo web estático, responsivo y no oficial inspirado visualmente en el homepage público de Victoria's Secret Chile.

El proyecto fue construido como una colaboración conceptual universitaria entre Victoria's Secret y Frugelé de Ambrosoli. No pertenece a ninguna de esas marcas y no representa un canal oficial.

## Aviso importante

- Proyecto académico y no oficial.
- No procesa pagos.
- No implementa login real.
- No envía formularios a servidores.
- No almacena correos ni datos personales.
- No conecta con el comercio real.
- Incluye `noindex, nofollow` para evitar indexación.

## Tecnologías

- HTML5 semántico
- CSS3
- JavaScript ES6 vanilla
- Playwright para pruebas E2E básicas

## Estructura

```text
victorias-secret-frugele-concept/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── package.json
├── playwright.config.js
├── assets/
│   ├── css/
│   ├── fonts/
│   ├── images/
│   └── js/
├── docs/
│   ├── asset-sources.md
│   ├── deployment.md
│   └── visual-analysis.md
└── tests/
    └── homepage.spec.js
```

## Cómo ejecutar localmente

1. Entra al proyecto:

```bash
cd victorias-secret-frugele-concept
```

2. Levanta un servidor estático:

```bash
python3 -m http.server 8123
```

3. Abre:

```text
http://127.0.0.1:8123/
```

## Cómo correr las pruebas

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta Playwright:

```bash
npm test
```

## Cómo modificar imágenes

- Reemplaza archivos dentro de `assets/images/` conservando la misma relación de aspecto cuando sea posible.
- Mantén rutas relativas para no romper GitHub Pages.
- Si agregas nuevos recursos públicos, regístralos en `docs/asset-sources.md`.
- Si reemplazas una imagen por un placeholder, indícalo también en esa documentación.

## Cómo ampliar la futura sección VS x FRUGELÉ

- La navegación ya incluye `VS x FRUGELÉ`.
- Existe un bloque reservado en `index.html` y un placeholder local en `assets/images/placeholders/frugele-future.svg`.
- Para desarrollarla después, puedes completar:
  - hero de campaña
  - galería de productos
  - historia de la colaboración
  - carrusel/lookbook
  - destacados

## Despliegue

### GitHub Pages

- El proyecto usa rutas relativas, por lo que funciona en una subruta tipo `/victorias-secret-frugele-concept/`.
- Sube el contenido a la rama principal y publica desde root.

### Netlify

- Puedes arrastrar la carpeta directamente al panel de Netlify.
- También puedes conectar el repositorio una vez publicado en GitHub.

Más detalle en [docs/deployment.md](./docs/deployment.md).

## Limitaciones

- Se trata de una réplica visual aproximada, no de una copia funcional del comercio.
- Algunos bloques fueron reinterpretados para mantener coherencia estática, accesible y demostrativa.
- La funcionalidad comercial es solo simulada.
- El asset set fue reducido intencionalmente a los recursos visuales mínimos necesarios.

## Créditos y fuentes

- Referencia visual principal: homepage pública de Victoria's Secret Chile consultada el 22 de junio de 2026.
- Fuentes tipográficas locales basadas en Public Sans y Cormorant Garamond.
- Detalle completo de assets en [docs/asset-sources.md](./docs/asset-sources.md).

## Marcas

Victoria's Secret, PINK, Frugelé y Ambrosoli pertenecen a sus respectivos titulares. Este repositorio no reclama propiedad sobre esas marcas ni sobre sus campañas originales.

## GitHub manual

Si quieres crear el remoto manualmente:

```bash
git init
git add .
git commit -m "feat: initial academic prototype"
git branch -M main
git remote add origin git@github.com:TU-USUARIO/victorias-secret-frugele-concept.git
git push -u origin main
```

Luego activa GitHub Pages desde `Settings > Pages` publicando la rama `main` desde `/ (root)`.
