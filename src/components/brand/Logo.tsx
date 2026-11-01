/**
 * Logotipo de MIRAI NEXUS.
 *
 * ⚠️ PROVISIONAL: este símbolo es un marcador geométrico (una "N" formada por
 * nodos conectados). Para usar el logotipo oficial:
 *   1. Coloca el archivo en /public/brand/logo.svg (o .png con fondo transparente).
 *   2. Sustituye <LogoMark /> por:
 *      <Image src="/brand/logo.svg" alt="" width={32} height={32} priority />
 *   3. Reemplaza también src/app/icon.svg (favicon).
 */
interface LogoMarkProps {
  className?: string;
  title?: string;
}

export function LogoMark({ className = "h-8 w-8", title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="1" stroke="currentColor" strokeOpacity="0.18" />
      <path d="M7 25V7l18 18V7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" />
      <circle cx="7" cy="25" r="1.9" fill="currentColor" />
      <circle cx="7" cy="7" r="1.9" fill="currentColor" />
      <circle cx="25" cy="25" r="1.9" fill="currentColor" />
      <circle cx="25" cy="7" r="2.6" fill="var(--color-nexus-500)" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
}

export function Logo({ className = "", showSlogan = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0 text-paper" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[0.28em] text-paper">
          MIRAI<span className="text-nexus-500"> </span>NEXUS
        </span>
        {showSlogan && (
          <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
            Connecting to the Future
          </span>
        )}
      </span>
    </span>
  );
}
