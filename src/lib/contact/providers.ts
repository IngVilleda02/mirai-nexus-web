import "server-only";
import type { ContactPayload } from "./schema";

/**
 * Adaptadores de entrega para las solicitudes de contacto.
 * Para agregar un CRM (HubSpot, Zoho, Supabase…), crea una función con la misma
 * firma y regístrala en `providers`. La API no cambia.
 */
export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "delivery_failed" };

type Provider = (lead: ContactPayload & { receivedAt: string; serviceLabel: string }) => Promise<DeliveryResult>;

/** Envía el lead como JSON a un webhook (n8n, Make, Zapier, CRM propio). */
const webhook: Provider = async (lead) => {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return { ok: false, reason: "not_configured" };
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "mirainexus.com", ...lead }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
};

/** Envía el lead por correo usando la API HTTP de Resend (sin SDK). */
const resend: Provider = async (lead) => {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return { ok: false, reason: "not_configured" };

  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const rows = [
    ["Nombre", lead.name],
    ["Empresa", lead.company],
    ["Correo", lead.email],
    ["Teléfono", lead.phone || "—"],
    ["Servicio", lead.serviceLabel],
    ["Fecha", lead.receivedAt],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${esc(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `Nueva solicitud: ${lead.company} — ${lead.serviceLabel}`,
      html: `<table>${rows}</table><p style="white-space:pre-wrap">${esc(lead.message)}</p>`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
};

const providers: Record<string, Provider> = { webhook, resend };

export async function deliverLead(lead: Parameters<Provider>[0]): Promise<DeliveryResult> {
  const name = process.env.CONTACT_PROVIDER?.trim().toLowerCase();
  const provider = name ? providers[name] : undefined;
  if (!provider) return { ok: false, reason: "not_configured" };
  try {
    return await provider(lead);
  } catch {
    return { ok: false, reason: "delivery_failed" };
  }
}
