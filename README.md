# EversBlue Restoration – Landing page

Sitio estático (HTML + CSS + JS, sin dependencias) listo para GitHub Pages.

## Estructura
```
index.html      → contenido (bilingüe EN/ES con botón de idioma)
styles.css      → estilos
script.js       → menú móvil, idioma, animaciones
assets/         → favicon e imágenes optimizadas
```

## Publicar en GitHub Pages
1. Crear un repositorio nuevo (p. ej. `eversblue-landing`) y subir todos los archivos a la raíz.
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → Save.
3. En 1–2 minutos queda en `https://<usuario>.github.io/eversblue-landing/`.

## Usar el dominio www.eversbluerestoration.com
1. En **Settings → Pages → Custom domain** escribir `www.eversbluerestoration.com` (GitHub crea el archivo `CNAME`).
2. En el proveedor del dominio (DNS):
   - Registro **CNAME**: `www` → `<usuario>.github.io`
   - Registros **A** para el dominio raíz `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Cuando el certificado esté listo, activar **Enforce HTTPS**.

## Pendiente de confirmar con el cliente
- Área de servicio (ciudades/condado) para mostrar en la página y mejorar SEO local.
- Número de licencia, si quieren mostrarlo junto a "Licensed & Insured".
- Redes sociales (Facebook/Instagram/Google Business) para enlazar en el footer.
- Fotos reales de trabajos terminados (antes/después) para dar más confianza.
- Si quieren formulario de contacto: se puede añadir con Formspree o Web3Forms (gratis, funciona en GitHub Pages).
