import { PanelHeader } from "@/components/ui/PanelHeader";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";

export function ProcessPanel() {
  return (
    <div>
      <PanelHeader
        title="Un proceso claro, de principio a fin"
        intro="Seis pasos, desde conocer tu empresa hasta mantener tu plataforma al día."
      />

      <div className="relative">
        {/* Línea conectora (desktop) */}
        <span
          className="absolute left-0 right-0 top-[7px] hidden h-px overflow-hidden bg-line-strong lg:block"
          aria-hidden
        >
          <span className="animate-scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-nexus-500 to-transparent" />
        </span>
        <ol className="relative grid gap-0 md:grid-cols-3 lg:grid-cols-6">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="relative flex gap-5 border-l border-line pb-10 pl-6 last:pb-0 md:border-l-0 md:pl-0 md:pr-6 lg:flex-col lg:gap-0"
            >
              <span
                className={`absolute -left-[5px] top-1 h-[9px] w-[9px] border md:static md:mb-6 ${
                  i === processSteps.length - 1 ? "border-nexus-500 bg-nexus-500" : "border-steel-500 bg-ink-950"
                }`}
                aria-hidden
              />
              <div>
                <span className="font-mono text-xs text-nexus-500">PASO 0{i + 1}</span>
                <h4 className="mt-3 font-display text-lg font-medium leading-snug text-paper">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
