import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = "https://qevnybymbdywiyoaubas.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldm55YnltYmR5d2l5b2F1YmFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5Mjc1NjM1NiwiZXhwIjoyMTA4MzMyMzU2fQ.57-XGucKcPwLotkgWZbgM2_GCYW48j0-6kgMyVzJ2Ns";

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function main() {
  console.log("Iniciando carga do catálogo no Supabase...");

  // 1. Fetch categories to map category_slug -> category_id
  const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=id,slug`, { headers });
  if (!catRes.ok) {
    throw new Error(`Falha ao buscar categorias: ${await catRes.text()}`);
  }
  const categories = await catRes.json();
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  // 2. Read migration seed JSON
  const migrationPath = path.resolve("supabase/migrations/20261023135957_seed_verified_catalog_drafts.sql");
  const sql = fs.readFileSync(migrationPath, "utf-8");
  const start = sql.indexOf('[{"external_id"');
  const end = sql.indexOf("}]", start) + 2;
  const rawJson = sql.substring(start, end);
  const seedItems = JSON.parse(rawJson);

  console.log(`Carregando ${seedItems.length} produtos da migração...`);

  let insertedCount = 0;
  let sportsCount = 0;
  let rankingsCount = 0;

  for (const item of seedItems) {
    const categoryId = categoryIdBySlug.get(item.category_slug);
    if (!categoryId) {
      console.warn(`Categoria não encontrada para slug: ${item.category_slug}`);
      continue;
    }

    // Check if product already exists
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?external_id=eq.${encodeURIComponent(item.external_id)}&select=id`,
      { headers }
    );
    const existing = await checkRes.json();
    let productId;

    if (existing && existing.length > 0) {
      productId = existing[0].id;
    } else {
      const productPayload = {
        external_id: item.external_id,
        slug: item.slug,
        name: item.name,
        description: item.description || "",
        brand: item.brand || null,
        model: item.model || null,
        category_id: categoryId,
        platform_id: "amazon",
        source_url: item.source_url || null,
        price: null,
        currency: "BRL",
        status: "draft",
        attributes: item.attributes || [],
        football_types: item.football_types || [],
        source_name: item.source_name || null,
        source_checked_at: item.source_checked_at || null,
      };

      const prodRes = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: "POST",
        headers,
        body: JSON.stringify(productPayload),
      });

      if (!prodRes.ok) {
        console.error(`Erro ao inserir produto ${item.external_id}:`, await prodRes.text());
        continue;
      }

      const [created] = await prodRes.json();
      productId = created.id;
      insertedCount++;
    }

    // Insert product_sports
    if (Array.isArray(item.sports) && item.sports.length > 0) {
      for (const sportId of item.sports) {
        const sportPayload = { product_id: productId, sport_id: sportId };
        const sportRes = await fetch(`${SUPABASE_URL}/rest/v1/product_sports`, {
          method: "POST",
          headers: { ...headers, Prefer: "resolution=ignore-duplicates" },
          body: JSON.stringify(sportPayload),
        });
        if (sportRes.ok) sportsCount++;
      }
    }

    // Insert product_rankings
    if (item.source_rank_by_sport && typeof item.source_rank_by_sport === "object") {
      for (const [sportId, rankValue] of Object.entries(item.source_rank_by_sport)) {
        const rankingPayload = {
          product_id: productId,
          sport_id: sportId,
          source_name: item.source_name || "Amazon Brasil bestseller reference",
          rank: Number(rankValue),
          observed_at: item.source_checked_at || new Date().toISOString().split("T")[0],
        };
        const rankRes = await fetch(`${SUPABASE_URL}/rest/v1/product_rankings`, {
          method: "POST",
          headers: { ...headers, Prefer: "resolution=ignore-duplicates" },
          body: JSON.stringify(rankingPayload),
        });
        if (rankRes.ok) rankingsCount++;
      }
    }
  }

  console.log(`Sucesso: ${insertedCount} novos produtos inseridos.`);
  console.log(`Esportes vinculados: ${sportsCount}`);
  console.log(`Rankings inseridos: ${rankingsCount}`);
}

main().catch((err) => {
  console.error("Erro fatal na carga:", err);
  process.exit(1);
});
