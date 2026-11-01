# MIRAI NEXUS — Propuesta visual y arquitectura (Fase 1–2)

## 1. Concepto visual: "Plano de ingeniería conectado"

La página se comporta como un plano técnico vivo: retícula de ingeniería de fondo, una red de nodos que se conectan lentamente (Nexus) y acentos rojos usados con disciplina, solo donde hay una acción o un dato importante. La influencia japonesa es sutil: espacio negativo generoso, el kanji 未来 como sello vertical en el hero, numeración y etiquetas técnicas en monoespaciada. Nada de neón ni degradados de agencia.

Reglas de uso del rojo:
- Botón principal (una sola acción roja por pantalla).
- Punto final de los títulos (".") como firma de marca.
- Índices de sección, estado "Disponible" y microinteracciones (esquinas de marco, línea inferior).

## 2. Estructura

| # | Sección | Objetivo para el visitante |
|---|---------|----------------------------|
| — | Header fijo | Navegar y pedir propuesta desde cualquier punto |
| 00 | Hero | Qué es Mirai Nexus en 5 segundos |
| 01 | Quiénes somos | Por qué confiar: ingeniería + tecnología + digital |
| 02 | Servicios | Qué ofrecemos y qué está disponible hoy vs. en desarrollo |
| 03 | Industrias | "Entienden mi sector" |
| 04 | Portafolio | Evidencia (demostraciones claramente identificadas) |
| 05 | Proceso | Cómo es trabajar con nosotros |
| 06 | Contacto | Convertir: formulario + WhatsApp + correo |
| — | Footer | Datos, redes, aviso de privacidad |
| — | /aviso-de-privacidad | Cumplimiento (borrador para revisión legal) |

## 3. Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `ink-950` | `#060709` | Fondo principal (negro profundo, ligeramente frío) |
| `ink-900` | `#0B0D10` | Secciones alternas |
| `ink-850` / `ink-800` | `#111419` / `#181C22` | Tarjetas / hover |
| `line` / `line-strong` | `#23282F` / `#343A43` | Bordes y retícula |
| `paper` | `#F3F4F6` | Texto principal |
| `steel-300` / `500` / `700` | `#B8BEC7` / `#7D8590` / `#4B525C` | Texto secundario, etiquetas, detalles |
| `nexus-500` | `#E3172B` | Rojo de marca (acento) |
| `nexus-400` / `600` / `900` | `#FF3346` / `#B90F20` / `#3A0710` | Hover, error, fondos de alerta |

Contraste: `paper` sobre `ink-950` ≈ 18:1; `steel-300` ≈ 11:1 (AA/AAA).

## 4. Tipografías (autoalojadas, sin llamadas a Google)

- **Sora** (display): geométrica, técnica, con carácter. Títulos y logotipo.
- **Inter** (texto): máxima legibilidad en párrafos y formularios.
- **JetBrains Mono** (técnica): índices, etiquetas, estados — el "lenguaje de plano".
- Kanji: fuentes del sistema (Hiragino / Yu Gothic / Noto Sans JP) para no cargar una fuente CJK pesada por dos caracteres.

## 5. Componentes

- `ui/`: `Container`, `Button`/`ButtonLink`, `SectionHeader`, `Reveal`, `StatusBadge`, `WhatsAppIcon`.
- `brand/`: `Logo`, `LogoMark` (provisional).
- `layout/`: `Header` (menú móvil accesible), `Footer`, `WhatsAppFloat`.
- `sections/`: `Hero` + `NetworkCanvas`, `About`, `Services`, `Industries` + `IndustryIcon`, `Portfolio`, `Process`, `contact/Contact` + `ContactForm`.

Todo el contenido vive en `src/content/*.ts`, separado del diseño. Para un cliente nuevo se copia el proyecto y se editan esos archivos.

## 6. Arquitectura tecnológica — decisiones

### Framework: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
Páginas estáticas (rápidas, baratas de alojar) con rutas de servidor solo donde hace falta (`/api/contact`). Escala a directorio, perfiles y dashboards sin reescribir.

### Hosting — ⚠️ decisión que requiere tu visto bueno
| Opción | Costo | Comentario |
|--------|-------|------------|
| Vercel Hobby | $0 | **No permitido**: Vercel restringe Hobby a uso personal no comercial; un sitio que anuncia servicios es comercial. |
| **Vercel Pro** (recomendado) | ~USD 20/mes por miembro | Mejor experiencia con Next.js, previews por rama, sin fricción. Un solo equipo puede alojar el sitio de Mirai Nexus y los de clientes. |
| Cloudflare Workers/Pages (OpenNext) | $0–5 USD/mes | Uso comercial permitido en plan gratuito. Algo más de configuración; buena opción si el costo por cliente es prioridad. |

Recomendación: arrancar en **Vercel Pro** cuando tengas el primer cliente pagando; mientras tanto, el código es portable a Cloudflare sin cambios en componentes. Cloudflare se usa en ambos casos para DNS, SSL y WAF.

### Formulario de contacto
Ruta `/api/contact` con validación en cliente y servidor, honeypot anti-spam y límite por IP. Entrega mediante adaptadores (`src/lib/contact/providers.ts`):
- `webhook` → n8n / Make / Zapier / CRM (recomendado para automatizar seguimiento).
- `resend` → correo (plan gratuito suficiente para el arranque).
Sin proveedor configurado responde **503** y la interfaz dice claramente que **no se envió**.

### Evolución (Fase 6)
| Necesidad futura | Pieza que se agrega |
|------------------|---------------------|
| Directorio de proveedores, perfiles, RFQ | Supabase (Postgres + Auth + Storage) y rutas `/proveedores/[slug]` |
| CRM | Nuevo adaptador en `providers.ts` |
| Chatbot IA | Ruta `/api/assistant` + componente flotante |
| Dashboards OEE | App aparte (`app.mirainexus.com`) o grupo de rutas `(platform)` con auth |
| Multi-cliente | Convertir a monorepo (pnpm workspaces) con `packages/ui` compartido |

## 7. Organización de archivos

```
mirai-nexus/
├─ public/               # icon.svg, portfolio/*, brand/ (logo oficial)
├─ docs/ARQUITECTURA.md
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx      # metadatos globales, fuentes
│  │  ├─ page.tsx        # composición de secciones + JSON-LD
│  │  ├─ globals.css     # tokens de marca (@theme)
│  │  ├─ api/contact/route.ts
│  │  ├─ aviso-de-privacidad/page.tsx
│  │  ├─ opengraph-image.tsx · sitemap.ts · robots.ts · manifest.ts · icon.svg · not-found.tsx
│  ├─ components/{ui,brand,layout,sections}
│  ├─ content/           # site, services, industries, projects, process  ← editar aquí
│  └─ lib/               # seo.ts, contact/{schema,providers}.ts
├─ next.config.ts        # cabeceras de seguridad (CSP, HSTS…)
└─ .env.example
```

## 8. Sistema de movimiento (inspirado en Emil Kowalski)

Principios aplicados y dónde viven:

| Principio | Implementación |
|-----------|----------------|
| Curva de salida fuerte para entradas e interacción | `--ease-out-expo: cubic-bezier(0.23, 1, 0.32, 1)` en `globals.css` |
| Curva in-out fuerte para lo que se desplaza en pantalla | `--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1)` (píldora de navegación, indicador de pestañas) |
| Interfaz por debajo de 300 ms | Botones 100–200 ms, píldora/indicador 300 ms; solo las entradas de marketing duran más |
| Presión táctil | `active:scale-[0.97]` en botones y enlaces, con soltado más lento que la presión |
| Nunca aparecer "de la nada" | Entradas desde `scale(0.95–0.98)` + `blur` + `translateY`, nunca desde `scale(0)` |
| Orquestación | Secuencia de carga del inicio escalonada (`.enter` con `--d`) |
| Hover solo con mouse | Tailwind v4 limita `hover:` a dispositivos con puntero |
| Movimiento reducido | Se conserva un fundido de opacidad en lugar de quitar todo |
| Notificaciones | **Sonner** (librería de Emil) con estilo de marca en `components/ui/Toaster.tsx` |
| Área táctil mínima 44 px | Enlaces de la barra flotante con `min-h-11` |
