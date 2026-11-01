import "server-only";

/**
 * Vista previa de un sitio a partir de su URL (como hacen WhatsApp o LinkedIn).
 * Lee el HTML del sitio del cliente en el servidor y extrae título, descripción,
 * imagen Open Graph e ícono. El resultado se guarda en caché 24 h (ISR), así que
 * el sitio del cliente no se consulta en cada visita.
 *
 * Solo se usa con URLs que tú escribes en `src/content/projects.ts` (nunca con datos
 * de visitantes), por eso no hay riesgo de que alguien lo use para consultar otras direcciones.
 */
export interface LinkPreview {
  url: string;
  domain: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
}

const REVALIDATE_SECONDS = 60 * 60 * 24;
const MAX_HTML_BYTES = 600_000;

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

/** Busca <meta property|name="key" content="..."> en cualquier orden de atributos. */
function meta(html: string, keys: string[]): string | undefined {
  for (const key of keys) {
    const k = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const a = new RegExp(`<meta[^>]+(?:property|name)=["']${k}["'][^>]*content=["']([^"']*)["']`, "i").exec(html);
    const b = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${k}["']`, "i").exec(html);
    const v = a?.[1] ?? b?.[1];
    if (v && v.trim()) return decode(v);
  }
  return undefined;
}

function absolute(href: string | undefined, base: string): string | undefined {
  if (!href) return undefined;
  try {
    const u = new URL(href, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function getLinkPreview(url: string): Promise<LinkPreview> {
  const domain = domainOf(url);
  const fallback: LinkPreview = { url, domain };

  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; MiraiNexusPreview/1.0; +https://mirainexus.com)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) return fallback;

    const html = (await res.text()).slice(0, MAX_HTML_BYTES);
    const base = res.url || url;
    const head = html.split(/<\/head>/i)[0];

    const titleTag = /<title[^>]*>([^<]*)<\/title>/i.exec(head)?.[1];
    const iconHref =
      /<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*href=["']([^"']+)["']/i.exec(head)?.[1] ??
      /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*href=["']([^"']+)["']/i.exec(head)?.[1] ??
      /<link[^>]+href=["']([^"']+)["'][^>]*rel=["'][^"']*icon[^"']*["']/i.exec(head)?.[1] ??
      "/favicon.ico";

    return {
      url,
      domain,
      title: meta(head, ["og:title", "twitter:title"]) ?? (titleTag ? decode(titleTag) : undefined),
      description: meta(head, ["og:description", "description", "twitter:description"]),
      image: absolute(meta(head, ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]), base),
      favicon: absolute(iconHref, base),
      siteName: meta(head, ["og:site_name", "application-name"]),
    };
  } catch {
    return fallback;
  }
}
