import type { ServiceStatus } from "@/content/services";

const map: Record<ServiceStatus, { label: string; cls: string; dot: string }> = {
  available: { label: "Disponible", cls: "border-nexus-500/40 text-paper", dot: "bg-nexus-500" },
  development: { label: "En desarrollo", cls: "border-line-strong text-steel-500", dot: "bg-steel-700" },
};

export function StatusBadge({ status }: { status: ServiceStatus }) {
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </span>
  );
}
