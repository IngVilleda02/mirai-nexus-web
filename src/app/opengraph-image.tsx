import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen Open Graph generada automáticamente (vista previa en WhatsApp, LinkedIn, etc.). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#060709",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#f3f4f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 18, height: 18, background: "#e3172b" }} />
          <div style={{ fontSize: 30, letterSpacing: 10, fontWeight: 600 }}>MIRAI NEXUS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            Conectamos la industria con el futuro.
          </div>
          <div style={{ marginTop: 32, fontSize: 24, color: "#7d8590", letterSpacing: 6 }}>CONNECTING TO THE FUTURE</div>
        </div>
        <div style={{ height: 4, width: 160, background: "#e3172b" }} />
      </div>
    ),
    size,
  );
}
