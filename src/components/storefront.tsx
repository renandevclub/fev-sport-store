"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProductAffiliateUrl } from "@/lib/affiliate";
import { trackEvent } from "@/lib/analytics";
import {
  filterProducts,
  getProductImages,
  getProductImageUrl,
  isComparablePrice,
  isProductInSport,
  type FootballType,
  type PriceOrder,
  type Product,
  type SportFilter,
} from "@/lib/products";
import {
  adminProductToStoreProduct,
  type AdminCategory,
  type AdminProduct,
} from "@/lib/admin/catalog";

type StorefrontProps = {
  products: readonly Product[];
  contactEmail: string | null;
  initialSport?: SportFilter;
};

const sports: { value: SportFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "futebol", label: "Futebol" },
  { value: "volei", label: "Vôlei" },
];

const footballTypeOptions: { value: FootballType; label: string }[] = [
  { value: "campo", label: "Campo" },
  { value: "futsal", label: "Futsal" },
  { value: "society", label: "Society" },
];

export function Storefront({ products, contactEmail, initialSport = "todos" }: StorefrontProps) {
  const [catalogProducts, setCatalogProducts] = useState<readonly Product[]>(products);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<SportFilter>(initialSport);
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [footballType, setFootballType] = useState<FootballType | "">("");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("relevance");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function loadCatalog() {
      try {
        const stored = localStorage.getItem("fv-admin.catalog.v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
            const categories = (parsed.categories as AdminCategory[]) || [];
            const mapped = (parsed.products as AdminProduct[]).map((p) => {
              const base = products.find((orig) => orig.id === p.id);
              return adminProductToStoreProduct(p, categories, base);
            });
            setCatalogProducts(mapped);
            return;
          }
        }
        setCatalogProducts(products);
      } catch {
        setCatalogProducts(products);
      }
    }

    loadCatalog();

    window.addEventListener("storage", loadCatalog);
    window.addEventListener("catalogUpdated", loadCatalog);

    return () => {
      window.removeEventListener("storage", loadCatalog);
      window.removeEventListener("catalogUpdated", loadCatalog);
    };
  }, [products]);

  const categories = useMemo(() => {
    const available = catalogProducts
      .filter((product) => isProductInSport(product, sport))
      .map((product) => product.subcategory);
    return [...new Set(available)].sort((left, right) => left.localeCompare(right, "pt-BR"));
  }, [catalogProducts, sport]);

  const brands = useMemo(() => {
    const available = catalogProducts
      .filter((product) => isProductInSport(product, sport) && product.brand)
      .map((product) => product.brand as string);
    return [...new Set(available)].sort((left, right) => left.localeCompare(right, "pt-BR"));
  }, [catalogProducts, sport]);

  const availableFootballTypes = useMemo(() => {
    const available = new Set(
      catalogProducts
        .filter((product) => isProductInSport(product, sport))
        .flatMap((product) => product.footballTypes ?? []),
    );
    return footballTypeOptions.filter((option) => available.has(option.value));
  }, [catalogProducts, sport]);

  const hasPrices = catalogProducts.some((product) => isComparablePrice(product.price));
  const effectivePriceOrder: PriceOrder =
    !hasPrices && (priceOrder === "price-asc" || priceOrder === "price-desc")
      ? "relevance"
      : priceOrder;

  const visibleProducts = useMemo(
    () => filterProducts(catalogProducts, { query, sport, subcategory, brand, footballType, priceOrder: effectivePriceOrder }),
    [catalogProducts, query, sport, subcategory, brand, footballType, effectivePriceOrder],
  );

  const featuredProducts = visibleProducts.filter((product) => product.featured);

  useEffect(() => {
    let source = "direct";
    if (document.referrer) {
      try {
        source = new URL(document.referrer).hostname || "direct";
      } catch {
        source = "referral";
      }
    }
    trackEvent("store_view", { source });
  }, []);

  function chooseSport(nextSport: SportFilter) {
    setSport(nextSport);
    setSubcategory("");
    setBrand("");
    setFootballType("");
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
    setBrand("");
    setFootballType("");
    setPriceOrder("relevance");
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> EQUIPAMENTO PARA QUEM JOGA</p>
              <h1 id="hero-title">{initialSport === "volei" ? <>EQUIPAMENTO<br />DE <em>VÔLEI.</em></> : initialSport === "futebol" ? <>ITENS PARA<br />JOGAR<br /><em>FUTEBOL.</em></> : <>EQUIPADO<br />PARA O <em>JOGO.</em></>}</h1>
              <p className="hero-lede">{initialSport === "futebol" ? "Bolas, chuteiras e acessórios para campo, futsal e treino." : "Encontre equipamentos e acessórios para sua próxima partida."}</p>
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
          {initialSport !== "todos" && (
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Início</Link><span aria-hidden="true">/</span><span>Esportes</span><span aria-hidden="true">/</span><span aria-current="page">{initialSport === "volei" ? "Vôlei" : "Futebol"}</span>
            </nav>
          )}
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark"><span /> SEU PRÓXIMO JOGO COMEÇA AQUI</p>
              <h2 id="catalog-title">{initialSport === "volei" ? <>Equipamentos de <em>vôlei.</em></> : initialSport === "futebol" ? <>Itens para jogar <em>futebol.</em></> : <>Equipamento <em>de jogo.</em></>}</h2>
            </div>
            <p className="catalog-intro">{initialSport === "volei" ? "Bolas, proteção e acessórios para treinos e partidas." : initialSport === "futebol" ? "Bolas, chuteiras, luvas de goleiro, itens de treino e camisas de torcida." : <>Seleção de itens para acompanhar<br className="desktop-break" /> você dentro e fora da quadra.</>}</p>
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
              {brands.length > 0 && (
                <label>
                  <span className="sr-only">Filtrar por marca</span>
                  <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                    <option value="">Todas as marcas</option>
                    {brands.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
              )}
              {availableFootballTypes.length > 0 && (
                <label>
                  <span className="sr-only">Filtrar por modalidade de futebol</span>
                  <select value={footballType} onChange={(event) => setFootballType(event.target.value as FootballType | "")}>
                    <option value="">Campo, futsal e society</option>
                    {availableFootballTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>
              )}
              <label>
                <span className="sr-only">Ordenar produtos</span>
                <select value={effectivePriceOrder} onChange={(event) => setPriceOrder(event.target.value as PriceOrder)}>
                  <option value="relevance">Ordem consultada (22/10/2026)</option>
                  {hasPrices && <><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></>}
                  <option value="name-asc">Ordem alfabética</option>
                </select>
              </label>
              {(query || sport !== "todos" || subcategory || brand || footballType || effectivePriceOrder !== "relevance") && (
                <button className="clear-filters" type="button" onClick={clearFilters}>Limpar filtros <span aria-hidden="true">×</span></button>
              )}
            </div>
          </div>

          {initialSport === "volei" && (
            <p className="source-note">Consulta da referência em 22/10/2026: foram identificados itens nas posições 1–30 e 51–80. Esta seleção inclui os itens relacionados a vôlei; as posições 31–50 não foram retornadas pela consulta. Preços, avaliações e imagens não foram importados, e a ordem não representa um ranking atual.</p>
          )}
          {initialSport === "futebol" && (
            <p className="source-note">Referência consultada em 22/10/2026: “Itens para jogar Futebol”, com posições 1–30 e 51–80 retornadas; as posições 31–50 não apareceram na consulta. O recorte de futebol contém {catalogProducts.filter((product) => isProductInSport(product, "futebol")).length} itens identificados e pertinentes, sem camisetas esportivas genéricas ou artigos de outras modalidades. Nenhuma imagem oficial foi obtida com autorização; preços, avaliações e disponibilidade não foram importados. A ordem é a observada na consulta, não um ranking atual.</p>
          )}

          {featuredProducts.length > 0 && !query && sport === "todos" && !subcategory && (
            <div className="featured-line"><span className="featured-star" aria-hidden="true">✳</span> SELEÇÃO DA LOJA <span className="featured-note">Itens marcados como destaque no catálogo</span></div>
          )}

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => {
                const affiliateUrl = getProductAffiliateUrl(product);
                const platformLabel = product.merchant === "shopee"
                  ? "na Shopee"
                  : product.merchant === "mercado-livre"
                  ? "no Mercado Livre"
                  : "na Amazon";
                const merchantName = product.merchant === "mercado-livre"
                  ? "Mercado Livre"
                  : product.merchant === "shopee"
                  ? "Shopee"
                  : product.merchant === "amazon"
                  ? "Amazon"
                  : product.merchant;
                return (
                  <article className="product-card" key={product.id}>
                    <ProductImageCarousel
                      key={product.id}
                      product={product}
                      category={product.category}
                      featured={product.featured}
                    />
                    <div className="product-content">
                      <div className="product-meta"><span>{product.brand || (sport !== "todos" ? sport.toLocaleUpperCase("pt-BR") : product.category === "volei" ? "VÔLEI" : "FUTEBOL")}</span><span>{product.subcategory}</span></div>
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
                            Ver produto {platformLabel} <span aria-hidden="true">↗</span>
                          </a>
                        ) : <span className="offer-unavailable">{product.amazonUrl ? "Link afiliado pendente de configuração" : "Link não configurado"}</span>}
                      </div>
                      {merchantName && !product.amazonUrl && <p className="merchant-name">Vendido por {merchantName}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span className="empty-mark" aria-hidden="true">F/V</span>
              <h3>{query ? "Nenhum item encontrado." : "Nenhum produto cadastrado."}</h3>
              <p>{query ? "Tente outro termo ou ajuste os filtros para explorar os itens disponíveis." : "Não há produtos ativos para estes filtros."}</p>
              {(query || sport !== "todos" || subcategory || brand || footballType || effectivePriceOrder !== "relevance") && <button className="button button-dark" type="button" onClick={clearFilters}>Limpar filtros</button>}
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

function ProductImageCarousel({
  product,
  category,
  featured,
}: {
  product: Product;
  category: string;
  featured: boolean;
}) {
  const rawImages = useMemo(() => getProductImages(product), [product]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<number[]>([]);
  const touchStartX = useRef<number | null>(null);

  const images = useMemo(
    () => rawImages.filter((img) => Boolean(getProductImageUrl(img))),
    [rawImages],
  );
  const totalImages = images.length;
  const safeIndex = currentIndex < totalImages ? currentIndex : 0;
  const currentImageUrl = images[safeIndex] ? getProductImageUrl(images[safeIndex]) : null;
  const isFailed = failedIndices.includes(safeIndex) || !currentImageUrl;

  function prevSlide(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  }

  function nextSlide(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  }

  function goToSlide(index: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || totalImages <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (diff > 35) {
      setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
    } else if (diff < -35) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
    }
  }

  function handleImageError(index: number) {
    setFailedIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }

  return (
    <div
      className={`product-image ${category} ${totalImages > 1 ? "has-carousel" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {currentImageUrl && !isFailed ? (
        <Image
          key={`${product.id}-${safeIndex}-${currentImageUrl}`}
          src={currentImageUrl}
          alt={
            totalImages > 1
              ? `${product.imageAlt} (foto ${safeIndex + 1} de ${totalImages})`
              : product.imageAlt
          }
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="carousel-slide-img"
          onError={() => handleImageError(safeIndex)}
          unoptimized
        />
      ) : (
        <div
          className="image-placeholder"
          role="img"
          aria-label={totalImages > 0 ? "Imagem indisponível" : "Imagem do produto não fornecida"}
        >
          <span className="placeholder-label">
            {totalImages > 0 ? "IMAGEM INDISPONÍVEL" : "IMAGEM NÃO FORNECIDA"}
          </span>
        </div>
      )}

      {featured && <span className="product-featured-tag">DESTAQUE</span>}

      {totalImages > 1 && (
        <>
          <span className="carousel-counter" aria-hidden="true">
            {safeIndex + 1} / {totalImages}
          </span>

          <div className="carousel-nav-buttons">
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              aria-label="Ver imagem anterior do produto"
              onClick={prevSlide}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              aria-label="Ver próxima imagem do produto"
              onClick={nextSlide}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="carousel-dots" role="tablist" aria-label="Fotos do produto">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Ver foto ${i + 1} de ${totalImages}`}
                className={`carousel-dot ${i === safeIndex ? "is-active" : ""}`}
                onClick={(e) => goToSlide(i, e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
