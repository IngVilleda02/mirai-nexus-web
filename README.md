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
- [ ] Buzón de Hostinger (`SMTP_USER` / `SMTP_PASS`) para el formulario; el correo que recibe va en `CONTACT_TO_EMAIL` (oculto).
- [ ] Dominio definitivo en `NEXT_PUBLIC_SITE_URL` (metadatos, sitemap y Open Graph).
- [ ] Completar y revisar con un asesor legal el aviso de privacidad (`[razón social]`, `[domicilio]`, `[fecha]`, correo de contacto ARCO).
- [ ] Confirmar los textos de las tarjetas de beneficios (`src/content/contact.ts`).
- [ ] Dar de alta el sitio en Google Search Console y Google Business Profile.

## Formulario de contacto

`POST /api/contact` valida, filtra spam (honeypot + límite por IP) y entrega la solicitud:

- **Correo por SMTP (recomendado, Hostinger)**: `SMTP_USER`, `SMTP_PASS` (buzón de Hostinger, ej. `contacto@mirainexus.com`),
  `CONTACT_TO_EMAIL` (quien recibe; nunca aparece en la página). `SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465` por defecto.
- **Panel de cotizaciones**: con `NEXT_PUBLIC_PANEL_URL`, cada solicitud también se guarda en *Solicitudes* de MIRAI NEXUS.
- Alternativas: `CONTACT_PROVIDER=webhook` (`CONTACT_WEBHOOK_URL`) o `CONTACT_PROVIDER=resend`.

Se responde «recibida» solo si el correo o el panel la recibieron de verdad; si no hay ninguno, el sitio avisa que
la solicitud **no** se envió. Nunca se simula un envío exitoso.

## Publicación en Hostinger (app Node.js, plan Unlimited o Cloud)

1. hPanel → Sitios web → Agregar → **App web de Node.js** → sube `mirai-nexus-app.zip` (o conecta GitHub). Dominio `mirainexus.com`, Next.js, Node 22.
2. Variables (las `NEXT_PUBLIC_` se graban al compilar): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PANEL_URL`,
   `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.
3. Despliega y revisa: formulario, WhatsApp, `/admin`, `sitemap.xml` y la imagen al pegar el enlace en WhatsApp.

Guía completa de los tres sitios: `LEEME-GUIA-HOSTINGER.md` en la carpeta de despliegue.
Antes de cada publicación puedes correr `npm run check` (tipos + lint + build).

## Acceso administrativo (/admin)
Con `NEXT_PUBLIC_PANEL_URL` (ej. `https://panel.mirainexus.com`), `mirainexus.com/admin` lleva al acceso del panel de
cotizaciones con el estilo de MIRAI NEXUS (`/acceso/mirai-nexus`). Sin la variable, `/admin` responde 404.
No hay enlaces visibles a esa dirección. Código: `src/lib/panel.ts` y `redirects()` en `next.config.ts`.

## Plantilla para sitios de clientes

El prompt maestro y la ficha del cliente están en el documento **"Prompt maestro — Sitios web de clientes MIRAI NEXUS"** de tu cuenta de Claude (se exporta a Word, PDF o Markdown).

## Arquitectura

Ver [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
