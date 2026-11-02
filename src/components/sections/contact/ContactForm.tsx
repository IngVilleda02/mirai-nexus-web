"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { serviceOptions } from "@/content/services";
import { whatsappHref } from "@/content/site";
import { LIMITS, normalize, validate, type ContactErrors } from "@/lib/contact/schema";

/**
 * Formulario de contacto: valida y abre WhatsApp con una plantilla que lleva todo lo que escribió el cliente.
 * No usa servidor ni correo (como el sitio de CABA).
 */
type Status = { kind: "idle" } | { kind: "sent"; url: string };

const field =
  "w-full border border-line bg-ink-950 px-4 py-3.5 text-sm text-paper placeholder:text-steel-700 transition-colors focus:border-nexus-500 focus:outline-none aria-[invalid=true]:border-nexus-600";
const labelCls = "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-steel-500";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = normalize({ ...Object.fromEntries(fd.entries()), consent: fd.get("consent") === "on" });
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    if (data.website) return; // bot

    const service = serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;
    const text = [
      "*Solicitud de propuesta — MIRAI NEXUS*",
      "",
      `*Nombre:* ${data.name}`,
      `*Empresa:* ${data.company}`,
      ...(data.email ? [`*Correo:* ${data.email}`] : []),
      ...(data.phone ? [`*Teléfono:* ${data.phone}`] : []),
      `*Servicio:* ${service}`,
      "",
      "*Proyecto:*",
      data.message,
      "",
      "_Enviado desde el sitio web de MIRAI NEXUS._",
    ].join("\n");
    const url = whatsappHref(text);
    if (!url) {
      toast.error("WhatsApp no está disponible", { description: "Intenta más tarde." });
      return;
    }
    window.open(url, "_blank", "noopener");
    setStatus({ kind: "sent", url });
    toast.success("Se abrió WhatsApp", { description: "Tu solicitud está lista; solo toca enviar." });
    form.reset();
  }

  const err = (k: keyof ContactErrors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-xs text-nexus-400">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof ContactErrors) => ({
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  if (status.kind === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col justify-center border border-line bg-ink-900 p-8 sm:p-12">
        <span className="mb-6 h-2 w-2 bg-nexus-500" aria-hidden />
        <h3 className="font-display text-2xl font-medium text-paper">Se abrió WhatsApp.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-300">
          Tu solicitud ya está escrita en el chat; solo toca enviar. Si no se abrió,{" "}
          <a href={status.url} target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-4">ábrelo aquí</a>.
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-8 self-start text-sm text-steel-300 underline-offset-4 hover:text-paper hover:underline">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="surface p-6 sm:p-10" aria-label="Formulario de contacto">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Nombre *</label>
          <input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} className={field} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>Empresa *</label>
          <input id="company" name="company" autoComplete="organization" maxLength={LIMITS.company} className={field} {...aria("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} className={field} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Teléfono</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone} className={field} {...aria("phone")} />
          {err("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelCls}>Tipo de servicio *</label>
          <div className="relative">
            <select id="service" name="service" defaultValue="" className={`${field} appearance-none pr-10`} {...aria("service")}>
              <option value="" disabled>Selecciona una opción</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-steel-500" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {err("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>Descripción del proyecto *</label>
          <textarea id="message" name="message" rows={5} maxLength={LIMITS.message} placeholder="¿Qué hace tu empresa y qué te gustaría lograr?" className={`${field} resize-y`} {...aria("message")} />
          {err("message")}
        </div>

        {/* Honeypot anti-spam (oculto para personas) */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">No llenar</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-steel-300">
            <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-nexus-500)]" {...aria("consent")} />
            <span>
              Acepto el{" "}
              <Link href="/aviso-de-privacidad" className="text-paper underline underline-offset-4 hover:text-nexus-400">
                aviso de privacidad
              </Link>{" "}
              y autorizo que me contacten por WhatsApp sobre mi solicitud.
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" arrow className="w-full sm:w-auto">
          Enviar por WhatsApp
        </Button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-700">* Campos obligatorios</p>
      </div>

    </form>
  );
}
