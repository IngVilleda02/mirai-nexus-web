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
 * - Una píldora se desliza hasta el apartado visible (scrollspy) y la pestaña abierta.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const mobileBar = useRef<HTMLDivElement>(null);
  const desktopBar = useRef<HTMLElement>(null);

  // Scrollspy: qué apartado está a la vista.
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

  // Píldora deslizante (se mueve con transform, sin volver a renderizar) y
  // desplazamiento de la barra móvil para que el apartado activo quede a la vista.
  useEffect(() => {
    const place = () => {
      for (const bar of [desktopBar.current, mobileBar.current]) {
        const pill = bar?.querySelector<HTMLElement>("[data-nav-pill]");
        const link = bar?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
        if (!pill) continue;
        if (!link) {
          pill.style.opacity = "0";
          continue;
        }
        pill.style.opacity = "1";
        pill.style.width = `${link.offsetWidth}px`;
        pill.style.transform = `translateX(${link.offsetLeft}px)`;
      }
      const mb = mobileBar.current;
      const ml = mb?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
      if (mb && ml) mb.scrollTo({ left: ml.offsetLeft - (mb.clientWidth - ml.offsetWidth) / 2, behavior: "smooth" });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const links = () => (
    <>
      <span
        data-nav-pill
        aria-hidden
        className="nav-pill pointer-events-none absolute bottom-1 left-0 top-1 border border-white/10 bg-white/[0.07] opacity-0 transition-[transform,width,opacity] duration-300 ease-[var(--ease-in-out-strong)]"
      >
        <span className="absolute inset-x-3 -bottom-px h-px bg-nexus-500" />
      </span>
      {navigation.map((item) => {
        const on = active === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={on ? "true" : undefined}
            data-nav={item.href}
            className={`relative z-10 flex min-h-11 shrink-0 items-center whitespace-nowrap px-3.5 text-[13px] transition-[color,transform] duration-200 active:scale-[0.97] ${
              on ? "text-paper" : "text-steel-300 hover:text-paper"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );

  const bar =
    "border border-line-strong/80 bg-ink-900/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl";

  return (
    <>
      <header
        data-header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
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
          <Link
            href="/"
            aria-label="MIRAI NEXUS — inicio"
            className="enter shrink-0 transition-transform duration-200 active:scale-[0.97]"
          >
            <Logo height={46} priority />
          </Link>

          {/* Barra flotante (escritorio) */}
          <nav
            ref={desktopBar}
            aria-label="Principal"
            className={`enter relative hidden items-center p-1 lg:flex ${bar}`}
            style={{ ["--d" as string]: "120ms" }}
          >
            {links()}
          </nav>

          <a
            href="#contacto"
            className={buttonClass("primary", "enter h-10 shrink-0 px-4 text-[13px] sm:px-5")}
            style={{ ["--d" as string]: "200ms" }}
          >
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
          className={`relative mx-auto flex max-w-xl overflow-x-auto p-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${bar}`}
        >
          {links()}
        </div>
      </nav>
    </>
  );
}
