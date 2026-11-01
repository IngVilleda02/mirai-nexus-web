import type { ClientSite } from "@/content/projects";
import { getLinkPreview } from "@/lib/link-preview";
import { SafeImage } from "./SafeImage";

/**
 * Tarjeta de proyecto de cliente: marco de navegador + vista previa automática.
 * Todo sale de la URL; `industry`, `title` y `description` en projects.ts son opcionales
 * y, si se escriben, reemplazan lo que se obtuvo del sitio.
 */
export async function ClientPreviewCard({ site }: { site: ClientSite }) {
  const p = await getLinkPreview(site.url);
  const title = site.title ?? p.title ?? p.siteName ?? p.domain;
  const description = site.description ?? p.description;

  const fallback = (
    <div className="bg-grid absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-900">
      <SafeImage
        src={p.favicon}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        fallback={
          <span className="flex h-12 w-12 items-center justify-center border border-line-strong font-display text-xl text-paper">
            {p.domain.charAt(0).toUpperCase()}
          </span>
        }
      />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel-300">{p.domain}</span>
    </div>
  );

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="frame-corners group block border border-line bg-ink-950 transition-[transform,border-color] duration-200 ease-[var(--ease-out-expo)] hover:border-line-strong active:scale-[0.99]"
      aria-label={`${title} — abrir sitio en una pestaña nueva`}
    >
      {/* Marco de navegador */}
      <div className="flex items-center gap-3 border-b border-line bg-ink-900 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-steel-700" />
          <span className="h-2 w-2 rounded-full bg-steel-700" />
          <span className="h-2 w-2 rounded-full bg-nexus-500" />
        </span>
        <span className="min-w-0 flex-1 truncate border border-line bg-ink-950 px-3 py-1 text-center font-mono text-[11px] text-steel-300">
          {p.domain}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <SafeImage
          src={site.image ?? p.image}
          alt={`Vista previa de ${title}`}
          fallback={fallback}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-7 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-nexus-500">{site.industry ?? "Proyecto"}</p>
          <span className="border border-nexus-500/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper">
            Cliente
          </span>
        </div>
        <h4 className="mt-3 line-clamp-2 font-display text-2xl font-medium tracking-tight text-paper">{title}</h4>
        {description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-steel-300">{description}</p>}
        <span className="mt-8 flex items-center gap-2 border-t border-line pt-6 text-sm text-paper transition-colors group-hover:text-nexus-400">
          Visitar sitio
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </span>
      </div>
    </a>
  );
}
