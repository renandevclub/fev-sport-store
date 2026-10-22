import assert from "node:assert/strict";
import test from "node:test";
import { createAmazonAffiliateUrl, validateAffiliateUrl } from "./affiliate.ts";
import { filterProducts, getProductImageUrl, publishedProducts, type Product, type ProductFilters } from "./products.ts";

const products: Product[] = [
  { id: "ball", slug: "bola", name: "Bola de futebol", description: "Bola para campo", category: "futebol", subcategory: "Bolas", price: 120, currency: "BRL", imageUrl: null, imageAlt: "", merchant: "Loja", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "shoe", slug: "tenis", name: "Tênis de quadra", description: "Calçado para vôlei", category: "volei", subcategory: "Tênis para quadra", price: 250, currency: "BRL", imageUrl: null, imageAlt: "", merchant: "Loja", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
  { id: "knee", slug: "joelheira", name: "Joelheira", description: "Proteção esportiva", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "", merchant: "Loja", affiliateUrl: null, active: true, featured: false, priceUpdatedAt: null },
];

const defaults: ProductFilters = { query: "", sport: "todos", subcategory: "", brand: "", priceOrder: "relevance" };

test("combina pesquisa, modalidade e categoria", () => {
  const result = filterProducts(products, { ...defaults, query: "TENIS", sport: "volei", subcategory: "Tênis para quadra" });
  assert.deepEqual(result.map((product) => product.id), ["shoe"]);
});

test("pesquisa e filtra pela marca", () => {
  const productsWithBrands = products.map((product) => ({ ...product, brand: product.id === "shoe" ? "Mikasa" : null }));
  const result = filterProducts(productsWithBrands, { ...defaults, query: "mIkAsA", brand: "Mikasa" });
  assert.deepEqual(result.map((product) => product.id), ["shoe"]);
});

test("ordena alfabeticamente", () => {
  const result = filterProducts(products, { ...defaults, priceOrder: "name-asc" });
  assert.deepEqual(result.map((product) => product.id), ["ball", "knee", "shoe"]);
});

test("ordena preços válidos e deixa produtos sem preço ao final", () => {
  const ascending = filterProducts(products, { ...defaults, priceOrder: "price-asc" });
  const descending = filterProducts(products, { ...defaults, priceOrder: "price-desc" });
  assert.deepEqual(ascending.map((product) => product.id), ["ball", "shoe", "knee"]);
  assert.deepEqual(descending.map((product) => product.id), ["shoe", "ball", "knee"]);
});

test("aceita somente HTTPS no host exato permitido e preserva o rastreamento", () => {
  const hosts = ["loja.exemplo.br"];
  const url = "https://loja.exemplo.br/oferta?ref=abc%2F123";
  assert.equal(validateAffiliateUrl(url, hosts), url);
  assert.equal(validateAffiliateUrl("http://loja.exemplo.br/oferta", hosts), null);
  assert.equal(validateAffiliateUrl("https://sub.loja.exemplo.br/oferta", hosts), null);
  assert.equal(validateAffiliateUrl("https://loja.exemplo.br.evil.test", hosts), null);
  assert.equal(validateAffiliateUrl("javascript:alert(1)", hosts), null);
  assert.equal(validateAffiliateUrl("https://user@loja.exemplo.br/oferta", hosts), null);
});

test("aceita imagem local e rejeita origem remota não autorizada", () => {
  assert.equal(getProductImageUrl("/products/bola.webp"), "/products/bola.webp");
  assert.equal(getProductImageUrl("//evil.test/bola.webp"), null);
  assert.equal(getProductImageUrl("https://images.exemplo.br/bola.webp"), null);
});

test("gera URL de produto Amazon apenas com tag válida e ASIN identificado", () => {
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", "fvstore-20"), "https://www.amazon.com.br/dp/B0CLZHRQK8?tag=fvstore-20");
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", undefined), null);
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", "tag-invalida"), null);
  assert.equal(createAmazonAffiliateUrl("https://evil.test/dp/B0CLZHRQK8", "fvstore-20"), null);
});

test("catálogo consultado mantém contagem, ids e ASINs únicos e destinos válidos", () => {
  assert.equal(publishedProducts.length, 30);
  assert.equal(new Set(publishedProducts.map((product) => product.id)).size, publishedProducts.length);
  assert.equal(new Set(publishedProducts.map((product) => product.amazonUrl)).size, publishedProducts.length);
  assert.ok(publishedProducts.every((product) => createAmazonAffiliateUrl(product.amazonUrl ?? null, "fvstore-20") !== null));
});