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
- [ ] API key de Resend en `RESEND_API_KEY` (el correo que recibe ya está configurado y oculto).
- [ ] Dominio definitivo en `NEXT_PUBLIC_SITE_URL` (metadatos, sitemap y Open Graph).
- [ ] Completar y revisar con un asesor legal el aviso de privacidad (`[razón social]`, `[domicilio]`, `[fecha]`, correo de contacto ARCO).
- [ ] Confirmar los textos de las tarjetas de beneficios (`src/content/contact.ts`).
- [ ] Dar de alta el sitio en Google Search Console y Google Business Profile.

## Formulario de contacto

`POST /api/contact` valida, filtra spam (honeypot + límite por IP) y entrega al proveedor configurado.

- **webhook**: `CONTACT_PROVIDER=webhook`, `CONTACT_WEBHOOK_URL=https://…` (n8n, Make, Zapier, CRM).
- **resend**: `CONTACT_PROVIDER=resend`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (dominio verificado en Resend).

Sin proveedor responde `503 not_configured` y el sitio avisa al visitante que su solicitud **no** se envió. Nunca se simula un envío exitoso.

### Probar el formulario con correo (Resend)

1. Crea una cuenta gratuita en resend.com y genera una API key (*API Keys → Create*).
2. Crea `.env.local` en la raíz del proyecto:
   ```bash
   CONTACT_PROVIDER=resend
   RESEND_API_KEY=re_xxxxxxxxx
   CONTACT_TO_EMAIL=el-correo-con-el-que-te-registraste@gmail.com
   CONTACT_FROM_EMAIL="MIRAI NEXUS <onboarding@resend.dev>"
   ```
   Sin dominio verificado, Resend solo entrega pruebas al correo de tu propia cuenta.
3. `npm run dev`, abre http://localhost:3000/#contacto, llena el formulario y envía.
4. Debe aparecer "Solicitud recibida." y llegarte el correo con los datos y "Responder a" apuntando al cliente.
5. Al tener dominio (ej. mirainexus.com), verifícalo en Resend y cambia `CONTACT_FROM_EMAIL` a `contacto@mirainexus.com`.

Para Vercel, agrega esas mismas variables en *Settings → Environment Variables* y vuelve a desplegar.

## Publicación en Vercel (plan gratuito Hobby)

> El plan Hobby es gratuito pero Vercel lo limita a uso no comercial. Sirve para revisar y presentar; para operar el sitio de la empresa a largo plazo considera Pro o Cloudflare (ver `docs/ARQUITECTURA.md`).

1. **GitHub**: crea un repositorio privado `mirai-nexus-web` vacío (sin README) y, dentro de la carpeta del proyecto:
   ```bash
   git remote add origin https://github.com/<tu-usuario>/mirai-nexus-web.git
   git push -u origin main
   ```
2. **Vercel**: vercel.com → *Add New → Project* → importa `mirai-nexus-web`. Vercel detecta Next.js; no cambies nada de la compilación.
3. **Variables de entorno** (*Settings → Environment Variables*, entorno *Production* y *Preview*):

   | Variable | Valor |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.com` (o la URL `.vercel.app` mientras no haya dominio) |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `525660548768` |
   | `CONTACT_PROVIDER` | `resend` |
   | `CONTACT_TO_EMAIL` | el correo que recibe las solicitudes (oculto) |
   | `CONTACT_FROM_EMAIL` | `MIRAI NEXUS <onboarding@resend.dev>` |
   | `RESEND_API_KEY` | tu API key de Resend |

4. **Deploy**. Cada `git push` a `main` vuelve a publicar solo; cada rama crea una vista previa.
5. **Dominio con Cloudflare**: en Vercel → *Settings → Domains* agrega `tu-dominio.com` y `www`. En Cloudflare → DNS crea los registros que Vercel indique (A para el dominio, CNAME para `www`) con la nube **gris** (solo DNS). SSL/TLS en *Full (strict)*.
6. Revisa: formulario (llega el correo), WhatsApp, `https://tu-dominio.com/sitemap.xml` y la imagen al pegar el enlace en WhatsApp.

Antes de cada publicación puedes correr `npm run check` (tipos + lint + build).

## Acceso administrativo (/admin)
Con `NEXT_PUBLIC_PANEL_URL` (ej. `https://panel.mirainexus.com`), `mirainexus.com/admin` lleva al acceso del panel de
cotizaciones con el estilo de MIRAI NEXUS (`/acceso/mirai-nexus`). Sin la variable, `/admin` responde 404.
No hay enlaces visibles a esa dirección. Código: `src/lib/panel.ts` y `redirects()` en `next.config.ts`.

## Plantilla para sitios de clientes

El prompt maestro y la ficha del cliente están en el documento **"Prompt maestro — Sitios web de clientes MIRAI NEXUS"** de tu cuenta de Claude (se exporta a Word, PDF o Markdown).

## Arquitectura

Ver [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
