import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { contactEmail, getCanonicalPath, getStoreProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Equipamentos de vôlei",
  description: "Explore bolas, joelheiras, tênis e acessórios de vôlei para treinos e partidas recreativas.",
  ...(getCanonicalPath("/volei") ? { alternates: { canonical: getCanonicalPath("/volei") } } : {}),
  openGraph: {
    title: "Equipamentos de vôlei | F&V Sports Store",
    description: "Explore equipamentos e acessórios para sua próxima partida de vôlei.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function VoleiPage() {
  return <Storefront products={getStoreProducts()} contactEmail={contactEmail} initialSport="volei" />;
}