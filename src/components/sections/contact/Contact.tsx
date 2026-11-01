import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappHref } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const wa = whatsappHref();

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_65%)]" aria-hidden />
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-steel-500">
            <span className="text-nexus-500">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden />
            Contacto
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-paper sm:text-5xl">
            Solicita una propuesta<span className="text-nexus-500">.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-steel-300">
            Cuéntanos sobre tu empresa y lo que necesitas. Preparamos una propuesta a la medida de tu operación.
          </p>

          <div className="mt-10 grid gap-px border border-line bg-line">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-ink-950 p-5 transition-colors hover:bg-ink-900"
              >
                <span className="flex items-center gap-4">
                  <WhatsAppIcon className="h-5 w-5 text-nexus-500" />
                  <span>
                    <span className="block text-sm text-paper">WhatsApp</span>
                    <span className="block text-xs text-steel-500">Respuesta directa</span>
                  </span>
                </span>
                <span className="text-steel-500 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            )}
            <a href={`mailto:${site.email}`} className="group flex items-center justify-between bg-ink-950 p-5 transition-colors hover:bg-ink-900">
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-steel-500">Correo</span>
                <span className="mt-1 block text-sm text-paper">{site.email}</span>
              </span>
              <span className="text-steel-500 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
            <div className="bg-ink-950 p-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-steel-500">Ubicación</span>
              <span className="mt-1 block text-sm text-paper">{site.location}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
