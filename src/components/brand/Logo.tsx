import Image from "next/image";

/**
 * Logotipo oficial de MIRAI NEXUS.
 * Archivos en /public/brand:
 *   logo-full.webp  → símbolo 未来 + "MIRAI NEXUS" (fondo transparente)
 *   logo-mark.webp  → solo el símbolo
 *   logo-full.png / logo-mark.png → originales en alta resolución
 * Proporciones: logo completo 1116×476 · símbolo 462×468.
 */
const FULL_RATIO = 1116 / 476;
const MARK_RATIO = 462 / 468;

interface LogoProps {
  className?: string;
  /** Altura en píxeles. */
  height?: number;
  priority?: boolean;
  showSlogan?: boolean;
}

export function Logo({ className = "", height = 40, priority = false, showSlogan = false }: LogoProps) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <Image
        src="/brand/logo-full.webp"
        alt="MIRAI NEXUS"
        width={Math.round(height * FULL_RATIO)}
        height={height}
        priority={priority}
        unoptimized
        className="h-auto max-w-full select-none"
        style={{ height, width: "auto" }}
      />
      {showSlogan && (
        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
          Connecting to the Future
        </span>
      )}
    </span>
  );
}

export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.webp"
      alt=""
      aria-hidden
      width={Math.round(size * MARK_RATIO)}
      height={size}
      unoptimized
      className={`select-none ${className}`}
      style={{ height: size, width: "auto" }}
    />
  );
}
