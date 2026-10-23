import assert from "node:assert/strict";
import test from "node:test";
import { createAmazonAffiliateUrl, validateAffiliateUrl } from "./affiliate.ts";
import { filterProducts, getProductImageUrl, isComparablePrice, publishedProducts, type ProductFilters } from "./products.ts";

const defaults: ProductFilters = { query: "", sport: "todos", subcategory: "", brand: "", footballType: "", priceOrder: "relevance" };

test("combina pesquisa, modalidade e categoria", () => {
  const result = filterProducts(publishedProducts, { ...defaults, query: "MIKASA", sport: "volei", subcategory: "Bolas" });
  assert.deepEqual(result.map((product) => product.id), ["volei-mikasa-bv552c", "volei-mikasa-v360w"]);
});

test("pesquisa e filtra pela marca", () => {
  const result = filterProducts(publishedProducts, { ...defaults, query: "mIkAsA", brand: "Mikasa" });
  assert.deepEqual(result.map((product) => product.id), ["volei-mikasa-bv552c", "volei-mikasa-v360w"]);
});

test("ordena alfabeticamente", () => {
  const result = filterProducts(publishedProducts, { ...defaults, priceOrder: "name-asc" });
  const expected = [...publishedProducts].sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));
  assert.deepEqual(result.map((product) => product.id), expected.map((product) => product.id));
});

test("lista futebol na ordem observada e filtra modalidade confirmada", () => {
  const soccerProducts = filterProducts(publishedProducts, { ...defaults, sport: "futebol" });
  const fieldProducts = filterProducts(publishedProducts, { ...defaults, sport: "futebol", footballType: "campo" });
  assert.equal(soccerProducts.length, 29);
  assert.deepEqual(soccerProducts.slice(0, 4).map((product) => product.id), [
    "futebol-camisa-brasil-feminina-copa",
    "futebol-camiseta-brasil-patriota",
    "volei-vollo-bomba-hp001-2",
    "volei-penalty-bomba-sac",
  ]);
  assert.ok(fieldProducts.length > 0);
  assert.ok(fieldProducts.every((product) => product.footballTypes?.includes("campo")));
});

test("não duplica ids ou destinos Amazon no catálogo compartilhado", () => {
  assert.equal(new Set(publishedProducts.map((product) => product.id)).size, publishedProducts.length);
  assert.equal(new Set(publishedProducts.map((product) => product.amazonUrl)).size, publishedProducts.length);
});

test("não inventa uma ordem de preço quando o catálogo não tem preços verificados", () => {
  const ascending = filterProducts(publishedProducts, { ...defaults, priceOrder: "price-asc" });
  const descending = filterProducts(publishedProducts, { ...defaults, priceOrder: "price-desc" });
  const sourceIds = publishedProducts.map((product) => product.id);
  assert.ok(publishedProducts.every((product) => product.price === null));
  assert.equal(isComparablePrice(null), false);
  assert.deepEqual(ascending.map((product) => product.id), sourceIds);
  assert.deepEqual(descending.map((product) => product.id), sourceIds);
});

test("aceita somente HTTPS no host exato permitido e preserva o rastreamento", () => {
  const hosts = ["www.amazon.com.br"];
  const url = "https://www.amazon.com.br/dp/B0CLZHRQK8?tag=sportstore0e7-20";
  assert.equal(validateAffiliateUrl(url, hosts), url);
  assert.equal(validateAffiliateUrl("http://www.amazon.com.br/dp/B0CLZHRQK8", hosts), null);
  assert.equal(validateAffiliateUrl("https://amazon.com.br/dp/B0CLZHRQK8", hosts), null);
  assert.equal(validateAffiliateUrl("https://www.amazon.com.br.evil.test/dp/B0CLZHRQK8", hosts), null);
  assert.equal(validateAffiliateUrl("javascript:alert(1)", hosts), null);
  assert.equal(validateAffiliateUrl("https://user@www.amazon.com.br/dp/B0CLZHRQK8", hosts), null);
});

test("aceita imagem local e rejeita origem remota não autorizada", () => {
  assert.equal(getProductImageUrl("/products/bola.webp"), "/products/bola.webp");
  assert.equal(getProductImageUrl("//evil.test/bola.webp"), null);
  assert.equal(getProductImageUrl("https://www.amazon.com.br/dp/B0CLZHRQK8"), null);
});

test("gera URL de produto Amazon apenas com tag válida e ASIN identificado", () => {
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", "sportstore0e7-20"), "https://www.amazon.com.br/dp/B0CLZHRQK8?tag=sportstore0e7-20");
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", undefined), null);
  assert.equal(createAmazonAffiliateUrl("https://www.amazon.com.br/dp/B0CLZHRQK8", "tag-invalida"), null);
  assert.equal(createAmazonAffiliateUrl("https://evil.test/dp/B0CLZHRQK8", "fvstore-20"), null);
});

test("catálogo combinado mantém contagem total e destinos Amazon válidos", () => {
  assert.equal(publishedProducts.length, 57);
  assert.equal(new Set(publishedProducts.map((product) => product.id)).size, publishedProducts.length);
  assert.equal(new Set(publishedProducts.map((product) => product.amazonUrl)).size, publishedProducts.length);
  assert.ok(publishedProducts.every((product) => createAmazonAffiliateUrl(product.amazonUrl ?? null, "sportstore0e7-20") !== null));
});