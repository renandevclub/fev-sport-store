"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProductAffiliateUrl } from "@/lib/affiliate";
import { trackEvent } from "@/lib/analytics";
import { filterProducts, getProductImageUrl, isComparablePrice, type PriceOrder, type Product, type SportFilter } from "@/lib/products";

type StorefrontProps = {
  products: readonly Product[];
  demoMode: boolean;
  contactEmail: string | null;
  initialSport?: SportFilter;
};

const sports: { value: SportFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "futebol", label: "Futebol" },
  { value: "volei", label: "Vôlei" },
];

export function Storefront({ products, demoMode, contactEmail, initialSport = "todos" }: StorefrontProps) {
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<SportFilter>(initialSport);
  const [subcategory, setSubcategory] = useState("");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("relevance");
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);

  const categories = useMemo(() => {
    const available = products
      .filter((product) => sport === "todos" || product.category === sport)
      .map((product) => product.subcategory);
    return [...new Set(available)].sort((left, right) => left.localeCompare(right, "pt-BR"));
  }, [products, sport]);

  const visibleProducts = useMemo(
    () => filterProducts(products, { query, sport, subcategory, priceOrder }),
    [products, query, sport, subcategory, priceOrder],
  );

  const featuredProducts = visibleProducts.filter((product) => product.featured);
  const hasPrices = products.some((product) => isComparablePrice(product.price));

  useEffect(() => {
    trackEvent("store_view", {
      source: document.referrer ? new URL(document.referrer).hostname : "direct",
    });
  }, []);

  function chooseSport(nextSport: SportFilter) {
    setSport(nextSport);
    setSubcategory("");
    setMenuOpen(false);
    trackEvent("category_select", { category: nextSport });
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(queryInput.trim());
    trackEvent("search_submit", { source: "site-search" });
  }

  function clearFilters() {
    setQueryInput("");
    setQuery("");
    setSport("todos");
    setSubcategory("");
    setPriceOrder("relevance");
  }

  function setImageFailed(productId: string) {
    setImageErrors((current) => current.includes(productId) ? current : [...current, productId]);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="#inicio" aria-label="F&V Sports Store, início">
            <span className="brand-mark" aria-hidden="true">F<span>&</span>V</span>
            <span className="brand-copy"><strong>SPORTS</strong><small>STORE</small></span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
            <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
          </button>

          <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
            <Link href="/futebol" aria-current={initialSport === "futebol" ? "page" : undefined} onClick={() => trackEvent("category_select", { category: "futebol" })}>Futebol</Link>
            <Link href="/volei" aria-current={initialSport === "volei" ? "page" : undefined} onClick={() => trackEvent("category_select", { category: "volei" })}>Vôlei</Link>
          </nav>

          <form className="header-search" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="header-search-input">Pesquisar produtos</label>
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
            <input id="header-search-input" value={queryInput} onChange={(event) => setQueryInput(event.target.value)} placeholder="Buscar equipamento" />
            <button type="submit" aria-label="Enviar pesquisa">Buscar</button>
          </form>
        </div>
      </header>

      <main id="inicio">
        {demoMode && (
          <div className="demo-banner" role="status">
            <span className="demo-dot" /> Modo demonstração. Produtos e imagens são ilustrativos, não são ofertas reais.
          </div>
        )}

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> EQUIPAMENTO PARA QUEM JOGA</p>
              <h1 id="hero-title">EQUIPADO<br />PARA O <em>JOGO.</em></h1>
              <p className="hero-lede">Encontre equipamentos e acessórios para sua próxima partida.</p>
              <div className="hero-actions">
                <button className="button button-primary" type="button" onClick={() => { chooseSport("futebol"); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Explorar futebol <span aria-hidden="true">↗</span>
                </button>
                <button className="button button-outline" type="button" onClick={() => { chooseSport("volei"); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Explorar vôlei <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className="hero-meta"><span>FUTEBOL</span><b /> <span>VÔLEI</span><b /> <span>JOGO AMADOR</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-ring ring-one" /><div className="art-ring ring-two" />
              <div className="court-lines"><span /><span /><span /><span /></div>
              <div className="art-number">01</div>
              <svg className="hero-ball" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="88" />
                <path d="m100 43 35 25-13 41H78L65 68l35-25Zm0 0V12m35 56 39-12m-52 53 28 34m-72-34-29 34m24-75-39-12m38 53H42m80 0h36m-58 0v55m-35-96L44 42m91 26 22-27m-44 68 25 34m-60-34-25 34" />
              </svg>
              <div className="art-caption"><span>F&V / 01</span><span>FEITO PRA JOGAR</span></div>
            </div>
          </div>
          <div className="hero-edge" />
        </section>

        <section className="catalog-section" id="produtos" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark"><span /> SEU PRÓXIMO JOGO COMEÇA AQUI</p>
              <h2 id="catalog-title">Equipamento <em>de jogo.</em></h2>
            </div>
            <p className="catalog-intro">Seleção de itens para acompanhar<br className="desktop-break" /> você dentro e fora da quadra.</p>
          </div>

          <div className="category-strip" aria-label="Filtrar por modalidade">
            {sports.map((item) => (
              <button
                className={`category-tab${sport === item.value ? " is-active" : ""}`}
                key={item.value}
                type="button"
                aria-pressed={sport === item.value}
                onClick={() => chooseSport(item.value)}
              >
                <span className={`category-mark ${item.value}`} aria-hidden="true">{item.value === "todos" ? "F/V" : item.label.slice(0, 1)}</span>
                <span>{item.label}</span><span className="tab-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          <div className="filter-row">
            <div className="filter-label"><span>CATÁLOGO</span><strong>{visibleProducts.length.toString().padStart(2, "0")} <small>ITENS</small></strong></div>
            <div className="filter-controls">
              <label>
                <span className="sr-only">Filtrar por categoria</span>
                <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)}>
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              {hasPrices && (
                <label>
                  <span className="sr-only">Ordenar produtos por preço</span>
                  <select value={priceOrder} onChange={(event) => setPriceOrder(event.target.value as PriceOrder)}>
                    <option value="relevance">Ordem de cadastro</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>
                </label>
              )}
              {(query || sport !== "todos" || subcategory || priceOrder !== "relevance") && (
                <button className="clear-filters" type="button" onClick={clearFilters}>Limpar filtros <span aria-hidden="true">×</span></button>
              )}
            </div>
          </div>

          {featuredProducts.length > 0 && !query && sport === "todos" && !subcategory && (
            <div className="featured-line"><span className="featured-star" aria-hidden="true">✳</span> SELEÇÃO DA LOJA <span className="featured-note">Itens marcados como destaque no catálogo</span></div>
          )}

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => {
                const affiliateUrl = getProductAffiliateUrl(product);
                const imageFailed = imageErrors.includes(product.id);
                const imageUrl = getProductImageUrl(product.imageUrl);
                return (
                  <article className="product-card" key={product.id}>
                    <div className={`product-image ${product.category}`}>
                      {imageUrl && !imageFailed ? (
                        <Image src={imageUrl} alt={product.imageAlt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" onError={() => setImageFailed(product.id)} />
                      ) : (
                        <div className="image-placeholder" aria-label={product.imageUrl ? "Imagem indisponível" : "Imagem não cadastrada"}>
                          <span className="placeholder-index">{String(index + 1).padStart(2, "0")}</span>
                          <SportIllustration sport={product.category} />
                          <span className="placeholder-label">{product.imageUrl ? "IMAGEM INDISPONÍVEL" : "IMAGEM A CADASTRAR"}</span>
                        </div>
                      )}
                      {demoMode && <span className="product-demo-tag">DEMO</span>}
                      {product.featured && <span className="product-featured-tag">DESTAQUE</span>}
                    </div>
                    <div className="product-content">
                      <div className="product-meta"><span>{product.category === "volei" ? "VÔLEI" : "FUTEBOL"}</span><span>{product.subcategory}</span></div>
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-commerce">
                        <div className="product-price">
                          {isComparablePrice(product.price)
                            ? <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}</strong>
                            : <span>Preço não informado</span>}
                          {product.priceUpdatedAt && <small>Verificado em {new Intl.DateTimeFormat("pt-BR").format(new Date(`${product.priceUpdatedAt}T12:00:00`))}</small>}
                        </div>
                        {affiliateUrl ? (
                          <a className="offer-link" href={affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" onClick={() => trackEvent("affiliate_click", { productId: product.id, category: product.category })}>
                            Ver oferta <span aria-hidden="true">↗</span>
                          </a>
                        ) : <span className="offer-unavailable">{demoMode ? "Sem oferta real" : "Link não configurado"}</span>}
                      </div>
                      {product.merchant && <p className="merchant-name">Vendido por {product.merchant}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span className="empty-mark" aria-hidden="true">F/V</span>
              <h3>{query ? "Nenhum item encontrado." : "Catálogo em preparação."}</h3>
              <p>{query ? "Tente outro termo ou ajuste os filtros para explorar os itens disponíveis." : "Estamos preparando uma seleção verificada. Volte em breve para conferir as novidades."}</p>
              {(query || sport !== "todos" || subcategory || priceOrder !== "relevance") && <button className="button button-dark" type="button" onClick={clearFilters}>Limpar filtros</button>}
            </div>
          )}

          <p className="affiliate-notice"><span aria-hidden="true">ⓘ</span> A loja pode receber comissão por compras elegíveis realizadas por links de afiliados. Isso não altera o preço para você. Preços e disponibilidade são definidos pelo vendedor.</p>
        </section>

        <section className="category-band" aria-label="Modalidades">
          <button type="button" className="sport-feature football-feature" onClick={() => { chooseSport("futebol"); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="sport-feature-kicker">01 / CAMPO</span><strong>FUTEBOL<span>.</span></strong><span className="sport-feature-link">Explorar seleção <b aria-hidden="true">↗</b></span>
          </button>
          <button type="button" className="sport-feature volleyball-feature" onClick={() => { chooseSport("volei"); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="sport-feature-kicker">02 / QUADRA</span><strong>VÔLEI<span>.</span></strong><span className="sport-feature-link">Explorar seleção <b aria-hidden="true">↗</b></span>
          </button>
        </section>

        <section className="closing-note">
          <div className="closing-mark" aria-hidden="true">F&V</div>
          <p>O jogo é seu.<br /><em>O próximo passo também.</em></p>
          <a href="#produtos" aria-label="Voltar para o catálogo">Voltar ao catálogo <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <Link className="brand footer-brand" href="#inicio" aria-label="F&V Sports Store, início">
            <span className="brand-mark" aria-hidden="true">F<span>&</span>V</span>
            <span className="brand-copy"><strong>SPORTS</strong><small>STORE</small></span>
          </Link>
          <p>Equipamento para quem vive o jogo.<br />Futebol e vôlei, do seu jeito.</p>
          <nav className="footer-links" aria-label="Links do rodapé">
            <a href="#produtos" onClick={() => chooseSport("futebol")}>Futebol</a>
            <a href="#produtos" onClick={() => chooseSport("volei")}>Vôlei</a>
            <Link href="/privacidade">Privacidade</Link>
          </nav>
          <div className="footer-contact"><span>CONTATO</span>{contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : <p>Canal a configurar pelo responsável.</p>}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} F&V Sports Store</span><span>Links externos podem gerar comissão. <Link href="/privacidade">Saiba mais</Link></span><span>BR / PT</span></div>
      </footer>
    </>
  );
}

function SportIllustration({ sport }: { sport: Product["category"] }) {
  return (
    <svg className="sport-illustration" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="42" />
      {sport === "futebol"
        ? <path d="m60 36 15 11-6 18H51l-6-18 15-11Zm0 0V18m15 29 21-7m-27 25 11 18m-29-18-11 18m5-36-21-7m22 25H28m41 0h22m-31 0v25" />
        : <path d="M22 42c19-8 42-8 76 0M22 78c19 8 42 8 76 0M42 22c-8 19-8 42 0 76m36-76c8 19 8 42 0 76M23 60h74" />}
    </svg>
  );
}