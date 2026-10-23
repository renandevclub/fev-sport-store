import assert from "node:assert/strict";
import test from "node:test";
import { publishedProducts } from "./products.ts";
import {
  createAdminSessionToken,
  isAdminAuthConfigured,
  isSameOriginRequest,
  verifyAdminPassword,
  verifyAdminSession,
} from "./admin/auth.ts";
import {
  createInitialCatalog,
  createLocalCatalogRepository,
  catalogStorageKey,
  deleteCategory,
  deleteProduct,
  filterCatalog,
  isValidAffiliateUrl,
  isValidImageUrl,
  type KeyValueStorage,
  upsertCategory,
  upsertProduct,
} from "./admin/catalog.ts";

class MemoryStorage implements KeyValueStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

const catalog = createInitialCatalog(publishedProducts, "2026-10-22T00:00:00.000Z");

test("seeda somente produtos catalogados e cria categorias deduplicadas", () => {
  assert.equal(catalog.products.length, publishedProducts.length);
  assert.ok(catalog.products.every((product) => product.platformId === "amazon"));
  assert.equal(new Set(catalog.categories.map((category) => category.name)).size, catalog.categories.length);
});

test("persiste e recupera snapshot local versionado", () => {
  const storage = new MemoryStorage();
  const repository = createLocalCatalogRepository(storage);
  repository.save(catalog);
  assert.deepEqual(repository.load({ version: 1, products: [], categories: [] }), catalog);
});

test("cria, edita e exclui produtos com datas e filtros", () => {
  const category = catalog.categories[0];
  const productDraft = {
    name: "Produto cadastrado pelo administrador",
    description: "Descrição editável",
    price: 125.5,
    currency: "BRL" as const,
    imageUrls: ["https://images.example.org/item.webp"],
    categoryId: category.id,
    platformId: "amazon" as const,
    affiliateUrl: "https://www.amazon.com.br/dp/B0CLZHRQK8?tag=sportstore0e7-20",
  };
  const created = upsertProduct(catalog, productDraft, "admin-added", "2026-10-22T10:00:00.000Z");
  const edited = upsertProduct(created, { ...productDraft, name: "Produto editado", price: 99 }, "admin-added", "2026-10-22T11:00:00.000Z");

  assert.equal(filterCatalog(edited, "EDITADO", category.id, "amazon")[0]?.price, 99);
  assert.equal(edited.products.find((product) => product.id === "admin-added")?.createdAt, "2026-10-22T10:00:00.000Z");
  assert.equal(deleteProduct(edited, "admin-added").products.length, catalog.products.length);
});

test("não permite apagar categoria que ainda tenha produtos", () => {
  assert.throws(() => deleteCategory(catalog, catalog.categories[0].id), /Reatribua os produtos/);
});

test("cria, renomeia e remove categoria sem produtos", () => {
  const created = upsertCategory(catalog, "Calçados de quadra", undefined, "2026-10-22T10:00:00.000Z");
  const category = created.categories.find((item) => item.name === "Calçados de quadra");
  assert.ok(category);
  const renamed = upsertCategory(created, "Tênis de quadra", category.id, "2026-10-22T11:00:00.000Z");
  assert.ok(renamed.categories.some((item) => item.id === category.id && item.name === "Tênis de quadra"));
  assert.equal(deleteCategory(renamed, category.id).categories.length, catalog.categories.length);
});

test("valida domínios de plataforma e URLs de imagem", () => {
  assert.equal(isValidAffiliateUrl("https://s.shopee.com.br/item/abc", "shopee"), true);
  assert.equal(isValidAffiliateUrl("https://evil.example/item", "shopee"), false);
  assert.equal(isValidAffiliateUrl("http://www.amazon.com.br/dp/B0CLZHRQK8", "amazon"), false);
  assert.equal(isValidAffiliateUrl("https://produto.mercadolivre.com.br/MLB-123", "mercado-livre"), true);
  assert.equal(isValidImageUrl("https://images.example.org/item.webp"), true);
  assert.equal(isValidImageUrl("javascript:alert(1)"), false);
});

test("protege a sessão com senha, assinatura, expiração e configuração obrigatória", () => {
  const previousPassword = process.env.ADMIN_PASSWORD;
  const previousSecret = process.env.ADMIN_SESSION_SECRET;
  const now = Date.parse("2026-10-22T12:00:00.000Z");

  try {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
    assert.equal(isAdminAuthConfigured(), false);
    assert.equal(verifyAdminPassword("anything"), false);
    assert.equal(verifyAdminSession("123.invalid"), false);

    process.env.ADMIN_PASSWORD = "short";
    process.env.ADMIN_SESSION_SECRET = "short-secret";
    assert.equal(isAdminAuthConfigured(), false);

    process.env.ADMIN_PASSWORD = "test-only-password";
    process.env.ADMIN_SESSION_SECRET = "test-only-signing-secret-with-at-least-thirty-two-bytes";
    const token = createAdminSessionToken(now);
    assert.equal(isAdminAuthConfigured(), true);
    assert.equal(verifyAdminPassword("test-only-password"), true);
    assert.equal(verifyAdminPassword("wrong-password"), false);
    assert.equal(verifyAdminSession(token, now + 1_000), true);
    assert.equal(verifyAdminSession(token, now + 9 * 60 * 60 * 1_000), false);
    assert.equal(verifyAdminSession(`${token}tampered`, now), false);
  } finally {
    if (previousPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = previousPassword;
    if (previousSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = previousSecret;
  }
});

test("aceita apenas requisições same-origin para as rotas administrativas", () => {
  const sameOrigin = new Request("https://loja.example/admin", {
    method: "POST",
    headers: { origin: "https://loja.example", host: "loja.example" },
  });
  const crossOrigin = new Request("https://loja.example/admin", {
    method: "POST",
    headers: { origin: "https://untrusted.example", host: "loja.example" },
  });
  assert.equal(isSameOriginRequest(sameOrigin), true);
  assert.equal(isSameOriginRequest(crossOrigin), false);
});

test("rejeita snapshot local inválido sem substituí-lo", () => {
  const storage = new MemoryStorage();
  const repository = createLocalCatalogRepository(storage);
  const corrupt = JSON.stringify({ version: 1, categories: [], products: [{ id: "x", categoryId: "missing", platformId: "amazon", affiliateUrl: "javascript:alert(1)" }] });
  storage.setItem(catalogStorageKey, corrupt);
  assert.throws(() => repository.load(catalog), /catálogo local está inválido/);
  assert.equal(storage.getItem(catalogStorageKey), corrupt);
});