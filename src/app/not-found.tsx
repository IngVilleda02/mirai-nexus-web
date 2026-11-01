import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-grid flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-nexus-500">Error 404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-paper">Conexión no encontrada.</h1>
      <p className="mt-3 text-steel-300">La página que buscas no existe o fue movida.</p>
      <Link href="/" className={buttonClass("secondary", "mt-10")}>Volver al inicio</Link>
    </main>
  );
}
