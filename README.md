# Mercure Internacional

Landing page comercial para la unidad de logística internacional de Mercure SRL.

El sitio está construido como MVP estático para demo comercial y deploy temporal en Vercel o Netlify.

## Stack

- Astro
- TypeScript
- Tailwind CSS 4 vía Vite
- React solo para `QuoteForm.tsx`
- Build estático

## Requisitos

- Node `20.18.3`
- npm
- nvm recomendado

El proyecto incluye:

```txt
.nvmrc
.node-version
```

Ambos fijan Node en `20.18.3`.

## Instalación

```bash
nvm use
npm install
```

## Desarrollo

```bash
npm run dev
```

Astro va a mostrar la URL local, normalmente:

```txt
http://localhost:4321
```

## Verificación

```bash
npm run check
npm run build
```

## Preview local del build

```bash
npm run preview
```

## Deploy temporal sugerido

### Vercel

1. Importar el repositorio desde GitHub.
2. Framework preset: `Astro`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```txt
dist
```

5. Configurar variable de entorno `SITE_URL` con la URL final de la demo.

Ejemplo:

```txt
SITE_URL=https://mercure-internacional-demo.vercel.app
```

### Netlify

1. Importar el repositorio desde GitHub.
2. Build command:

```bash
npm run build
```

3. Publish directory:

```txt
dist
```

4. Configurar variable de entorno `SITE_URL` con la URL final de la demo.

Ejemplo:

```txt
SITE_URL=https://mercure-internacional-demo.netlify.app
```

## Variable de entorno

### `SITE_URL`

Se usa para construir canonicals, Open Graph y URLs absolutas de schema.

Fallback local/configurado:

```txt
https://www.mercuresrl.com
```

Para una demo temporal conviene configurar `SITE_URL` con la URL pública real del deploy.

## Configurar datos reales de Mercure

Editar:

```txt
src/config/site.ts
```

Campos principales:

- `whatsappNumber`
- `phone`
- `email`
- `addresses`
- `socialLinks`

Mientras esos valores sean placeholders, el sitio evita renderizar datos de contacto no confirmados y no muestra el botón flotante de WhatsApp.

## Reemplazar assets

Archivos actuales:

```txt
public/favicon.svg
public/og-image.jpg
public/images/mercure-logo.svg
```

Para producción, reemplazarlos por assets oficiales de Mercure cuando estén disponibles.

Recomendación para Open Graph:

```txt
1200x630 px
.jpg o .png
```

## Páginas incluidas

```txt
/
/importar-desde-china/
/carga-aerea-internacional/
/carga-maritima-internacional/
/asesoramiento-para-importar/
/gracias/
```

## Notas del MVP

- `/gracias/` tiene `noindex`.
- La home incluye schema `Organization`, `WebSite`, `Service` y `FAQPage`.
- Las páginas SEO específicas incluyen schema `Service`.
- El formulario arma un mensaje comercial para WhatsApp.
- Si no hay WhatsApp real configurado, el formulario muestra una vista previa del mensaje y no intenta abrir WhatsApp.
