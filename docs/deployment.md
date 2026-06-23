# Despliegue

## GitHub Pages

Este proyecto está preparado para funcionar desde una subruta gracias a que todos los recursos se cargan con rutas relativas.

### Pasos

1. Crear repositorio:

```bash
git init
git add .
git commit -m "feat: initial academic prototype"
git branch -M main
git remote add origin git@github.com:TU-USUARIO/victorias-secret-frugele-concept.git
git push -u origin main
```

2. En GitHub:

- Ir a `Settings`
- Abrir `Pages`
- Seleccionar `Deploy from a branch`
- Elegir `main` y carpeta `/ (root)`

## Netlify

### Opción rápida

- Arrastra la carpeta del proyecto al panel de Netlify.

### Opción con repositorio

- Conecta el repositorio.
- No hace falta comando de build.
- Publish directory: `.`

## Verificación recomendada

- Confirmar que `index.html` carga correctamente.
- Confirmar que `assets/` resuelve sin rutas absolutas.
- Confirmar que el sitio funciona bajo una subruta.
- Confirmar que el formulario no envía datos.
- Confirmar que ningún CTA navega al comercio real.
