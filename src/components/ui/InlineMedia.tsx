"use client";

import { ArtifactPill } from "intertext-dev/react";

/**
 * Imagen en línea dentro de un título (skill Intertext, paquete `intertext-dev`).
 * - Las medidas en `em` escalan con la tipografía del título.
 * - Con `expand`, se agranda al pasar el mouse o con el teclado/toque (es su propio botón accesible).
 * - Con movimiento reducido no hay transición.
 * Para cambiar la imagen, reemplaza el archivo en /public/inline/ o cambia `src`.
 */
interface InlineMediaProps {
  src: string;
  /** Descripción; vacía si la imagen es decorativa. */
  alt: string;
  width?: string;
  height?: string;
  fit?: "crop" | "fit" | "fill";
  expand?: { width: string; height: string };
}

export function InlineMedia({ src, alt, width = "2.4em", height = ".78em", fit = "crop", expand }: InlineMediaProps) {
  return (
    <ArtifactPill
      src={src}
      alt={alt}
      width={width}
      height={height}
      fit={fit}
      radius="0px"
      position="50% 20%"
      {...(expand
        ? { hoverExpand: true, tabIndex: 0, expandedWidth: expand.width, expandedHeight: expand.height }
        : { "aria-hidden": alt ? undefined : true })}
    />
  );
}
