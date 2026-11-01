import { Container } from "@/components/ui/Container";
import { NetworkCanvas } from "./NetworkCanvas";
import { TypewriterHeadline } from "./TypewriterHeadline";
import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/Logo";

/** Frases del título principal (efecto máquina de escribir, en ciclo). */
const headlines = ["Conectamos la industria con el futuro.", "Conectamos tu empresa con la industria."];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-[76px] pt-16 md:pt-20 lg:pb-0">
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

        <TypewriterHeadline
          phrases={headlines}
          className="max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-paper sm:text-6xl lg:text-[5.25rem]"
        />

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
          Desarrollamos soluciones digitales que impulsan empresas, conectan proveedores y transforman capacidades
          industriales en nuevas oportunidades de negocio.
        </p>
      </Container>
    </section>
  );
}
