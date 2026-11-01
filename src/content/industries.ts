/** Soluciones por industria. `icon` corresponde a una clave de IndustryIcon. */
export interface Industry {
  id: string;
  name: string;
  icon: "automotive" | "cnc" | "automation" | "maintenance" | "supplier" | "business";
  pitch: string;
}

export const industries: Industry[] = [
  {
    id: "automotriz",
    name: "Automotriz",
    icon: "automotive",
    pitch:
      "Muestra procesos, capacidad instalada y estándares de calidad de forma clara para compradores y áreas de desarrollo de proveedores.",
  },
  {
    id: "maquinados",
    name: "Maquinados y manufactura",
    icon: "cnc",
    pitch:
      "Presenta tus capacidades de fabricación, maquinaria, materiales y servicios mediante un catálogo digital profesional que facilite el contacto con nuevos clientes.",
  },
  {
    id: "automatizacion",
    name: "Automatización industrial",
    icon: "automation",
    pitch:
      "Exhibe proyectos de integración, marcas con las que trabajas y tu alcance técnico para que los clientes entiendan qué puedes resolver.",
  },
  {
    id: "mantenimiento",
    name: "Mantenimiento",
    icon: "maintenance",
    pitch:
      "Organiza tus servicios preventivos y correctivos, cobertura y tiempos de respuesta, con un canal directo para solicitudes urgentes.",
  },
  {
    id: "proveedores",
    name: "Proveedores industriales",
    icon: "supplier",
    pitch:
      "Convierte tu lista de productos, herramientas y materiales en un catálogo consultable con solicitud de cotización integrada.",
  },
  {
    id: "servicios",
    name: "Servicios empresariales",
    icon: "business",
    pitch:
      "Comunica tu propuesta de valor con una página clara y profesional que transmita confianza desde el primer contacto.",
  },
];
