/**
 * Conexión con MIRAI Panel (cotizaciones). Una sola variable: NEXT_PUBLIC_PANEL_URL
 * (ej. https://panel.mirainexus.com). Si está vacía, /admin no existe.
 */
export const PANEL_SLUG = "mirai-nexus"; // identificador de la empresa en el panel

export function panelUrl() {
  const raw = process.env.NEXT_PUBLIC_PANEL_URL?.trim().replace(/\/+$/, "");
  if (!raw) return null;
  return /^https?:\/\/[^\s/]+$/.test(raw) ? raw : null;
}

export const panelAccessUrl = () => (panelUrl() ? `${panelUrl()}/acceso/${PANEL_SLUG}` : null);
export const panelLeadsUrl = () => (panelUrl() ? `${panelUrl()}/api/public/solicitudes/${PANEL_SLUG}` : null);
