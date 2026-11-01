"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Indica si en este momento estamos dentro del horario de atención (hora del centro de México). */
function isOpenNow(date = new Date()) {
  const { timeZone, days, open, close } = site.hours;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "numeric", hour12: false }).formatToParts(date);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  return (days as readonly number[]).includes(day) && hour >= open && hour < close;
}

export function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    const first = setTimeout(update, 0);
    const id = setInterval(update, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (open === null) return null;
  return (
    <span
      data-open-status
      className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
        open ? "border-nexus-500/40 text-paper" : "border-line-strong text-steel-500"
      }`}
    >
      <span className={`relative h-1.5 w-1.5 rounded-full ${open ? "bg-nexus-500" : "bg-steel-700"}`} aria-hidden>
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-nexus-500 motion-reduce:animate-none" />}
      </span>
      {open ? "Abierto ahora" : "Fuera de horario"}
    </span>
  );
}
