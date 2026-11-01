"use client";

import { useState } from "react";

/**
 * Imagen externa (sitio del cliente) con respaldo:
 * si no existe, el sitio bloquea su carga o falla la red, se muestra `fallback`.
 * Se usa <img> normal (no next/image) porque la imagen vive en el dominio del cliente.
 */
export function SafeImage({
  src,
  alt,
  fallback,
  className,
  width,
  height,
}: {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
