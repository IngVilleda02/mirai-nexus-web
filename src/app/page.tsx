import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/solutions/Solutions";
import { Contact } from "@/components/sections/contact/Contact";
import { organizationJsonLd } from "@/lib/seo";

/**
 * Página principal. Cada sección es un componente independiente:
 * reordénalas, quítalas o reutilízalas en proyectos de clientes.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Solutions />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
    </>
  );
}
