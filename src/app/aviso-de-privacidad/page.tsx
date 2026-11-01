import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Aviso de privacidad de ${site.name}.`,
  alternates: { canonical: "/aviso-de-privacidad" },
};

/**
 * ⚠️ BORRADOR. Antes de publicar, completa los datos marcados [ ] y haz que un
 * asesor legal lo revise conforme a la legislación mexicana vigente de protección
 * de datos personales en posesión de particulares.
 */
export default function PrivacyPage() {
  const h2 = "mt-12 font-display text-xl font-medium text-paper";
  return (
    <>
      <Header linkBase="/" />
      <main id="contenido" className="pb-24 pt-32 md:pt-40">
        <Container className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-nexus-500">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper">Aviso de privacidad</h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-steel-500">Última actualización: [fecha]</p>

          <div className="mt-10 space-y-4 text-sm leading-relaxed text-steel-300">
            <h2 className={h2}>Responsable</h2>
            <p>
              {site.name} ([razón social o nombre del titular]), con domicilio en [domicilio], {site.location}, es
              responsable del tratamiento de los datos personales que nos proporcionas.
            </p>

            <h2 className={h2}>Datos que recabamos</h2>
            <p>
              A través del formulario de contacto y de nuestros canales de comunicación recabamos: nombre, empresa,
              correo electrónico, teléfono y la información que decidas compartir sobre tu proyecto. No solicitamos datos
              personales sensibles.
            </p>

            <h2 className={h2}>Finalidades</h2>
            <p>
              Utilizamos tus datos para responder a tu solicitud, elaborar propuestas y cotizaciones, y dar seguimiento
              comercial a tu proyecto. Si no deseas recibir seguimiento comercial, puedes indicarlo en cualquier momento.
            </p>

            <h2 className={h2}>Transferencias y encargados</h2>
            <p>
              Tus datos pueden ser almacenados por proveedores tecnológicos que nos prestan servicios de alojamiento,
              correo o gestión de clientes, únicamente para las finalidades descritas. No vendemos ni compartimos tus
              datos con terceros para fines propios de ellos.
            </p>

            <h2 className={h2}>Derechos ARCO</h2>
            <p>
              Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como
              revocar tu consentimiento, escribiendo a{" "}
              {site.email ? (
                <a href={`mailto:${site.email}`} className="text-paper underline underline-offset-4">{site.email}</a>
              ) : (
                "[correo de contacto]"
              )}
              .
            </p>

            <h2 className={h2}>Cambios a este aviso</h2>
            <p>Cualquier modificación se publicará en esta misma página.</p>
          </div>

          <Link href="/" className="mt-14 inline-block text-sm text-steel-300 hover:text-paper">← Volver al inicio</Link>
        </Container>
      </main>
      <Footer linkBase="/" />
    </>
  );
}
