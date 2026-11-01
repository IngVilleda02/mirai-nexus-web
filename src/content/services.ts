/**
 * Catálogo de servicios.
 * status:
 *  - "available":   se ofrece hoy y se puede cotizar.
 *  - "development": solución en desarrollo; se muestra como próxima.
 * Cambia el status cuando un servicio pase a estar disponible.
 */
export type ServiceStatus = "available" | "development";

export interface Service {
  id: string;
  code: string;
  title: string;
  summary: string;
  items: string[];
  status: ServiceStatus;
}

export const services: Service[] = [
  {
    id: "web",
    code: "01",
    title: "Desarrollo web empresarial",
    summary: "Presencia digital profesional, rápida y lista para generar contactos.",
    items: ["Landing pages", "Páginas corporativas", "Catálogos digitales", "Portafolios empresariales"],
    status: "available",
  },
  {
    id: "industrial",
    code: "02",
    title: "Soluciones digitales industriales",
    summary: "Herramientas diseñadas para cómo compra y vende la industria.",
    items: [
      "Presentación de capacidades industriales",
      "Catálogos de proveedores",
      "Solicitudes de cotización",
      "Directorios empresariales",
    ],
    status: "available",
  },
  {
    id: "ai",
    code: "03",
    title: "Automatización e inteligencia artificial",
    summary: "Menos trabajo manual en la atención y el seguimiento comercial.",
    items: ["Chatbots", "Automatización de contactos", "Formularios inteligentes", "Integraciones digitales"],
    status: "development",
  },
  {
    id: "engineering",
    code: "04",
    title: "Ingeniería y tecnología",
    summary: "Información de planta convertida en decisiones visibles.",
    items: [
      "Dashboards industriales",
      "Indicadores OEE",
      "Monitoreo de producción",
      "Integración de información industrial",
    ],
    status: "development",
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "otro", label: "Otro / aún no lo sé" },
];
