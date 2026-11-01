"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { navigation } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink-950/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink-950">
        Saltar al contenido
      </a>
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="MIRAI NEXUS — inicio" onClick={() => setOpen(false)}>
          <Logo height={46} priority />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-steel-300 transition-colors hover:text-paper after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-nexus-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <a href="#contacto" className={buttonClass("primary", "h-10 px-5 text-[13px]")}>
              Solicita una propuesta
            </a>
          </span>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-4 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-4 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-ink-950 lg:hidden"
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <nav aria-label="Móvil" className="flex flex-col">
            {navigation.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-5 font-display text-2xl text-paper"
              >
                <span className="font-mono text-xs text-nexus-500">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contacto" onClick={() => setOpen(false)} className={buttonClass("primary", "w-full")}>
            Solicita una propuesta
          </a>
        </Container>
      </div>
    </header>
  );
}
