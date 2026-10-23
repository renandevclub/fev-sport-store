import type { Product } from "@/lib/products";

export const catalogStorageKey = "fv-admin.catalog.v1";

export const marketplaces = [
  { id: "amazon", label: "Amazon", hosts: ["www.amazon.com.br", "amzn.to"] },
  { id: "shopee", label: "Shopee", hosts: ["shopee.com.br", "www.shopee.com.br", "s.shopee.com.br"] },
  { id: "mercado-livre", label: "Mercado Livre", hosts: ["mercadolivre.com.br", "www.mercadolivre.com.br", "produto.mercadolivre.com.br"] },
] as const;

export type MarketplaceId = (typeof marketplaces)[number]["id"];

export type AdminCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  currency: "BRL";
  imageUrls: string[];
  categoryId: string;
  platformId: MarketplaceId;
  affiliateUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type CatalogSnapshot = {
  version: 1;
  products: AdminProduct[];
  categories: AdminCategory[];
};

export type ProductDraft = Omit<AdminProduct, "id" | "createdAt" | "updatedAt">;

export interface CatalogRepository {
  load(initial: CatalogSnapshot): CatalogSnapshot;
  save(snapshot: CatalogSnapshot): void;
}

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function createLocalCatalogRepository(storage: KeyValueStorage): CatalogRepository {
  return {
    load(initial) {
      const stored = storage.getItem(catalogStorageKey);
      if (stored === null) return initial;

      const parsed: unknown = JSON.parse(stored);
      if (!isCatalogSnapshot(parsed)) throw new Error("O catálogo local está inválido. Exporte os dados antes de limpar o armazenamento.");
      return parsed;
    },
    save(snapshot) {
      storage.setItem(catalogStorageKey, JSON.stringify(snapshot));
    },
  };
}

export function createInitialCatalog(products: readonly Product[], now = new Date().toISOString()): CatalogSnapshot {
  const categoryByName = new Map<string, AdminCategory>();

  for (const product of products) {
    if (categoryByName.has(product.subcategory)) continue;
    const id = createCategoryId(product.subcategory, categoryByName);
    categoryByName.set(product.subcategory, { id, name: product.subcategory, createdAt: now, updatedAt: now });
  }

  const categories = [...categoryByName.values()];
  const categoryIdByName = new Map(categories.map((category) => [category.name, category.id]));

  return {
    version: 1,
    categories,
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      currency: "BRL",
      imageUrls: product.imageUrl ? [product.imageUrl] : [],
      categoryId: categoryIdByName.get(product.subcategory) ?? "",
      platformId: "amazon",
      affiliateUrl: product.affiliateUrl ?? "",
      createdAt: now,
      updatedAt: now,
    })),
  };
}

export function validateProductDraft(draft: ProductDraft, categories: readonly AdminCategory[]): string | null {
  if (!draft.name.trim()) return "Informe o nome do produto.";
  if (!draft.description.trim()) return "Informe a descrição do produto.";
  if (!categories.some((category) => category.id === draft.categoryId)) return "Selecione uma categoria válida.";
  if (!marketplaces.some((marketplace) => marketplace.id === draft.platformId)) return "Selecione uma plataforma válida.";
  if (draft.price !== null && (!Number.isFinite(draft.price) || draft.price < 0)) return "Informe um preço válido em reais.";
  if (draft.affiliateUrl && !isValidAffiliateUrl(draft.affiliateUrl, draft.platformId)) return "O link não corresponde à plataforma selecionada ou não usa HTTPS.";
  if (draft.imageUrls.some((imageUrl) => !isValidImageUrl(imageUrl))) return "Use URLs HTTPS ou caminhos locais válidos para as imagens.";
  return null;
}

export function upsertProduct(snapshot: CatalogSnapshot, draft: ProductDraft, id: string, now = new Date().toISOString()): CatalogSnapshot {
  const error = validateProductDraft(draft, snapshot.categories);
  if (error) throw new Error(error);

  const existing = snapshot.products.find((product) => product.id === id);
  const product: AdminProduct = {
    ...draft,
    id,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  return {
    ...snapshot,
    products: existing
      ? snapshot.products.map((item) => item.id === id ? product : item)
      : [product, ...snapshot.products],
  };
}

export function deleteProduct(snapshot: CatalogSnapshot, id: string): CatalogSnapshot {
  return { ...snapshot, products: snapshot.products.filter((product) => product.id !== id) };
}

export function upsertCategory(snapshot: CatalogSnapshot, name: string, id?: string, now = new Date().toISOString()): CatalogSnapshot {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Informe o nome da categoria.");
  if (snapshot.categories.some((category) => category.id !== id && category.name.toLocaleLowerCase("pt-BR") === trimmedName.toLocaleLowerCase("pt-BR"))) {
    throw new Error("Já existe uma categoria com esse nome.");
  }

  const existing = snapshot.categories.find((category) => category.id === id);
  const category: AdminCategory = {
    id: existing?.id ?? createCategoryId(trimmedName, new Map(snapshot.categories.map((item) => [item.id, item]))),
    name: trimmedName,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  return {
    ...snapshot,
    categories: existing
      ? snapshot.categories.map((item) => item.id === existing.id ? category : item)
      : [...snapshot.categories, category],
  };
}

export function deleteCategory(snapshot: CatalogSnapshot, id: string): CatalogSnapshot {
  if (snapshot.products.some((product) => product.categoryId === id)) {
    throw new Error("Reatribua os produtos antes de excluir esta categoria.");
  }
  return { ...snapshot, categories: snapshot.categories.filter((category) => category.id !== id) };
}

export function filterCatalog(snapshot: CatalogSnapshot, query: string, categoryId: string, platformId: MarketplaceId | ""): AdminProduct[] {
  const normalizedQuery = query.trim().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR");
  return snapshot.products.filter((product) => {
    const matchesQuery = !normalizedQuery || `${product.name} ${product.description}`
      .normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR").includes(normalizedQuery);
    return matchesQuery
      && (!categoryId || product.categoryId === categoryId)
      && (!platformId || product.platformId === platformId);
  });
}

export function isValidAffiliateUrl(value: string, platformId: MarketplaceId): boolean {
  try {
    const url = new URL(value);
    const marketplace = marketplaces.find((item) => item.id === platformId);
    return url.protocol === "https:"
      && !url.username
      && !url.password
      && Boolean(marketplace?.hosts.some((host) => host === url.hostname.toLowerCase()));
  } catch {
    return false;
  }
}

export function isValidImageUrl(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function createCategoryId(name: string, existing: ReadonlyMap<string, AdminCategory> = new Map()): string {
  const base = name.trim().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "categoria";
  let id = base;
  let suffix = 2;
  while ([...existing.values()].some((category) => category.id === id)) id = `${base}-${suffix++}`;
  return id;
}

function isCatalogSnapshot(value: unknown): value is CatalogSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<CatalogSnapshot>;
  if (candidate.version !== 1 || !Array.isArray(candidate.products) || !Array.isArray(candidate.categories)) return false;
  if (!candidate.categories.every(isAdminCategory)) return false;

  const categoryIds = new Set(candidate.categories.map((category) => category.id));
  if (categoryIds.size !== candidate.categories.length) return false;
  const productIds = new Set<string>();
  for (const product of candidate.products) {
    if (!isAdminProduct(product, categoryIds) || productIds.has(product.id)) return false;
    productIds.add(product.id);
  }
  return true;
}

function isAdminCategory(value: unknown): value is AdminCategory {
  if (typeof value !== "object" || value === null) return false;
  const category = value as Partial<AdminCategory>;
  return typeof category.id === "string"
    && Boolean(category.id)
    && typeof category.name === "string"
    && Boolean(category.name.trim())
    && typeof category.createdAt === "string"
    && typeof category.updatedAt === "string";
}

function isAdminProduct(value: unknown, categoryIds: ReadonlySet<string>): value is AdminProduct {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Partial<AdminProduct>;
  const platform = marketplaces.find((item) => item.id === product.platformId);
  return typeof product.id === "string"
    && Boolean(product.id)
    && typeof product.name === "string"
    && typeof product.description === "string"
    && (product.price === null || (typeof product.price === "number" && Number.isFinite(product.price) && product.price >= 0))
    && product.currency === "BRL"
    && Array.isArray(product.imageUrls)
    && product.imageUrls.every((url) => typeof url === "string" && isValidImageUrl(url))
    && typeof product.categoryId === "string"
    && categoryIds.has(product.categoryId)
    && Boolean(platform)
    && typeof product.affiliateUrl === "string"
    && (!product.affiliateUrl || isValidAffiliateUrl(product.affiliateUrl, product.platformId as MarketplaceId))
    && typeof product.createdAt === "string"
    && typeof product.updatedAt === "string";
}