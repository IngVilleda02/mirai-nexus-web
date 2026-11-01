"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { navigation } from "@/content/site";
import { TAB_EVENT } from "@/components/sections/solutions/SolutionsTabs";

/**
 * Encabezado + barra de navegación flotante.
 * - Escritorio: barra flotante centrada arriba, entre el logotipo y el botón de propuesta.
 * - Celular/tablet: barra flotante fija abajo (alcance del pulgar), con desplazamiento horizontal.
 * - Resalta el apartado visible (scrollspy) y la pestaña abierta de Soluciones.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const mobileBar = useRef<HTMLDivElement>(null);

  // En celular, desplaza la barra para que el apartado activo quede visible.
  useEffect(() => {
    const bar = mobileBar.current;
    const link = bar?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!bar || !link) return;
    const left = link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    let tab = "servicios";
    const vh = () => window.innerHeight * 0.4;

    const compute = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const id of ["nosotros", "soluciones", "contacto"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < vh()) current = id;
      }
      if (current === "soluciones") {
        const ind = document.getElementById("industrias");
        current = tab === "servicios" && ind && ind.getBoundingClientRect().top < vh() ? "industrias" : tab;
      }
      setActive(current ? `#${current}` : "");
    };

    const onTab = (e: Event) => {
      tab = (e as CustomEvent<string>).detail;
      compute();
    };

    const raf = requestAnimationFrame(compute);
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    window.addEventListener(TAB_EVENT, onTab);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      window.removeEventListener(TAB_EVENT, onTab);
    };
  }, []);

  const links = () =>
    navigation.map((item) => {
      const on = active === item.href;
      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={on ? "true" : undefined}
          data-nav={item.href}
          className={`relative shrink-0 whitespace-nowrap px-3.5 py-2.5 text-[13px] transition-colors duration-300 ${
            on ? "text-paper" : "text-steel-300 hover:text-paper"
          }`}
        >
          {item.label}
          <span
            data-nav-bar
            className={`absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-nexus-500 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
              on ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden
          />
        </a>
      );
    });

  const bar = "border border-line-strong/80 bg-ink-900/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl";

  return (
    <>
      <header
        data-header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-ink-950/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink-950"
        >
          Saltar al contenido
        </a>
        <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" aria-label="MIRAI NEXUS — inicio" className="shrink-0">
            <Logo height={46} priority />
          </Link>

          {/* Barra flotante (escritorio) */}
          <nav aria-label="Principal" className={`hidden items-center p-1 lg:flex ${bar}`}>
            {links()}
          </nav>

          <a href="#contacto" className={buttonClass("primary", "h-10 shrink-0 px-4 text-[13px] sm:px-5")}>
            <span className="sm:hidden">Propuesta</span>
            <span className="hidden sm:inline">Solicita una propuesta</span>
          </a>
        </Container>
      </header>

      {/* Barra flotante (celular y tablet) */}
      <nav
        aria-label="Secciones"
        className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
      >
        <div
          ref={mobileBar}
          data-mobile-bar
          className={`mx-auto flex max-w-xl overflow-x-auto p-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${bar}`}
        >
          {links()}
        </div>
      </nav>
    </>
  );
}
