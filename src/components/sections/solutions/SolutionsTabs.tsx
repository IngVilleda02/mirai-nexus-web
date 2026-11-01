"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

interface SolutionsTabsProps {
  tabs: TabDef[];
  /**
   * Anclas del sitio que abren una pestaña concreta.
   * Ej.: { industrias: "servicios" } → el enlace #industrias abre Servicios y baja a Industrias.
   */
  aliases?: Record<string, string>;
  sectionId: string;
}

/**
 * Pestañas accesibles (patrón WAI-ARIA Tabs):
 * - Flechas ←/→, Inicio y Fin para moverse entre pestañas.
 * - Todos los paneles se renderizan en el HTML (bueno para SEO); los inactivos llevan `hidden`.
 * - Los enlaces del menú (#servicios, #proyectos, #proceso, #industrias) activan la pestaña correcta.
 */
export function SolutionsTabs({ tabs, aliases = {}, sectionId }: SolutionsTabsProps) {
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const openFromHash = useCallback(
    (hash: string) => {
      const key = hash.replace("#", "");
      const tabId = tabs.some((t) => t.id === key) ? key : aliases[key];
      if (!tabId) return false;
      setActive(tabId);
      // Esperar a que el panel se muestre antes de desplazarse.
      requestAnimationFrame(() => {
        const target = key === tabId ? document.getElementById(sectionId) : document.getElementById(key);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return true;
    },
    [tabs, aliases, sectionId],
  );

  useEffect(() => {
    const initial = window.location.hash;
    const raf = initial ? requestAnimationFrame(() => openFromHash(initial)) : 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (a && openFromHash(a.getAttribute("href") ?? "")) {
        e.preventDefault();
        history.replaceState(null, "", a.getAttribute("href"));
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
    };
  }, [openFromHash]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[tabs[next].id]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Soluciones"
        onKeyDown={onKeyDown}
        className="sticky top-16 z-30 mb-12 grid grid-cols-3 border border-line bg-ink-950/90 backdrop-blur-md md:top-20 md:mb-16"
      >
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              data-tab={t.id}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={`group relative flex min-h-16 flex-col items-start justify-center gap-1 px-2 py-3 text-left transition-colors sm:flex-row sm:items-center sm:gap-3 sm:px-6 ${
                i > 0 ? "border-l border-line" : ""
              } ${selected ? "bg-ink-900 text-paper" : "text-steel-500 hover:bg-ink-900/60 hover:text-paper"}`}
            >
              <span className={`font-mono text-[10px] tracking-[0.2em] ${selected ? "text-nexus-500" : "text-steel-700"}`}>
                /0{i + 1}
              </span>
              <span className="font-display text-sm font-medium leading-tight sm:text-base">{t.label}</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-nexus-500 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          data-panel={t.id}
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
