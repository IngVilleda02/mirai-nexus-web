import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";
import { site, whatsappHref } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();
  const heading = "mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-steel-500";
  const link = "text-sm text-steel-300 transition-colors hover:text-paper";

  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo showSlogan />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-500">
            Conectamos ingeniería, industria y tecnología para crear nuevas oportunidades.
          </p>
        </div>

        <nav aria-label="Servicios" className="md:col-span-3">
          <p className={heading}>Servicios</p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#servicios" className={link}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className={heading}>Contacto</p>
          <ul className="space-y-3">
            <li><a href={`mailto:${site.email}`} className={link}>{site.email}</a></li>
            {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a></li>}
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a></li>
            <li><a href="#contacto" className={link}>Solicita una propuesta</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 font-mono text-[11px] tracking-[0.12em] text-steel-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/aviso-de-privacidad" className="hover:text-paper">Aviso de privacidad</Link>
            <span className="uppercase">{site.slogan}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
