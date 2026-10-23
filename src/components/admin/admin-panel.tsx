"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createLocalCatalogRepository,
  deleteCategory,
  deleteProduct,
  filterCatalog,
  marketplaces,
  upsertCategory,
  upsertProduct,
  type AdminCategory,
  type AdminProduct,
  type CatalogRepository,
  type CatalogSnapshot,
  type MarketplaceId,
  type ProductDraft,
} from "@/lib/admin/catalog";

type AdminPanelProps = { initialCatalog: CatalogSnapshot };
type Notice = { tone: "success" | "error"; text: string };

function toDraft(product: AdminProduct): ProductDraft {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    imageUrls: [...product.imageUrls],
    categoryId: product.categoryId,
    platformId: product.platformId,
    affiliateUrl: product.affiliateUrl,
  };
}

function emptyDraft(categoryId: string): ProductDraft {
  return {
    name: "",
    description: "",
    price: null,
    currency: "BRL",
    imageUrls: [],
    categoryId,
    platformId: "amazon",
    affiliateUrl: "",
  };
}

function formatPrice(price: number | null): string {
  if (price === null) return "Sem preço";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
}

export function AdminPanel({ initialCatalog }: AdminPanelProps) {
  const router = useRouter();
  const repository = useRef<CatalogRepository | null>(null);
  const [snapshot, setSnapshot] = useState(initialCatalog);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [view, setView] = useState<"products" | "categories">("products");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState<MarketplaceId | "">("");
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<ProductDraft | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    try {
      repository.current = createLocalCatalogRepository(window.localStorage);
      setSnapshot(repository.current.load(initialCatalog));
      setStorageError("");
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Não foi possível ler o catálogo local.");
    }
    setReady(true);
  }, [initialCatalog]);

  const visibleProducts = useMemo(
    () => filterCatalog(snapshot, query, categoryFilter, platformFilter),
    [snapshot, query, categoryFilter, platformFilter],
  );
  const selectedProduct = snapshot.products.find((product) => product.id === selectedId) ?? null;

  function commit(next: CatalogSnapshot, successMessage: string): boolean {
    if (!repository.current || storageError) {
      setNotice({ tone: "error", text: storageError || "Armazenamento local indisponível." });
      return false;
    }
    try {
      repository.current.save(next);
      setSnapshot(next);
      setNotice({ tone: "success", text: successMessage });
      return true;
    } catch {
      setNotice({ tone: "error", text: "Não foi possível salvar. O armazenamento local pode estar cheio." });
      return false;
    }
  }

  function openProduct(product: AdminProduct, mode: "details" | "edit") {
    setSelectedId(product.id);
    setDraft(mode === "edit" ? toDraft(product) : null);
    setView("products");
    setNotice(null);
  }

  function startNewProduct() {
    setSelectedId("");
    setDraft(emptyDraft(snapshot.categories[0]?.id ?? ""));
    setView("products");
    setNotice(null);
  }

  function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    try {
      const id = selectedId || crypto.randomUUID();
      const next = upsertProduct(snapshot, draft, id);
      if (!commit(next, selectedId ? "Produto atualizado." : "Produto cadastrado.")) return;
      setSelectedId(id);
      setDraft(null);
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Não foi possível salvar o produto." });
    }
  }

  function removeProduct(product: AdminProduct) {
    if (!window.confirm(`Excluir “${product.name}”? Esta ação remove o item deste navegador.`)) return;
    if (!commit(deleteProduct(snapshot, product.id), "Produto excluído.")) return;
    if (selectedId === product.id) {
      setSelectedId("");
      setDraft(null);
    }
  }

  function saveCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const id = editingCategoryId || undefined;
      const next = upsertCategory(snapshot, categoryName, id);
      if (!commit(next, editingCategoryId ? "Categoria atualizada." : "Categoria criada.")) return;
      setCategoryName("");
      setEditingCategoryId("");
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Não foi possível salvar a categoria." });
    }
  }

  function removeCategory(category: AdminCategory) {
    if (!window.confirm(`Excluir a categoria “${category.name}”?`)) return;
    try {
      commit(deleteCategory(snapshot, category.id), "Categoria excluída.");
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Não foi possível excluir a categoria." });
    }
  }

  function exportCatalog() {
    const file = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fv-catalogo-local.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  if (!ready) return <main className="admin-loading">Carregando catálogo local...</main>;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link className="admin-brand" href="/" aria-label="F&V Sports Store, página inicial">
          <span>F&V</span><small>SPORTS / ADMIN</small>
        </Link>
        <div className="admin-header-actions">
          <span className="admin-storage-badge">Local · neste navegador</span>
          <button className="admin-text-button" type="button" onClick={exportCatalog}>Exportar JSON</button>
          <button className="admin-text-button" type="button" onClick={logout}>Sair</button>
        </div>
      </header>

      <div className="admin-main">
        <div className="admin-title-row">
          <div><p className="admin-kicker">F&V SPORTS STORE</p><h1>Gerenciamento de catálogo</h1></div>
          {view === "products" && <button className="admin-primary-button" type="button" onClick={startNewProduct}>+ Novo produto</button>}
        </div>

        <nav className="admin-tabs" aria-label="Seções administrativas">
          <button type="button" className={view === "products" ? "is-active" : ""} onClick={() => { setView("products"); setNotice(null); }}>Produtos <span>{snapshot.products.length}</span></button>
          <button type="button" className={view === "categories" ? "is-active" : ""} onClick={() => { setView("categories"); setNotice(null); }}>Categorias <span>{snapshot.categories.length}</span></button>
        </nav>

        {storageError && <p className="admin-alert" role="alert">{storageError} Nenhum dado foi sobrescrito.</p>}
        {notice && <p className={`admin-notice ${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}>{notice.text}</p>}

        {view === "products" ? (
          <section className="admin-workspace" aria-label="Produtos">
            <div className="admin-list-panel">
              <div className="admin-filter-bar">
                <label className="admin-search-field"><span className="sr-only">Pesquisar produtos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome" /></label>
                <label><span className="sr-only">Filtrar por categoria</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">Todas as categorias</option>{snapshot.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                <label><span className="sr-only">Filtrar por plataforma</span><select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value as MarketplaceId | "")}><option value="">Todas as plataformas</option>{marketplaces.map((platform) => <option key={platform.id} value={platform.id}>{platform.label}</option>)}</select></label>
              </div>
              <div className="admin-list-heading"><span>PRODUTO</span><span>PLATAFORMA / CATEGORIA</span><span>PREÇO</span><span>AÇÕES</span></div>
              <div className="admin-product-list">
                {visibleProducts.map((product) => {
                  const category = snapshot.categories.find((item) => item.id === product.categoryId);
                  const platform = marketplaces.find((item) => item.id === product.platformId);
                  return (
                    <article className={`admin-product-row${selectedId === product.id ? " is-selected" : ""}`} key={product.id}>
                      <button className="admin-product-name" type="button" onClick={() => openProduct(product, "details")}><strong>{product.name}</strong><small>{product.imageUrls.length} {product.imageUrls.length === 1 ? "imagem" : "imagens"}</small></button>
                      <div className="admin-row-meta"><span className={`platform-badge ${product.platformId}`}>{platform?.label}</span><small>{category?.name ?? "Sem categoria"}</small></div>
                      <span className="admin-row-price">{formatPrice(product.price)}</span>
                      <div className="admin-row-actions"><button type="button" onClick={() => openProduct(product, "details")}>Ver</button><button type="button" onClick={() => openProduct(product, "edit")}>Editar</button><button type="button" className="danger-text" onClick={() => removeProduct(product)}>Excluir</button></div>
                    </article>
                  );
                })}
                {visibleProducts.length === 0 && <p className="admin-empty">Nenhum produto corresponde aos filtros.</p>}
              </div>
            </div>

            <aside className="admin-editor" aria-label={selectedId ? "Detalhes do produto" : "Cadastro de produto"}>
              {!draft && !selectedProduct ? (
                <div className="admin-editor-empty"><span>01</span><h2>Selecione um produto</h2><p>Os dados completos aparecem aqui para consulta e edição.</p></div>
              ) : draft ? (
                <ProductForm
                  draft={draft}
                  categories={snapshot.categories}
                  mode={selectedId ? "edit" : "create"}
                  onChange={setDraft}
                  onSubmit={saveProduct}
                  onCancel={() => { setDraft(null); setSelectedId(""); }}
                />
              ) : selectedProduct ? (
                <ProductDetails product={selectedProduct} categories={snapshot.categories} onEdit={() => openProduct(selectedProduct, "edit")} />
              ) : null}
            </aside>
          </section>
        ) : (
          <CategoryManager
            categories={snapshot.categories}
            products={snapshot.products}
            editingId={editingCategoryId}
            name={categoryName}
            onNameChange={setCategoryName}
            onSubmit={saveCategory}
            onEdit={(category) => { setEditingCategoryId(category.id); setCategoryName(category.name); setNotice(null); }}
            onCancel={() => { setEditingCategoryId(""); setCategoryName(""); }}
            onDelete={removeCategory}
          />
        )}
        <p className="admin-local-note">As alterações deste painel ficam salvas apenas neste navegador. Exporte o JSON para cópia local; elas não alteram o catálogo público nem sincronizam entre dispositivos.</p>
      </div>
    </main>
  );
}

function ProductForm({ draft, categories, mode, onChange, onSubmit, onCancel }: {
  draft: ProductDraft;
  categories: readonly AdminCategory[];
  mode: "create" | "edit";
  onChange: (draft: ProductDraft) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form className="admin-product-form" onSubmit={onSubmit}>
      <div className="admin-editor-heading"><p className="admin-kicker">{mode === "create" ? "NOVO REGISTRO" : "EDIÇÃO"}</p><h2>{mode === "create" ? "Cadastrar produto" : "Editar produto"}</h2></div>
      <label>Nome do produto<input required value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} /></label>
      <label>Descrição<textarea required rows={3} value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} /></label>
      <div className="admin-form-grid">
        <label>Preço (R$)<input type="number" min="0" step="0.01" value={draft.price ?? ""} onChange={(event) => onChange({ ...draft, price: event.target.value === "" ? null : Number(event.target.value) })} /></label>
        <label>Plataforma<select value={draft.platformId} onChange={(event) => onChange({ ...draft, platformId: event.target.value as MarketplaceId })}>{marketplaces.map((platform) => <option key={platform.id} value={platform.id}>{platform.label}</option>)}</select></label>
      </div>
      <label>Categoria<select required value={draft.categoryId} onChange={(event) => onChange({ ...draft, categoryId: event.target.value })}><option value="">Selecione</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
      <label>Link de afiliado<input type="url" value={draft.affiliateUrl} onChange={(event) => onChange({ ...draft, affiliateUrl: event.target.value })} placeholder="https://" /></label>
      <fieldset className="admin-image-fieldset"><legend>Imagens por URL</legend>
        {draft.imageUrls.map((imageUrl, index) => (
          <div className="admin-image-row" key={`${index}-${imageUrl}`}>
            <input type="url" aria-label={`URL da imagem ${index + 1}`} value={imageUrl} onChange={(event) => onChange({ ...draft, imageUrls: draft.imageUrls.map((item, itemIndex) => itemIndex === index ? event.target.value : item) })} />
            <button type="button" className="danger-text" onClick={() => onChange({ ...draft, imageUrls: draft.imageUrls.filter((_, itemIndex) => itemIndex !== index) })}>Remover</button>
          </div>
        ))}
        <ImageUrlAdder onAdd={(imageUrl) => onChange({ ...draft, imageUrls: [...draft.imageUrls, imageUrl] })} />
      </fieldset>
      <div className="admin-form-actions"><button className="admin-primary-button" type="submit">{mode === "create" ? "Cadastrar produto" : "Salvar alterações"}</button><button className="admin-secondary-button" type="button" onClick={onCancel}>Cancelar</button></div>
    </form>
  );
}

function ImageUrlAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [value, setValue] = useState("");
  return <div className="admin-image-row"><input type="url" aria-label="Nova URL de imagem" value={value} onChange={(event) => setValue(event.target.value)} placeholder="https://" /><button className="admin-secondary-button" type="button" disabled={!value} onClick={() => { onAdd(value.trim()); setValue(""); }}>Adicionar imagem</button></div>;
}

function ProductDetails({ product, categories, onEdit }: { product: AdminProduct; categories: readonly AdminCategory[]; onEdit: () => void }) {
  const category = categories.find((item) => item.id === product.categoryId);
  const platform = marketplaces.find((item) => item.id === product.platformId);
  return (
    <div className="admin-product-details">
      <div className="admin-editor-heading"><p className="admin-kicker">DETALHES DO PRODUTO</p><h2>{product.name}</h2></div>
      <dl>
        <div><dt>Descrição</dt><dd>{product.description}</dd></div>
        <div><dt>Preço</dt><dd>{formatPrice(product.price)}</dd></div>
        <div><dt>Categoria</dt><dd>{category?.name ?? "Sem categoria"}</dd></div>
        <div><dt>Plataforma</dt><dd>{platform?.label ?? product.platformId}</dd></div>
        <div><dt>Link de afiliado</dt><dd>{product.affiliateUrl ? <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">Abrir destino</a> : "Não informado"}</dd></div>
        <div><dt>Imagens</dt><dd>{product.imageUrls.length ? product.imageUrls.map((imageUrl) => <a className="admin-image-link" href={imageUrl} target="_blank" rel="noopener noreferrer" key={imageUrl}>{imageUrl}</a>) : "Nenhuma imagem cadastrada"}</dd></div>
        <div><dt>Criado</dt><dd>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(product.createdAt))}</dd></div>
        <div><dt>Atualizado</dt><dd>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(product.updatedAt))}</dd></div>
      </dl>
      <button className="admin-primary-button" type="button" onClick={onEdit}>Editar produto</button>
    </div>
  );
}

function CategoryManager({ categories, products, editingId, name, onNameChange, onSubmit, onEdit, onCancel, onDelete }: {
  categories: readonly AdminCategory[];
  products: readonly AdminProduct[];
  editingId: string;
  name: string;
  onNameChange: (name: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEdit: (category: AdminCategory) => void;
  onCancel: () => void;
  onDelete: (category: AdminCategory) => void;
}) {
  return (
    <section className="admin-category-workspace" aria-label="Categorias">
      <form className="admin-category-form" onSubmit={onSubmit}>
        <p className="admin-kicker">ORGANIZAÇÃO</p><h2>{editingId ? "Renomear categoria" : "Nova categoria"}</h2>
        <label>Nome<input required value={name} onChange={(event) => onNameChange(event.target.value)} /></label>
        <div className="admin-form-actions"><button className="admin-primary-button" type="submit">{editingId ? "Salvar nome" : "Criar categoria"}</button>{editingId && <button className="admin-secondary-button" type="button" onClick={onCancel}>Cancelar</button>}</div>
      </form>
      <div className="admin-category-list">
        {categories.map((category) => {
          const count = products.filter((product) => product.categoryId === category.id).length;
          return <article className="admin-category-row" key={category.id}><div><strong>{category.name}</strong><small>{count} {count === 1 ? "produto" : "produtos"}</small></div><div className="admin-row-actions"><button type="button" onClick={() => onEdit(category)}>Editar</button><button type="button" className="danger-text" onClick={() => onDelete(category)}>Excluir</button></div></article>;
        })}
      </div>
    </section>
  );
}