import Image from "next/image";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { Reveal } from "@/components/ui/Reveal";
import { clientSites, projects, showDemoProjects } from "@/content/projects";
import { ClientPreviewCard } from "./portfolio/ClientPreviewCard";

export function PortfolioPanel() {
  return (
    <div>
      <PanelHeader
        title="Proyectos"
        intro={
          clientSites.length
            ? "Sitios que hemos desarrollado para nuestros clientes. Toca cualquiera para visitarlo."
            : "Muy pronto verás aquí los sitios de nuestros clientes. Mientras tanto, estos proyectos demostrativos muestran nuestras capacidades; no representan clientes reales."
        }
      />

      {/* Proyectos de clientes: se agregan pegando la URL en src/content/projects.ts */}
      {clientSites.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {clientSites.map((c, i) => (
            <Reveal key={c.url} delay={(i % 2) * 120}>
              <ClientPreviewCard site={c} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mb-10 flex items-center gap-4 border border-dashed border-line-strong px-6 py-5">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-nexus-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-nexus-500" />
          </span>
          <p className="text-sm text-steel-300">
            Espacio reservado para los proyectos de nuestros clientes.{" "}
            <span className="text-steel-500">Próximamente.</span>
          </p>
        </div>
      )}

      {showDemoProjects && (
        <>
          {clientSites.length > 0 && (
            <p className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
              Proyectos demostrativos
            </p>
          )}
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal
                as="article"
                key={p.slug}
                delay={i * 120}
                className="frame-corners group border border-line bg-ink-950"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink-900">
                  {p.images[0] && (
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      unoptimized={p.images[0].src.endsWith(".svg")}
                      className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  )}
                  {p.kind === "demo" && (
                    <span className="absolute left-4 top-4 border border-nexus-500/50 bg-ink-950/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper backdrop-blur">
                      Demostración · Proyecto conceptual
                    </span>
                  )}
                </div>

                <div className="p-7 sm:p-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-nexus-500">{p.industry}</p>
                  <h4 className="mt-3 font-display text-2xl font-medium tracking-[-0.025em] text-paper">{p.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-steel-300">{p.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Servicios implementados">
                    {p.services.map((s) => (
                      <li key={s} className="border border-line px-3 py-1.5 text-xs text-steel-300">
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-line pt-6">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-paper hover:text-nexus-400"
                      >
                        Visitar sitio
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-500">
                        Enlace disponible al publicar la demostración
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
