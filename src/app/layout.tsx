import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/content/site";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Desarrollo web y soluciones digitales para la industria`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Conectamos la industria con el futuro`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Conectamos la industria con el futuro`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#060709",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
