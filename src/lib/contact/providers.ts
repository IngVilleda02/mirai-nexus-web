import "server-only";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { ContactPayload } from "./schema";
import { PANEL_SLUG, panelUrl } from "@/lib/panel";

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

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
function leadHtml(lead: Parameters<Provider>[0]) {
  const rows = [
    ["Nombre", lead.name], ["Empresa", lead.company], ["Correo", lead.email],
    ["Teléfono", lead.phone || "—"], ["Servicio", lead.serviceLabel], ["Fecha", lead.receivedAt],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${esc(v)}</td></tr>`).join("");
  return `<table>${rows}</table><p style="white-space:pre-wrap">${esc(lead.message)}</p>`;
}

/**
 * Envía el lead por correo con un buzón de Hostinger (SMTP). Recomendado: todo queda dentro del plan.
 * SMTP_USER / SMTP_PASS = el buzón (ej. contacto@mirainexus.com); CONTACT_TO_EMAIL = quien recibe (oculto en la página).
 */
const smtp: Provider = async (lead) => {
  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS, to = process.env.CONTACT_TO_EMAIL || user;
  if (!user || !pass || !to) return { ok: false, reason: "not_configured" };
  const port = Number(process.env.SMTP_PORT || 465);
  const options: SMTPTransport.Options = { host: process.env.SMTP_HOST || "smtp.hostinger.com", port, secure: port === 465, auth: { user, pass } };
  const info = await nodemailer.createTransport(options).sendMail({
    from: { name: "Sitio MIRAI NEXUS", address: user },
    to,
    replyTo: lead.email,
    subject: `Nueva solicitud: ${lead.company} — ${lead.serviceLabel}`,
    text: `${lead.name} (${lead.company})\n${lead.email} · ${lead.phone || "sin teléfono"}\nServicio: ${lead.serviceLabel}\n\n${lead.message}`,
    html: leadHtml(lead),
  });
  return info.accepted.length ? { ok: true } : { ok: false, reason: "delivery_failed" };
};

/** Envía el lead por correo usando la API HTTP de Resend (sin SDK). */
const resend: Provider = async (lead) => {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return { ok: false, reason: "not_configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `Nueva solicitud: ${lead.company} — ${lead.serviceLabel}`,
      html: leadHtml(lead),
    }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
};

const providers: Record<string, Provider> = { smtp, webhook, resend };

/** Copia la solicitud a «Solicitudes» de MIRAI NEXUS en el panel de cotizaciones (si NEXT_PUBLIC_PANEL_URL existe). */
const panel: Provider = async (lead) => {
  const base = panelUrl();
  if (!base) return { ok: false, reason: "not_configured" };
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
  const res = await fetch(`${base}/api/public/solicitudes/${PANEL_SLUG}`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: site },
    body: JSON.stringify({ nombre: lead.name, empresa: lead.company, correo: lead.email, telefono: lead.phone ?? "", servicio: lead.serviceLabel, necesidad: lead.message }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
};

const safe = async (p: Provider, lead: Parameters<Provider>[0]): Promise<DeliveryResult> => {
  try { return await p(lead); } catch { return { ok: false, reason: "delivery_failed" }; }
};

/**
 * Entrega la solicitud por el proveedor configurado (CONTACT_PROVIDER; si está vacío y hay buzón SMTP, usa SMTP)
 * y, además, la guarda en el panel. Se responde «recibida» solo si al menos uno de los dos la recibió de verdad.
 */
export async function deliverLead(lead: Parameters<Provider>[0]): Promise<DeliveryResult> {
  const name = process.env.CONTACT_PROVIDER?.trim().toLowerCase() || (process.env.SMTP_USER ? "smtp" : "");
  const provider = name ? providers[name] : undefined;
  const [main, copy] = await Promise.all([
    provider ? safe(provider, lead) : Promise.resolve<DeliveryResult>({ ok: false, reason: "not_configured" }),
    safe(panel, lead),
  ]);
  if (main.ok || copy.ok) return { ok: true };
  return main.reason === "not_configured" && copy.reason === "not_configured" ? { ok: false, reason: "not_configured" } : { ok: false, reason: "delivery_failed" };
}
