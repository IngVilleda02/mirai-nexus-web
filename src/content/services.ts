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
    title: "Desarrollo web y soluciones digitales industriales",
    summary: "Presencia digital profesional, pensada para cómo compra y vende la industria.",
    items: [
      "Landing pages",
      "Páginas corporativas",
      "Catálogos digitales y de proveedores",
      "Portafolios empresariales",
      "Presentación de capacidades industriales",
      "Solicitudes de cotización",
      "Directorios empresariales",
    ],
    status: "available",
  },
  {
    id: "engineering",
    code: "02",
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
