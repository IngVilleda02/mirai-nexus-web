/**
 * Configuración central de la marca.
 * Edita este archivo para cambiar datos de contacto, redes y textos globales.
 * Para reutilizar el proyecto con un cliente, este es el primer archivo a modificar.
 */
export const site = {
  name: "MIRAI NEXUS",
  shortName: "Mirai Nexus",
  slogan: "Connecting to the Future",
  kanji: "未来",
  description:
    "Desarrollo web industrial y soluciones digitales para proveedores, manufactura, automotriz y empresas de ingeniería. Catálogos digitales, páginas corporativas y automatización empresarial.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mirainexus.com").replace(/\/$/, ""),
  locale: "es_MX",
  location: "Querétaro, México",
  // PENDIENTE: correo comercial. Vacío = no se muestra en el sitio.
  email: "",
  // Número en formato internacional sin "+" (ej. 5214421234567). Vacío = botón oculto.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  /** Horario de atención (hora del centro de México). days: 0 = domingo … 6 = sábado. */
  hours: {
    label: "Lunes a sábado",
    range: "10:00 a.m. – 7:00 p.m.",
    days: [1, 2, 3, 4, 5, 6],
    open: 10,
    close: 19,
    timeZone: "America/Mexico_City",
  },
  whatsappMessage: "Hola, me interesa recibir una propuesta de Mirai Nexus.",
  // TODO: reemplazar con el perfil oficial.
  instagram: "https://www.instagram.com/mirainexus",
  keywords: [
    "desarrollo web industrial",
    "páginas web para proveedores industriales",
    "catálogos digitales empresariales",
    "desarrollo web para empresas automotrices",
    "soluciones digitales industriales",
    "automatización empresarial",
    "página web maquinados CNC",
    "Querétaro",
  ],
} as const;

export const navigation = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Industrias", href: "#industrias" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;

export function whatsappHref(message: string = site.whatsappMessage): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
