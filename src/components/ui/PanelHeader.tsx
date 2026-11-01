import type { ReactNode } from "react";

/** Encabezado de un bloque dentro de una pestaña (nivel h3, debajo del h2 de la sección). */
export function PanelHeader({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 md:mb-14 lg:grid-cols-12 lg:items-end">
      <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-balance text-paper sm:text-3xl lg:col-span-7">
        {title}
        <span className="text-nexus-500">.</span>
      </h3>
      {intro && (
        <p className="max-w-xl text-sm leading-relaxed text-steel-300 sm:text-base lg:col-span-5 lg:justify-self-end">{intro}</p>
      )}
    </div>
  );
}
