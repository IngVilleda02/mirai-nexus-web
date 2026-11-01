import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/industries";
import { IndustryIcon } from "./IndustryIcon";

export function Industries() {
  return (
    <section id="industrias" className="relative border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeader
          index="03"
          label="Soluciones por industria"
          title={
            <>
              Hablamos el idioma de tu sector<span className="text-nexus-500">.</span>
            </>
          }
          intro="Cada industria compra distinto. Diseñamos cada solución pensando en quién te busca y qué necesita ver para contactarte."
        />

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal
              as="article"
              key={ind.id}
              delay={(i % 3) * 80}
              className="frame-corners group relative flex min-h-[280px] flex-col overflow-hidden bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <IndustryIcon name={ind.icon} className="h-9 w-9 text-steel-300 transition-colors duration-500 group-hover:text-nexus-500" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-steel-700">IND-0{i + 1}</span>
              </div>
              <h3 className="mt-auto pt-12 font-display text-xl font-medium uppercase tracking-[0.06em] text-paper">{ind.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">{ind.pitch}</p>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-nexus-500 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
