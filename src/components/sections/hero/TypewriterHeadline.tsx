"use client";

import { useEffect, useState } from "react";

interface TypewriterHeadlineProps {
  /** Frases en ciclo. Terminar cada una con "." para que el punto rojo de marca aparezca. */
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Tiempo que la frase completa permanece visible (ms). */
  hold?: number;
}

/**
 * Título con efecto de máquina de escribir.
 * - Se renderiza con la primera frase completa (SEO, sin JS y capturas se ven bien).
 * - Los lectores de pantalla leen solo la primera frase (sin el tecleo).
 * - Con prefers-reduced-motion cambia de frase sin animar letra por letra.
 * - Una capa invisible con la frase más larga reserva el espacio y evita saltos de diseño.
 */
export function TypewriterHeadline({
  phrases,
  className = "",
  typeSpeed = 55,
  deleteSpeed = 28,
  hold = 2800,
}: TypewriterHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout>;

    if (reduced) {
      t = setTimeout(() => {
        const next = (index + 1) % phrases.length;
        setIndex(next);
        setText(phrases[next]);
      }, hold + 1500);
      return () => clearTimeout(t);
    }

    const current = phrases[index];
    if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), hold);
    } else if (phase === "deleting") {
      if (text.length === 0) {
        t = setTimeout(() => {
          setIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, 200);
      } else {
        t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      }
    } else {
      if (text === current) {
        t = setTimeout(() => setPhase("hold"), 0);
      } else {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      }
    }
    return () => clearTimeout(t);
  }, [phase, text, index, phrases, hold, typeSpeed, deleteSpeed]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const body = text.endsWith(".") ? text.slice(0, -1) : text;
  const dot = text.endsWith(".");

  return (
    <h1 className={className} style={{ ["--d" as string]: "90ms" }} data-typewriter={JSON.stringify(phrases)}>
      <span className="sr-only">{phrases[0]}</span>
      <span className="grid" aria-hidden>
        <span className="invisible col-start-1 row-start-1">{longest}</span>
        <span className="col-start-1 row-start-1">
          <span data-tw-text>{body}</span>
          <span data-tw-dot className={`text-nexus-500 ${dot ? "" : "hidden"}`}>.</span>
          <span
            className="tw-caret ml-1 inline-block h-[0.82em] w-[0.08em] translate-y-[0.06em] bg-nexus-500 align-baseline"
            aria-hidden
          />
        </span>
      </span>
    </h1>
  );
}
