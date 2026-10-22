export type Sport = "futebol" | "volei";
export type SportFilter = "todos" | Sport;
export type PriceOrder = "relevance" | "price-asc" | "price-desc";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Sport;
  subcategory: string;
  price: number | null;
  currency: "BRL";
  imageUrl: string | null;
  imageAlt: string;
  merchant: string;
  affiliateUrl: string | null;
  active: boolean;
  featured: boolean;
  priceUpdatedAt: string | null;
};

export type ProductFilters = {
  query: string;
  sport: SportFilter;
  subcategory: string;
  priceOrder: PriceOrder;
};

export const publishedProducts: readonly Product[] = [];
export const allowedProductImageHosts: readonly string[] = [];

export const demoProducts: readonly Product[] = [
  { id: "demo-futebol-chuteira", slug: "exemplo-chuteira", name: "Exemplo de chuteira", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Chuteiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-bola", slug: "exemplo-bola-futebol", name: "Exemplo de bola de futebol", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-caneleira", slug: "exemplo-caneleira", name: "Exemplo de caneleira", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Caneleiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-meiao", slug: "exemplo-meiao", name: "Exemplo de meião", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Meiões", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-bolsa", slug: "exemplo-bolsa-esportiva", name: "Exemplo de bolsa esportiva", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Bolsas esportivas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-bomba", slug: "exemplo-bomba-bola", name: "Exemplo de bomba para bola", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-futebol-treino", slug: "exemplo-cones-treino", name: "Exemplo de cones de treino", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "futebol", subcategory: "Treino e acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de futebol", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-volei-bola", slug: "exemplo-bola-volei", name: "Exemplo de bola de vôlei", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "volei", subcategory: "Bolas de vôlei", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de vôlei", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-volei-joelheira", slug: "exemplo-joelheira", name: "Exemplo de joelheira", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de vôlei", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-volei-tenis", slug: "exemplo-tenis-quadra", name: "Exemplo de tênis para quadra", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "volei", subcategory: "Tênis para quadra", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de vôlei", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-volei-acessorios", slug: "exemplo-manga-acessorios", name: "Exemplo de mangas e acessórios", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "volei", subcategory: "Mangas e acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de vôlei", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "demo-volei-equipamento", slug: "exemplo-bolsa-equipamento", name: "Exemplo de equipamento de treino", description: "Item ilustrativo. Cadastre um produto verificado para publicar.", category: "volei", subcategory: "Bolsas e treino", price: null, currency: "BRL", imageUrl: null, imageAlt: "Ilustração demonstrativa de vôlei", merchant: "", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
];

export function filterProducts(
  products: readonly Product[],
  filters: ProductFilters,
): Product[] {
  const query = normalizeSearchText(filters.query);
  const matches = products.filter((product) => {
    const matchesSport = filters.sport === "todos" || product.category === filters.sport;
    const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
    const searchableText = normalizeSearchText(`${product.name} ${product.description} ${product.subcategory}`);

    return matchesSport && matchesSubcategory && (!query || searchableText.includes(query));
  });

  if (filters.priceOrder === "relevance") return matches;

  return matches
    .map((product, index) => ({ product, index }))
    .sort((left, right) => {
      const leftPrice = isComparablePrice(left.product.price) ? left.product.price : null;
      const rightPrice = isComparablePrice(right.product.price) ? right.product.price : null;

      if (leftPrice === null && rightPrice === null) return left.index - right.index;
      if (leftPrice === null) return 1;
      if (rightPrice === null) return -1;

      const priceDifference = filters.priceOrder === "price-asc"
        ? leftPrice - rightPrice
        : rightPrice - leftPrice;

      return priceDifference || left.index - right.index;
    })
    .map(({ product }) => product);
}

export function isComparablePrice(price: number | null): price is number {
  return price !== null && Number.isFinite(price) && price > 0;
}

export function getProductImageUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    const hostAllowed = allowedProductImageHosts.some((host) => url.hostname.toLowerCase() === host.toLowerCase());
    return url.protocol === "https:" && !url.username && !url.password && hostAllowed ? value : null;
  } catch {
    return null;
  }
}

function normalizeSearchText(value: string): string {
  return value.trim().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR");
}