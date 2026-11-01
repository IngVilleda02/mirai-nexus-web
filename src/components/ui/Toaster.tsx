"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Notificaciones con Sonner (librería de código abierto de Emil Kowalski),
 * adaptadas a la identidad: esquinas rectas, negro, borde fino y acento rojo.
 * En celular se elevan para no quedar debajo de la barra flotante.
 */
export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      offset={24}
      mobileOffset={{ bottom: 92, left: 12, right: 12 }}
      gap={10}
      toastOptions={{
        duration: 6000,
        style: {
          background: "var(--color-ink-900)",
          border: "1px solid var(--color-line-strong)",
          color: "var(--color-paper)",
          borderRadius: 0,
          fontFamily: "var(--font-sans)",
        },
        classNames: {
          description: "!text-steel-300",
          success: "[&_[data-icon]]:!text-nexus-500",
          error: "[&_[data-icon]]:!text-nexus-400",
        },
      }}
    />
  );
}
