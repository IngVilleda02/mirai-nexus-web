# MIRAI NEXUS — Sitio oficial

**Connecting to the Future.** Next.js 16 · TypeScript · Tailwind CSS v4.

## Arranque local

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
| Logotipo | `src/components/brand/Logo.tsx` + `src/app/icon.svg` |
| Aviso de privacidad | `src/app/aviso-de-privacidad/page.tsx` (**borrador: revisar con asesor legal**) |

## Pendientes antes de publicar

- [ ] Logotipo oficial en `public/brand/` y reemplazo de `LogoMark` y `icon.svg`.
- [ ] Correo comercial y perfil de Instagram reales en `site.ts`.
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (sin él, el botón de WhatsApp no aparece).
- [ ] Proveedor del formulario (`CONTACT_PROVIDER` = `webhook` o `resend`).
- [ ] Completar y validar el aviso de privacidad.
- [ ] Dominio definitivo en `NEXT_PUBLIC_SITE_URL`.

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

## Publicación (Fase 5)

1. **GitHub**: crea el repositorio `mirai-nexus-web` (privado) y sube:
   ```bash
   git remote add origin git@github.com:<usuario>/mirai-nexus-web.git
   git push -u origin main
   ```
2. **Vercel**: *Add New → Project → Import* el repositorio. Framework detectado: Next.js. Agrega las variables de `.env.example` en *Settings → Environment Variables*. Nota: el plan Hobby es solo para uso no comercial; para el sitio de la empresa usa Pro (ver `docs/ARQUITECTURA.md`).
3. **Cloudflare (DNS)**: en Vercel → *Domains* agrega `mirainexus.com` y `www`. En Cloudflare crea los registros que Vercel indique (A para el apex, CNAME para `www`), con proxy **desactivado (nube gris)** para que Vercel emita el certificado. SSL/TLS en modo *Full (strict)*.
4. Verifica en Google Search Console y envía `https://mirainexus.com/sitemap.xml`.

## Arquitectura

Ver [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
