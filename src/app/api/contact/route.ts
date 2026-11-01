import { NextResponse } from "next/server";
import { normalize, validate } from "@/lib/contact/schema";
import { deliverLead } from "@/lib/contact/providers";
import { serviceOptions } from "@/content/services";

/**
 * POST /api/contact
 * Respuestas:
 *  200 { ok: true }                         → entregado al proveedor configurado.
 *  400 { ok: false, errors }                → datos inválidos.
 *  429 { ok: false, code: "rate_limited" }
 *  503 { ok: false, code: "not_configured" } → aún no hay backend conectado (no se simula éxito).
 *  502 { ok: false, code: "delivery_failed" }
 */

// Límite simple por IP (memoria de la instancia). Para producción con mucho tráfico,
// sustituir por Upstash Redis / Vercel KV o el WAF de Cloudflare.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > MAX;
}

export async function POST(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  const data = normalize((body ?? {}) as Record<string, unknown>);

  // Honeypot: los bots llenan el campo oculto. Se responde 200 sin entregar nada.
  if (data.website) return NextResponse.json({ ok: true });

  const errors = validate(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const serviceLabel = serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;
  const { website: _hp, ...lead } = data;
  void _hp;

  const result = await deliverLead({ ...lead, serviceLabel, receivedAt: new Date().toISOString() });

  if (result.ok) return NextResponse.json({ ok: true });
  if (result.reason === "not_configured") return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
}
