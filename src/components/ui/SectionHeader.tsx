import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "split";
}

/**
 * Encabezado estándar de sección: etiqueta + título.
 * "split" coloca la introducción a la derecha en pantallas grandes.
 */
export function SectionHeader({ label, title, intro, align = "split" }: SectionHeaderProps) {
  return (
    <Reveal
      className={`mb-14 grid gap-6 md:mb-20 ${align === "split" ? "lg:grid-cols-12 lg:items-end" : ""}`}
    >
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <p className="label-tech mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-nexus-500" aria-hidden />
          {label}
        </p>
        <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-balance text-paper sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      {intro && (
        <p className={`max-w-xl text-base leading-relaxed text-steel-300 ${align === "split" ? "lg:col-span-5 lg:justify-self-end" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
