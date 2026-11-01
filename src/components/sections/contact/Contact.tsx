import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { benefits, type Benefit } from "@/content/contact";
import { site, whatsappHref } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { OpenStatus } from "./OpenStatus";

function BenefitIcon({ name }: { name: Benefit["icon"] }) {
  const paths: Record<Benefit["icon"], React.ReactNode> = {
    speed: <path d="M17 3 7 17h8l-2 12 10-15h-8l2-11z" />,
    consult: (
      <>
        <path d="M5 7h22v14H14l-6 5v-5H5z" />
        <path d="M10 12h12M10 16h8" />
      </>
    ),
    shield: (
      <>
        <path d="M16 3 6 7v8c0 6.5 4.3 11.6 10 14 5.7-2.4 10-7.5 10-14V7z" />
        <path d="m11.5 16 3 3 6-6.5" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function Contact() {
  const wa = whatsappHref();

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_65%)]"
        aria-hidden
      />
      <Container>
        {/* Encabezado */}
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-steel-500">
            <span className="h-px w-8 bg-nexus-500" aria-hidden />
            Contacto
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-paper sm:text-5xl">
            Solicita una propuesta<span className="text-nexus-500">.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-steel-300">
            Cuéntanos sobre tu empresa y lo que necesitas. Preparamos una propuesta a la medida de tu operación.
          </p>
        </Reveal>

        {/* Tarjetas flotantes de beneficios */}
        <ul className="mb-14 grid gap-4 sm:grid-cols-3 md:mb-20 md:gap-6">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              className="float-card group border border-line-strong/80 bg-ink-900/80 p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-colors duration-500 hover:border-nexus-500/60"
              style={{ animationDelay: `${i * -2}s` }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-nexus-500 transition-colors group-hover:border-nexus-500/60">
                  <BenefitIcon name={b.icon} />
                </span>
                <h3 className="font-display text-lg font-medium text-paper">{b.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">{b.text}</p>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Canales alternos */}
          <Reveal className="flex flex-col gap-4 lg:col-span-5">
            {/* WhatsApp */}
            <div className="relative overflow-hidden border border-line bg-ink-950 p-6 sm:p-8">
              <span className="absolute right-0 top-0 h-16 w-16 bg-[radial-gradient(circle_at_top_right,rgba(227,23,43,0.25),transparent_70%)]" aria-hidden />
              <WhatsAppIcon className="h-8 w-8 text-paper" />
              <h3 className="mt-6 font-display text-xl font-medium text-paper">¿Prefieres contactarnos por WhatsApp?</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">
                Escríbenos directo desde tu celular y platiquemos sobre tu proyecto.
              </p>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex h-12 items-center gap-3 border border-paper px-5 text-sm font-medium text-paper transition-colors hover:border-nexus-500 hover:bg-nexus-500"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Abrir chat de WhatsApp
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="mt-6 inline-flex h-12 cursor-not-allowed items-center gap-3 border border-line-strong px-5 text-sm text-steel-500"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat disponible muy pronto
                </span>
              )}
            </div>

            {/* Horario */}
            <div className="border border-line bg-ink-950 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">Horario de atención</span>
                <OpenStatus />
              </div>
              <p className="mt-4 font-display text-lg text-paper">{site.hours.label}</p>
              <p className="mt-1 text-sm text-steel-300">{site.hours.range}</p>
              <p className="mt-4 text-xs text-steel-500">Hora del centro de México · {site.location}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
