/**
 * ───────────────────────── PROYECTOS DE CLIENTES ─────────────────────────
 * Para agregar un cliente, solo pega la dirección de su página:
 *
 *   { url: "https://www.cliente.com" },
 *
 * La tarjeta se arma sola con el título, la descripción y la imagen de vista
 * previa del sitio del cliente. Campos opcionales si quieres ajustar algo:
 *   industry: "Maquinados CNC"        → etiqueta roja de la tarjeta
 *   title / description / image       → reemplazan lo que se obtuvo del sitio
 * Agrega clientes solo con su autorización.
 */
export interface ClientSite {
  url: string;
  industry?: string;
  title?: string;
  description?: string;
  image?: string;
}

export const clientSites: ClientSite[] = [
  {
    // CABA — primer cliente. Imagen local porque su dominio aún no está publicado; al publicarse se puede quitar `image`.
    url: "https://cabamaquinados.com",
    industry: "Maquinados y fabricación industrial",
    title: "CABA Servicios y Maquinados Industriales",
    description: "Sitio con servicios, portafolio en planta, solicitud de visita por WhatsApp y acceso a su panel de cotizaciones.",
    image: "/portfolio/clientes/caba.webp",
  },
  // { url: "https://www.cliente-ejemplo.com", industry: "Maquinados CNC" },
];

/** Mostrar los proyectos demostrativos. Ponlo en false cuando tengas clientes suficientes. */
export const showDemoProjects = true;

/**
 * ───────────────────────── PROYECTOS DEMOSTRATIVOS ─────────────────────────
 * kind:
 *  - "demo":   proyecto conceptual desarrollado por Mirai Nexus (NO es cliente real).
 *  - "client": proyecto publicado para un cliente real (agregar solo con autorización).
 * Las imágenes viven en /public/portfolio. Usa .webp o .avif de ~1600px de ancho.
 */
export interface Project {
  slug: string;
  name: string;
  industry: string;
  description: string;
  services: string[];
  images: { src: string; alt: string }[];
  url?: string;
  kind: "demo" | "client";
}

export const projects: Project[] = [
  {
    slug: "demo-maquinados",
    name: "Catálogo de capacidades CNC",
    industry: "Maquinados y manufactura",
    description:
      "Concepto de sitio para un taller de maquinados: maquinaria, tolerancias, materiales y solicitud de cotización con carga de planos.",
    services: ["Página corporativa", "Catálogo digital", "Solicitud de cotización"],
    images: [{ src: "/portfolio/demo-maquinados.svg", alt: "Vista conceptual del catálogo de capacidades CNC" }],
    kind: "demo",
  },
  {
    slug: "demo-proveedor",
    name: "Portal de proveedor industrial",
    industry: "Proveedores industriales",
    description:
      "Concepto de catálogo para un distribuidor de herramientas y consumibles, con filtros por categoría y contacto directo por WhatsApp.",
    services: ["Landing page", "Catálogo de proveedores", "Integración WhatsApp"],
    images: [{ src: "/portfolio/demo-proveedor.svg", alt: "Vista conceptual del portal de proveedor industrial" }],
    kind: "demo",
  },
];
