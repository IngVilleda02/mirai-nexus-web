"use client";

import { useEffect, useRef } from "react";

/**
 * Red de nodos conectados (concepto "Nexus").
 * - Animación lenta y discreta; se pausa fuera de pantalla y en pestañas ocultas.
 * - Con prefers-reduced-motion dibuja un único cuadro estático.
 * - Ajusta la densidad según el tamaño de pantalla para cuidar el rendimiento móvil.
 */
export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    type Node = { x: number; y: number; vx: number; vy: number; red: boolean };
    let nodes: Node[] = [];
    const LINK = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 16000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        red: i % 11 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.22;
            ctx.strokeStyle = a.red || b.red ? `rgba(227,23,43,${alpha * 1.6})` : `rgba(243,244,246,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.red ? "rgba(227,23,43,0.95)" : "rgba(243,244,246,0.55)";
        const s = n.red ? 3 : 2;
        ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    if (reduced) draw();
    else raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      const visible = e.isIntersecting && !document.hidden;
      if (visible && !running && !reduced) {
        running = true;
        raf = requestAnimationFrame(step);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
