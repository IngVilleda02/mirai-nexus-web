import "server-only";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
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

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
function leadHtml(lead: Parameters<Provider>[0]) {
  const rows = [
    ["Nombre", lead.name], ["Empresa", lead.company], ["Correo", lead.email],
    ["Teléfono", lead.phone || "—"], ["Servicio", lead.serviceLabel], ["Fecha", lead.receivedAt],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${esc(v)}</td></tr>`).join("");
  return `<table>${rows}</table><p style="white-space:pre-wrap">${esc(lead.message)}</p>`;
}

/**
 * Envía el lead por correo por SMTP (Gmail con contraseña de aplicación, o cualquier buzón).
 * SMTP_USER / SMTP_PASS = la cuenta que envía; CONTACT_TO_EMAIL = quien recibe (oculto en la página).
 */
const smtp: Provider = async (lead) => {
  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS, to = process.env.CONTACT_TO_EMAIL || user;
  if (!user || !pass || !to) return { ok: false, reason: "not_configured" };
  const port = Number(process.env.SMTP_PORT || 465);
  const options: SMTPTransport.Options = { host: process.env.SMTP_HOST || "smtp.gmail.com", port, secure: port === 465, auth: { user, pass } };
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

const safe = async (p: Provider, lead: Parameters<Provider>[0]): Promise<DeliveryResult> => {
  try { return await p(lead); } catch { return { ok: false, reason: "delivery_failed" }; }
};

/** Entrega la solicitud por el proveedor configurado (CONTACT_PROVIDER; si está vacío y hay buzón SMTP, usa SMTP). */
export async function deliverLead(lead: Parameters<Provider>[0]): Promise<DeliveryResult> {
  const name = process.env.CONTACT_PROVIDER?.trim().toLowerCase() || (process.env.SMTP_USER ? "smtp" : "");
  const provider = name ? providers[name] : undefined;
  if (!provider) return { ok: false, reason: "not_configured" };
  return safe(provider, lead);
}
