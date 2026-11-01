import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkCanvas } from "./NetworkCanvas";
import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/Logo";

const sectors = ["Automotriz", "Maquinados CNC", "Soldadura", "Automatización", "Mantenimiento", "Proveedores"];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 md:pt-20">
      {/* Capas de fondo */}
      <div className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" aria-hidden />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:linear-gradient(to_left,black_30%,transparent_85%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden />

      {/* Símbolo de marca dentro de la geometría */}
      <div className="pointer-events-none absolute right-[6%] top-[22%] -z-10 hidden h-[340px] w-[340px] lg:block" aria-hidden>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" stroke="var(--color-line-strong)" />
          <circle cx="170" cy="170" r="118" stroke="var(--color-line)" strokeDasharray="2 6" />
          <path d="M170 0v30M170 310v30M0 170h30M310 170h30" stroke="var(--color-steel-700)" />
          <path d="M276 64A150 150 0 0 1 320 170" stroke="var(--color-nexus-500)" strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoMark size={150} className="opacity-95" />
        </div>
      </div>

      {/* Etiqueta vertical japonesa */}
      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" aria-hidden>
        <span className="h-16 w-px bg-line-strong" />
        <span className="font-jp text-sm tracking-[0.5em] text-steel-500 [writing-mode:vertical-rl]">{site.kanji}</span>
        <span className="h-16 w-px bg-line-strong" />
      </div>

      <Container className="flex flex-1 flex-col justify-center py-16 md:py-24">
        <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-steel-300">
          <span className="h-2 w-2 bg-nexus-500" aria-hidden />
          Soluciones digitales para la industria
        </p>

        <h1 className="max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-balance text-paper sm:text-6xl lg:text-[5.25rem]">
          Conectamos la industria con el futuro<span className="text-nexus-500">.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
          Desarrollamos soluciones digitales que impulsan empresas, conectan proveedores y transforman capacidades
          industriales en nuevas oportunidades de negocio.
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="#servicios" variant="secondary">
            Conoce nuestros servicios
          </ButtonLink>
          <ButtonLink href="#contacto" arrow>
            Solicita una propuesta
          </ButtonLink>
        </div>
      </Container>

      {/* Franja de sectores */}
      <div className="border-t border-line bg-ink-950/60 backdrop-blur-sm">
        <Container className="relative flex items-center gap-6 overflow-hidden py-5">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-nexus-500">Sectores</span>
          <ul className="flex gap-6 overflow-x-auto whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500 [scrollbar-width:none]">
            {sectors.map((s, i) => (
              <li key={s} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 bg-steel-700" aria-hidden />}
                {s}
              </li>
            ))}
          </ul>
          <span className="ml-auto hidden shrink-0 font-mono text-[10px] tracking-[0.2em] text-steel-700 md:block">
            QRO · MX
          </span>
        </Container>
      </div>
    </section>
  );
}
