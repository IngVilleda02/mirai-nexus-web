import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { k: "Ingeniería", t: "Entendemos procesos, capacidades y el lenguaje técnico de la industria." },
  { k: "Tecnología", t: "Usamos herramientas modernas, rápidas y seguras, pensadas para crecer." },
  { k: "Desarrollo digital", t: "Convertimos lo que tu empresa sabe hacer en presencia y oportunidades." },
];

export function About() {
  return (
    <section id="nosotros" className="relative border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeader
          index="01"
          label="Quiénes somos"
          title={
            <>
              Tecnología con criterio de ingeniería<span className="text-nexus-500">.</span>
            </>
          }
          intro="Mirai Nexus es una empresa de soluciones tecnológicas que ayuda a empresas a mejorar su presencia digital y aprovechar nuevas oportunidades comerciales."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <blockquote className="relative border-l-2 border-nexus-500 pl-6 sm:pl-8">
              <p className="font-display text-xl leading-snug text-paper sm:text-2xl lg:text-[1.75rem]">
                Creemos que toda empresa tiene capacidades que merecen ser reconocidas. En Mirai Nexus conectamos
                ingeniería, tecnología y desarrollo digital para llevar esas capacidades más lejos.
              </p>
            </blockquote>
            <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line">
              <div className="bg-ink-950 p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">Mirai · 未来</dt>
                <dd className="mt-2 text-sm text-steel-300">Futuro</dd>
              </div>
              <div className="bg-ink-950 p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">Nexus</dt>
                <dd className="mt-2 text-sm text-steel-300">Conexión e integración</dd>
              </div>
            </dl>
          </Reveal>

          <ul className="grid gap-px self-start border border-line bg-line lg:col-span-6">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 90} className="group flex gap-6 bg-ink-950 p-6 transition-colors hover:bg-ink-900 sm:p-8">
                <span className="font-mono text-xs text-nexus-500">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-medium text-paper">{p.k}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-300">{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
