import { InlineMedia } from "@/components/ui/InlineMedia";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesPanel } from "@/components/sections/Services";
import { IndustriesPanel } from "@/components/sections/Industries";
import { PortfolioPanel } from "@/components/sections/Portfolio";
import { ProcessPanel } from "@/components/sections/Process";
import { SolutionsTabs } from "./SolutionsTabs";

/**
 * Sección 02: Servicios, Proyectos y Cómo trabajamos en pestañas.
 * Para agregar una pestaña nueva, añade un objeto a `tabs`.
 */
export function Solutions() {
  return (
    <section id="soluciones" className="relative scroll-mt-16 border-t border-line bg-ink-900/40 py-24 md:scroll-mt-20 md:py-32">
      <Container>
        <SectionHeader
          label="Soluciones"
          title={
            <>
              Explora{" "}
              <InlineMedia
                src="/inline/demo-maquinados.webp"
                alt="Vista previa de un proyecto demostrativo: catálogo de capacidades CNC"
                width="2.2em"
                height=".78em"
                expand={{ width: "5.6em", height: "3.5em" }}
              />{" "}
              cómo podemos{" "}
              <InlineMedia
                src="/inline/demo-proveedor.webp"
                alt="Vista previa de un proyecto demostrativo: portal de proveedor industrial"
                width="1.6em"
                height=".78em"
                expand={{ width: "5.6em", height: "3.5em" }}
              />{" "}
              ayudarte<span className="text-nexus-500">.</span>
            </>
          }
          intro="Conoce nuestros servicios, los proyectos que hemos desarrollado y la forma en que trabajamos contigo."
        />

        <SolutionsTabs
          sectionId="soluciones"
          aliases={{ industrias: "servicios" }}
          tabs={[
            {
              id: "servicios",
              label: "Servicios",
              content: (
                <div className="grid gap-24">
                  <ServicesPanel />
                  <IndustriesPanel />
                </div>
              ),
            },
            { id: "proyectos", label: "Proyectos", content: <PortfolioPanel /> },
            { id: "proceso", label: "Cómo trabajamos", content: <ProcessPanel /> },
          ]}
        />
      </Container>
    </section>
  );
}
