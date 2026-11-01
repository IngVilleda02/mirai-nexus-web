import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/content/site";

/** Botón flotante de WhatsApp. Solo aparece si NEXT_PUBLIC_WHATSAPP_NUMBER está configurado. */
export function WhatsAppFloat() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-4 z-40 lg:bottom-8 flex h-12 w-12 items-center justify-center border border-line-strong bg-ink-900/90 text-paper backdrop-blur transition-all duration-300 hover:border-nexus-500 hover:text-nexus-400 lg:right-8 sm:h-14 sm:w-14"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
