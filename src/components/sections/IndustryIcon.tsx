import type { Industry } from "@/content/industries";

/** Iconografía lineal propia, trazo 1.5, cuadrícula 32px. */
const paths: Record<Industry["icon"], React.ReactNode> = {
  automotive: (
    <>
      <path d="M4 20l3-7h18l3 7v5H4z" />
      <path d="M7 13l2-5h14l2 5" />
      <circle cx="10" cy="25" r="2.5" />
      <circle cx="22" cy="25" r="2.5" />
    </>
  ),
  cnc: (
    <>
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="3" />
      <path d="M16 3v5M16 24v5M3 16h5M24 16h5" />
    </>
  ),
  automation: (
    <>
      <path d="M6 27h12M12 27v-6l6-8 6 2" />
      <circle cx="12" cy="21" r="2" />
      <circle cx="18" cy="13" r="2" />
      <path d="M24 15l3 4M24 15l4-1" />
    </>
  ),
  maintenance: (
    <>
      <path d="M20 5a6 6 0 0 0-5.6 8.2L5 22.6 9.4 27l9.4-9.4A6 6 0 0 0 27 12l-4 1-3-3 1-4z" />
    </>
  ),
  supplier: (
    <>
      <path d="M4 10l12-6 12 6v12l-12 6-12-6z" />
      <path d="M4 10l12 6 12-6M16 16v12" />
    </>
  ),
  business: (
    <>
      <rect x="4" y="9" width="24" height="17" />
      <path d="M12 9V5h8v4M4 16h24" />
    </>
  ),
};

export function IndustryIcon({ name, className = "h-8 w-8" }: { name: Industry["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      {paths[name]}
    </svg>
  );
}
