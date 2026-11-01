/**
 * Portafolio.
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
