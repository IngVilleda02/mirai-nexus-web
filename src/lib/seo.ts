import { site } from "@/content/site";
import { services } from "@/content/services";

/** Datos estructurados (schema.org) para buscadores. Sin datos inventados. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: site.shortName,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/logo-full.png`,
    ...(site.email ? { email: site.email } : {}),
    openingHours: "Mo-Sa 10:00-19:00",
    areaServed: { "@type": "Country", name: "México" },
    address: { "@type": "PostalAddress", addressRegion: "Querétaro", addressCountry: "MX" },
    sameAs: [site.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services
        .filter((s) => s.status === "available")
        .map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.summary } })),
    },
  };
}
