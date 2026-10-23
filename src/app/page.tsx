import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { contactEmail, getCanonicalPath, getStoreProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Equipamento para quem joga",
  description: "Encontre equipamentos e acessórios para sua próxima partida de futebol ou vôlei.",
  ...(getCanonicalPath("/") ? { alternates: { canonical: getCanonicalPath("/") } } : {}),
};

export default function HomePage() {
  return <Storefront products={getStoreProducts()} contactEmail={contactEmail} />;
}