import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { contactEmail, demoMode, getCanonicalPath, getStoreProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Equipamentos de futebol",
  description: "Explore equipamentos e acessórios de futebol selecionados para jogadores amadores e partidas recreativas.",
  ...(getCanonicalPath("/futebol") ? { alternates: { canonical: getCanonicalPath("/futebol") } } : {}),
  openGraph: {
    title: "Equipamentos de futebol | F&V Sports Store",
    description: "Explore equipamentos e acessórios para sua próxima partida de futebol.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function FutebolPage() {
  return <Storefront products={getStoreProducts()} demoMode={demoMode} contactEmail={contactEmail} initialSport="futebol" />;
}