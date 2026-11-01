import { PanelHeader } from "@/components/ui/PanelHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { services } from "@/content/services";

export function ServicesPanel() {
  return (
    <div>
      <PanelHeader
        title="Soluciones digitales con enfoque industrial"
        intro="Lo que hoy entregamos y lo que estamos construyendo. Te decimos con claridad qué está disponible y qué se encuentra en desarrollo."
      />

      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal
            as="article"
            key={s.id}
            delay={(i % 2) * 100}
            className="frame-corners group flex flex-col bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="h-px w-6 bg-line-strong transition-colors group-hover:bg-nexus-500" aria-hidden />
              <StatusBadge status={s.status} />
            </div>
            <h4 className="mt-10 font-display text-2xl font-medium tracking-[-0.025em] text-paper">{s.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">{s.summary}</p>
            <ul className="mt-8 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-steel-300">
                  <span
                    className={`h-px w-3 ${s.status === "available" ? "bg-nexus-500" : "bg-steel-700"}`}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-steel-500">
        Funcionalidades especiales y desarrollos a la medida se cotizan por separado.
      </p>
    </div>
  );
}
