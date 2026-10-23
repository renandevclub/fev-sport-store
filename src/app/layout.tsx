import type { Metadata, Viewport } from "next";
import { catalogIsEmpty, getSiteUrl } from "@/lib/store-data";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "F&V Sports Store | Equipamento para quem joga",
    template: "%s | F&V Sports Store",
  },
  description: "Equipamentos e acessórios para futebol e vôlei. Uma seleção independente para acompanhar sua próxima partida.",
  applicationName: "F&V Sports Store",
  ...(catalogIsEmpty ? { robots: { index: false, follow: false } } : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "F&V Sports Store",
    title: "F&V Sports Store | Equipamento para quem joga",
    description: "Equipamentos e acessórios para futebol e vôlei.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171b19",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}