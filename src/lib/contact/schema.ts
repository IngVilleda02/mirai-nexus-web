/**
 * Validación compartida del formulario (cliente y servidor).
 * Sin dependencias externas para mantener el bundle ligero.
 */
export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  /** Campo trampa anti-spam: debe llegar vacío. */
  website?: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,19}$/;

export const LIMITS = { name: 80, company: 120, email: 120, phone: 20, message: 2000 } as const;

export function normalize(input: Partial<Record<keyof ContactPayload, unknown>>): ContactPayload {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  return {
    name: str(input.name, LIMITS.name),
    company: str(input.company, LIMITS.company),
    email: str(input.email, LIMITS.email).toLowerCase(),
    phone: str(input.phone, LIMITS.phone),
    service: str(input.service, 40),
    message: str(input.message, LIMITS.message),
    consent: input.consent === true || input.consent === "on" || input.consent === "true",
    website: str(input.website, 200),
  };
}

export function validate(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (p.name.length < 2) e.name = "Escribe tu nombre.";
  if (p.company.length < 2) e.company = "Escribe el nombre de tu empresa.";
  if (p.email && !EMAIL_RE.test(p.email)) e.email = "Revisa el formato del correo.";
  if (p.phone && !PHONE_RE.test(p.phone)) e.phone = "Revisa el formato del teléfono.";
  if (!p.service) e.service = "Selecciona un tipo de servicio.";
  if (p.message.length < 10) e.message = "Cuéntanos un poco más sobre tu proyecto (mín. 10 caracteres).";
  if (!p.consent) e.consent = "Necesitamos tu autorización para contactarte.";
  return e;
}
