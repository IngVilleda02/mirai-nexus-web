# MIRAI NEXUS — Sitio oficial

**Connecting to the Future.** Next.js 16 · TypeScript · Tailwind CSS v4.

## Abrir el sitio en tu computadora (localhost)

1. Instala **Node.js LTS** desde nodejs.org (solo la primera vez).
2. Descomprime el proyecto en una carpeta, por ejemplo `Documentos/mirai-nexus`.
3. Doble clic en **`iniciar-local.bat`** (Windows) o **`iniciar-local.command`** (Mac).
4. Se abre http://localhost:3000. Cada cambio que guardes en el código se ve al instante.

Para ver el código: abre la carpeta con VS Code o con Claude Code en la app de escritorio.

## Arranque local (terminal)

```bash
npm install
cp .env.example .env.local   # completa los valores
npm run dev                  # http://localhost:3000
```

Comandos: `npm run build` · `npm run start` · `npm run lint` · `npm run typecheck`.

## Qué editar

| Quiero cambiar… | Archivo |
|-----------------|---------|
| Correo, Instagram, textos globales, SEO | `src/content/site.ts` |
| Servicios y su estado (disponible / en desarrollo) | `src/content/services.ts` |
| Tarjetas por industria | `src/content/industries.ts` |
| Proyectos del portafolio | `src/content/projects.ts` + imágenes en `public/portfolio/` |
| Pasos del proceso | `src/content/process.ts` |
| Colores y tipografías | `src/app/globals.css` (bloque `@theme`) |
| Logotipo | `public/brand/` + `src/app/icon.png` |
| Aviso de privacidad | `src/app/aviso-de-privacidad/page.tsx` (**borrador: revisar con asesor legal**) |

## Agregar un proyecto de cliente

En `src/content/projects.ts`, dentro de `clientSites`, pega la dirección del sitio:

```ts
export const clientSites: ClientSite[] = [
  { url: "https://www.cliente.com", industry: "Maquinados CNC" },
];
```

La tarjeta se arma sola con el título, la descripción, la imagen de vista previa (Open Graph)
y el ícono del sitio del cliente, dentro del marco de navegador de la plantilla. Si el sitio no
tiene imagen de vista previa se muestra su ícono y dominio. La información se actualiza cada 24 h.
Opcional: `title`, `description` o `image` para reemplazar lo que se obtuvo del sitio.
Cuando tengas clientes suficientes, pon `showDemoProjects = false` para ocultar las demostraciones.

## Pendientes antes de publicar

- [x] Logotipo oficial, WhatsApp e Instagram.
- [ ] (Opcional, después) Envío del formulario por correo además de WhatsApp.
- [ ] Dominio definitivo en `NEXT_PUBLIC_SITE_URL` (metadatos, sitemap y Open Graph).
- [ ] Completar y revisar con un asesor legal el aviso de privacidad (`[razón social]`, `[domicilio]`, `[fecha]`, correo de contacto ARCO).
- [ ] Confirmar los textos de las tarjetas de beneficios (`src/content/contact.ts`).
- [ ] Dar de alta el sitio en Google Search Console y Google Business Profile.

## Formulario de contacto
Valida los datos y abre WhatsApp (`NEXT_PUBLIC_WHATSAPP_NUMBER`) con una plantilla que lleva nombre, empresa, correo,
teléfono, servicio y descripción del proyecto. No usa servidor ni correo. Lógica en `src/components/sections/contact/ContactForm.tsx`.

## Publicación en Vercel
1. El código está en GitHub (repositorio `mirai-nexus-web`).
2. vercel.com → *Add New → Project* → importa el repositorio. Vercel detecta Next.js; no cambies la compilación.
3. Variables (*Settings → Environment Variables*): `NEXT_PUBLIC_SITE_URL` (la URL que da Vercel, ej. `https://mirai-nexus.vercel.app`)
   y `NEXT_PUBLIC_WHATSAPP_NUMBER`. Después de cambiar variables, *Redeploy*.
4. Cada cambio que se sube a GitHub se publica solo.
Antes de cada publicación puedes correr `npm run check` (tipos + lint + build).

## Plantilla para sitios de clientes

El prompt maestro y la ficha del cliente están en el documento **"Prompt maestro — Sitios web de clientes MIRAI NEXUS"** de tu cuenta de Claude (se exporta a Word, PDF o Markdown).

## Arquitectura

Ver [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
