import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { contactEmail, getCanonicalPath, getStoreProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Itens para jogar futebol",
  description: "Encontre bolas, chuteiras, luvas de goleiro, itens de treino e camisas de torcida identificados em uma seleção de produtos para futebol.",
  ...(getCanonicalPath("/futebol") ? { alternates: { canonical: getCanonicalPath("/futebol") } } : {}),
  openGraph: {
    title: "Itens para jogar futebol | F&V Sports Store",
    description: "Bolas, chuteiras, luvas de goleiro, itens de treino e camisas de torcida para futebol.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function FutebolPage() {
  return <Storefront products={getStoreProducts()} contactEmail={contactEmail} initialSport="futebol" />;
}