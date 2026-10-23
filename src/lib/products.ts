export type Sport = "futebol" | "volei";
export type FootballType = "campo" | "futsal" | "society";
export type SportFilter = "todos" | Sport;
export type PriceOrder = "relevance" | "price-asc" | "price-desc" | "name-asc";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  model?: string | null;
  attributes?: readonly string[];
  sourceRank?: number | null;
  sourceRankBySport?: Partial<Record<Sport, number>>;
  relatedSports?: readonly Sport[];
  amazonUrl?: string | null;
  source?: string | null;
  lastVerifiedAt?: string | null;
  imageSourceUrl?: string | null;
  imageSourceType?: "amazon-pa-api" | "authorized" | "provided" | "pending" | null;
  imageVerifiedAt?: string | null;
  productType?: string | null;
  footballTypes?: readonly FootballType[];
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
  brand: string;
  footballType: FootballType | "";
  priceOrder: PriceOrder;
};

type FootballProductInput = {
  id: string;
  slug: string;
  name: string;
  asin: string;
  sourceRank: number;
  productType: string;
  description: string;
  brand?: string | null;
  model?: string;
  attributes?: readonly string[];
  footballTypes?: readonly FootballType[];
};

const footballProducts = ([
  { id: "futebol-camisa-brasil-feminina-copa", slug: "camisa-brasil-feminina-copa-2026", name: "Camisa do Brasil feminina Copa 2026, estampa Elite", asin: "B0GYKBGSTL", sourceRank: 8, productType: "Camisas de torcida", description: "Camiseta de torcida do Brasil listada na categoria de futebol.", brand: null, attributes: ["torcida", "Brasil", "feminina"], footballTypes: [], },
  { id: "futebol-camiseta-brasil-patriota", slug: "camiseta-brasil-dry-fit-patriota", name: "Camiseta do Brasil Dry Fit UV Patriota Elite", asin: "B0GXPX3Q1H", sourceRank: 9, productType: "Camisas de torcida", description: "Camiseta estampada para torcida, conforme título da listagem.", attributes: ["torcida", "Brasil", "dry fit"], footballTypes: [], },
  { id: "futebol-bola-campo-n5-premium", slug: "bola-futebol-campo-n5-premium", name: "Bola de futebol de campo nº 5 profissional", asin: "B0GXCLS89S", sourceRank: 13, productType: "Bolas", description: "Bola nº 5 listada para campo, queimada e futsal; consulte a descrição do vendedor para confirmar o uso pretendido.", attributes: ["bola", "nº 5", "costura reforçada"], footballTypes: ["campo", "futsal"], },
  { id: "futebol-penalty-player-xxv", slug: "bola-penalty-player-xxv", name: "Bola de futebol de campo Penalty Player XXV", asin: "B0GQWSMXZK", sourceRank: 15, productType: "Bolas", description: "Bola de campo Penalty identificada na listagem.", brand: "Penalty", model: "Player XXV", attributes: ["bola", "campo"], footballTypes: ["campo"], },
  { id: "futebol-camisa-brasil-feminina-bandeira", slug: "camisa-brasil-feminina-bandeira", name: "Camisa do Brasil feminina Copa 2026, estampa Bandeira", asin: "B0GYKH5SS6", sourceRank: 16, productType: "Camisas de torcida", description: "Camiseta de torcida do Brasil listada na categoria de futebol.", attributes: ["torcida", "Brasil", "feminina"], footballTypes: [], },
  { id: "futebol-camiseta-manchester-city-juvenil", slug: "camiseta-manchester-city-juvenil", name: "Camiseta juvenil Manchester City Dry Fit", asin: "B0G1CX61PZ", sourceRank: 19, productType: "Camisas de torcida", description: "Camiseta juvenil com tema Manchester City, conforme título da listagem.", brand: "Manchester City", attributes: ["torcida", "juvenil", "Dry Fit"], footballTypes: [], },
  { id: "futebol-mini-trave-infantil", slug: "kit-mini-trave-golzinho-infantil", name: "Kit infantil de mini-trave com bola e bomba", asin: "B0DHDFG723", sourceRank: 20, productType: "Mini-gols e recreação", description: "Brinquedo de futebol infantil com mini-traves, bola e bomba.", attributes: ["infantil", "mini-trave", "recreação"], footballTypes: [], },
  { id: "futebol-shorts-dry-fit-2-em-1", slug: "shorts-dry-fit-compressao-futebol", name: "Kit de shorts masculinos 2 em 1 Dry Fit", asin: "B0HF6316G6", sourceRank: 21, productType: "Roupas para treino", description: "Shorts de treino cuja listagem menciona academia, corrida e futebol.", attributes: ["dry fit", "compressão", "treino", "futebol"], footballTypes: [], },
  { id: "futebol-bola-puma-libertadores", slug: "bola-puma-cumbre-libertadores", name: "Bola PUMA Cumbre da CONMEBOL Libertadores", asin: "B0DQ5N7JJY", sourceRank: 23, productType: "Bolas", description: "Bola de futebol identificada como modelo Cumbre da Libertadores.", brand: "PUMA", model: "Cumbre", attributes: ["bola", "Libertadores"], footballTypes: [], },
  { id: "futebol-chuteira-mizuno-morelia-club", slug: "chuteira-mizuno-morelia-club-as", name: "Chuteira Mizuno Morelia Club AS", asin: "B0CDSJN6MY", sourceRank: 24, productType: "Chuteiras", description: "Chuteira identificada como Society na URL de origem.", brand: "Mizuno", model: "Morelia Club AS", attributes: ["chuteira", "society"], footballTypes: ["society"], },
  { id: "futebol-luva-goleiro-infantil", slug: "luva-goleiro-infantil-triatleta", name: "Luva infantil de goleiro Triatleta Esportes", asin: "B0DTL8Z321", sourceRank: 25, productType: "Luvas de goleiro", description: "Luva de goleiro infantil identificada na listagem.", brand: "Triatleta Esportes", attributes: ["goleiro", "infantil"], footballTypes: [], },
  { id: "futebol-bola-topper-slick-22", slug: "bola-topper-slick-22-campo", name: "Bola de futebol de campo Topper Slick 22", asin: "B08RRQNJQG", sourceRank: 28, productType: "Bolas", description: "Bola de campo Topper identificada na listagem.", brand: "Topper", model: "Slick 22", attributes: ["bola", "campo"], footballTypes: ["campo"], },
  { id: "futebol-chuteira-umbro-pro5-futsal", slug: "chuteira-umbro-pro-5-bump-club-futsal", name: "Chuteira Futsal Umbro Pro 5 Bump Club", asin: "B0GTBV9K63", sourceRank: 29, productType: "Chuteiras", description: "Chuteira identificada como modelo de futsal na listagem.", brand: "Umbro", model: "Pro 5 Bump Club", attributes: ["chuteira", "futsal"], footballTypes: ["futsal"], },
  { id: "futebol-bola-infantil-capotao", slug: "bola-infantil-capotao-campo-n5", name: "Bola infantil Capotão de campo nº 5", asin: "B0DJ9ZDSTB", sourceRank: 51, productType: "Bolas", description: "Bola infantil para campo indicada no título da listagem.", attributes: ["bola", "infantil", "campo", "nº 5"], footballTypes: ["campo"], },
  { id: "futebol-chuteira-penalty-bravo-kids", slug: "chuteira-penalty-bravo-xxii-kids", name: "Chuteira Futsal infantil Penalty Bravo XXII", asin: "B0BTWC4S9L", sourceRank: 52, productType: "Chuteiras", description: "Chuteira infantil identificada como futsal na listagem.", brand: "Penalty", model: "Bravo XXII Kids", attributes: ["chuteira", "infantil", "futsal"], footballTypes: ["futsal"], },
  { id: "futebol-mini-bola-n2-infantil", slug: "mini-bola-futebol-n2-infantil", name: "Mini bola de futebol infantil nº 2", asin: "B0FY9KBR73", sourceRank: 55, productType: "Bolas", description: "Mini bola infantil de futebol identificada na listagem.", attributes: ["bola", "infantil", "nº 2"], footballTypes: [], },
  { id: "futebol-bola-umbro-classico", slug: "bola-umbro-classico-campo", name: "Bola Umbro Clássico de campo", asin: "B0GGV2N181", sourceRank: 56, productType: "Bolas", description: "Bola de campo Umbro identificada na listagem.", brand: "Umbro", model: "Clássico", attributes: ["bola", "campo"], footballTypes: ["campo"], },
  { id: "futebol-bicos-metal-inflar-bola", slug: "kit-bicos-metal-bomba-bola", name: "Kit com cinco bicos metálicos para inflar bolas", asin: "B0GX2MJBKN", sourceRank: 57, productType: "Acessórios para bolas", description: "Bicos para bombas manuais e elétricas, listados para bolas de futebol e outras modalidades.", attributes: ["bomba", "bicos", "acessórios"], footballTypes: [], },
  { id: "futebol-bomba-manual-bola", slug: "bomba-manual-encher-bola", name: "Bomba manual para encher bola", asin: "B0H531DJSN", sourceRank: 64, productType: "Bombas para bolas", description: "Bomba manual para bolas identificada na listagem.", attributes: ["bomba", "bola"], footballTypes: [], },
  { id: "futebol-bola-adidas-trionda-training", slug: "bola-adidas-trionda-training", name: "Bola adidas FIFA World Cup 26 Trionda Training", asin: "B0DLJD5K46", sourceRank: 66, productType: "Bolas", description: "Bola de treino adidas identificada na listagem.", brand: "adidas", model: "Trionda Training", attributes: ["bola", "treino"], footballTypes: ["campo"], },
  { id: "futebol-cones-circuito", slug: "kit-cones-circuito-treino", name: "Kit com dez cones demarcatórios para circuito", asin: "B0B7ZWC2B1", sourceRank: 67, productType: "Treino e marcação", description: "Cones para circuito e demarcação, listados na categoria de futebol.", attributes: ["cones", "treino", "marcação"], footballTypes: [], },
  { id: "futebol-apito-arbitragem", slug: "apito-profissional-arbitragem", name: "Apito esportivo profissional com cordão", asin: "B0H5FXF8MK", sourceRank: 72, productType: "Arbitragem e treino", description: "Apito listado para arbitragem, esportes e atividades ao ar livre.", attributes: ["apito", "arbitragem", "treino"], footballTypes: [], },
  { id: "futebol-bomba-mangueira-agulha", slug: "bomba-manual-mangueira-agulha-bolas", name: "Bomba manual com mangueira e agulha para bolas", asin: "B0HCXF13B4", sourceRank: 73, productType: "Bombas para bolas", description: "Inflador portátil listado para futebol e outras modalidades.", attributes: ["bomba", "agulha", "mangueira", "bola"], footballTypes: [], },
  { id: "futebol-apito-arbitragem-120db", slug: "apito-esportivo-arbitragem-120db", name: "Apito esportivo 120 dB para arbitragem e futebol", asin: "B0H5NBMY98", sourceRank: 75, productType: "Arbitragem e treino", description: "Apito listado para arbitragem, futebol, treinos e eventos.", attributes: ["apito", "arbitragem", "treino"], footballTypes: [], },
  { id: "futebol-chuteira-umbro-society-pro5", slug: "chuteira-umbro-pro5-society", name: "Chuteira Society Umbro Pro 5 Bump Club", asin: "B0GTBV4GM2", sourceRank: 78, productType: "Chuteiras", description: "Chuteira identificada como Society no título da listagem.", brand: "Umbro", model: "Pro 5 Bump Club", attributes: ["chuteira", "society"], footballTypes: ["society"], },
  { id: "futebol-chuteira-penalty-tornado-y2", slug: "chuteira-penalty-tornado-y2", name: "Chuteira Penalty Tornado Y-2 para futsal, society e campo", asin: "B0GKQ895W3", sourceRank: 79, productType: "Chuteiras", description: "Chuteira listada para futsal, society e campo.", brand: "Penalty", model: "Tornado Y-2", attributes: ["chuteira", "campo", "futsal", "society"], footballTypes: ["campo", "futsal", "society"], },
  { id: "futebol-chuteira-penalty-matis-kids", slug: "chuteira-penalty-matis-kids-futsal", name: "Chuteira Futsal infantil Penalty Matis XXI", asin: "B0DB2X5NYF", sourceRank: 80, productType: "Chuteiras", description: "Chuteira infantil identificada como futsal na listagem.", brand: "Penalty", model: "Matis XXI Kids", attributes: ["chuteira", "infantil", "futsal"], footballTypes: ["futsal"], },
] satisfies readonly FootballProductInput[]).map(createFootballProduct);

function createFootballProduct(input: FootballProductInput): Product {
  return {
    ...input,
    sourceRankBySport: { futebol: input.sourceRank },
    source: "Amazon Brasil, Mais vendidos em Itens para jogar Futebol",
    lastVerifiedAt: "2026-10-22",
    category: "futebol",
    subcategory: input.productType,
    price: null,
    currency: "BRL",
    imageUrl: null,
    imageAlt: `Imagem oficial pendente de autorização para ${input.name}`,
    imageSourceUrl: null,
    imageSourceType: "pending",
    imageVerifiedAt: null,
    merchant: "",
    affiliateUrl: null,
    amazonUrl: `https://www.amazon.com.br/dp/${input.asin}`,
    active: true,
    featured: false,
    priceUpdatedAt: null,
  };
}

export const publishedProducts: readonly Product[] = [
  { id: "volei-mikasa-bv552c", slug: "bola-mikasa-bv552c-praia", name: "Bola Mikasa BV552C para vôlei de praia", brand: "Mikasa", model: "BV552C", attributes: ["praia", "bola"], sourceRank: 2, description: "Bola de vôlei de praia identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Mikasa BV552C", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CLZHRQK8", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-mikasa-v360w", slug: "bola-mikasa-v360w-quadra", name: "Bola Mikasa V360W para vôlei de quadra", brand: "Mikasa", model: "V360W", attributes: ["quadra", "bola"], sourceRank: 3, description: "Bola de quadra identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Mikasa V360W", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CLTSRYQW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-bomba-hp001-2", slug: "bomba-vollo-hp001-2", name: "Bomba de inflar dupla ação Vollo", brand: "Vollo", model: "HP001-2", attributes: ["bomba", "inflar", "bola"], sourceRank: 4, sourceRankBySport: { volei: 4, futebol: 10 }, relatedSports: ["futebol"], description: "Bomba manual de dupla ação listada entre os itens da categoria.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba Vollo", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09LR6DR89", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-tornozeleira-compressao", slug: "tornozeleira-compressao-esportiva", name: "Tornozeleira ortopédica de compressão ajustável", brand: null, model: null, attributes: ["proteção", "compressão", "esportes"], sourceRank: 5, description: "Tornozeleira esportiva listada na categoria; confira indicação e tamanho no destino.", category: "volei", subcategory: "Proteção esportiva", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a tornozeleira esportiva", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0D4FG4SGK", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-bomba-sac", slug: "bomba-penalty-sac", name: "Bomba manual Penalty SAC com agulha", brand: "Penalty", model: "SAC", attributes: ["bomba", "agulha", "bola"], sourceRank: 7, sourceRankBySport: { volei: 7, futebol: 11 }, relatedSports: ["futebol"], description: "Bomba manual para bolas identificada na consulta da categoria.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba Penalty SAC", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07FVXX4RD", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-rainha-pro-2", slug: "bola-rainha-pro-2", name: "Bola Rainha Vôlei Oficial Pró 2.0", brand: "Rainha", model: "Pró 2.0", attributes: ["quadra", "bola"], sourceRank: 8, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Rainha Pró 2.0", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DK7V9QXL", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-compressao", slug: "joelheira-compressao-esportiva", name: "Joelheira de compressão esportiva", brand: null, model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 9, description: "Suporte esportivo descrito para uso em vôlei e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira esportiva", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0H1DSGS2V", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-soft-xxiii", slug: "bola-penalty-soft-xxiii", name: "Bola Penalty Soft XXIII", brand: "Penalty", model: "Soft XXIII", attributes: ["quadra", "bola"], sourceRank: 10, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty Soft XXIII", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CJKTD1Y8", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-snake", slug: "joelheira-snake", name: "Joelheira de compressão Snake", brand: "Snake", model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 14, description: "Joelheira esportiva listada para vôlei e outras modalidades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Snake", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09Z777DNH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-intex-rede-piscina", slug: "kit-volei-inflavel-intex", name: "Kit de vôlei inflável Intex para piscina", brand: "Intex", model: "56508EP", attributes: ["rede", "piscina", "lazer"], sourceRank: 17, description: "Kit recreativo de vôlei para piscina identificado na consulta.", category: "volei", subcategory: "Redes e lazer", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o kit de vôlei Intex", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B002V1H0W2", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-kit-manguito-joelheira", slug: "kit-manguito-joelheira-volei", name: "Kit de manguito e joelheira para vôlei", brand: null, model: null, attributes: ["manguito", "joelheira", "proteção"], sourceRank: 18, description: "Acessórios de proteção esportiva listados para vôlei e outras modalidades.", category: "volei", subcategory: "Proteção esportiva", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o kit esportivo", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0F95B2N3X", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-muvin-manguito-curto", slug: "manguito-curto-muvin-arrow", name: "Manguito curto de voleibol Muvin Arrow", brand: "Muvin", model: "Arrow MGT-100", attributes: ["manguito", "vôlei", "proteção"], sourceRank: 22, description: "Manguito esportivo identificado na consulta da categoria.", category: "volei", subcategory: "Acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o manguito Muvin Arrow", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07FYVH66T", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-vp5000", slug: "bola-penalty-vp-5000-x", name: "Bola de vôlei Penalty VP 5000 X", brand: "Penalty", model: "VP 5000 X", attributes: ["quadra", "bola"], sourceRank: 23, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty VP 5000 X", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07T85Q7CW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheiras-futsal", slug: "joelheiras-volei-futsal", name: "Joelheiras esportivas para vôlei e futsal", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 24, description: "Joelheiras listadas para vôlei, futsal, dança e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras esportivas", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DLWRX4J2", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheiras-infantis", slug: "joelheiras-infantis-volei", name: "Joelheiras infantis para vôlei e esportes", brand: null, model: null, attributes: ["joelheira", "infantil", "proteção"], sourceRank: 25, description: "Joelheiras infantis listadas para vôlei, handebol e futsal.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras infantis", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DLPFWG9S", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-mg3600", slug: "bola-penalty-mg-3600-xxi", name: "Bola de vôlei Penalty MG 3600 XXI", brand: "Penalty", model: "MG 3600 XXI", attributes: ["quadra", "bola"], sourceRank: 27, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty MG 3600 XXI", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09HRBMQVH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-esportiva", slug: "joelheira-esportiva-compressao", name: "Joelheira esportiva de compressão", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 29, description: "Suporte para joelho listado para vôlei, basquete e treinos.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira esportiva", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HJF6PCFB", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-triatleta-acepro", slug: "joelheira-triatleta-acepro", name: "Joelheira Triatleta AcePro para vôlei", brand: "Triatleta Esportes", model: "AcePro", attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 51, description: "Joelheira esportiva identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Triatleta AcePro", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0FMB1ZVMT", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-liveup-bomba-dupla", slug: "bomba-liveup-dupla-acao", name: "Bomba de inflar dupla ação LiveUp Sports", brand: "LiveUp Sports", model: null, attributes: ["bomba", "inflar", "bola"], sourceRank: 52, description: "Bomba esportiva manual identificada na segunda página consultada.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba LiveUp Sports", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07G4LHH1K", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-vr600", slug: "joelheira-vollo-vr600", name: "Joelheira elástica ajustável Vollo", brand: "Vollo", model: "VR600", attributes: ["joelheira", "proteção"], sourceRank: 56, description: "Joelheira elástica identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Vollo VR600", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DDQHX46N", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-hastes", slug: "joelheira-vollo-hastes-flexiveis", name: "Joelheira ajustável Vollo com hastes flexíveis", brand: "Vollo", model: null, attributes: ["joelheira", "proteção"], sourceRank: 57, description: "Joelheira ajustável identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Vollo", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DDQHX45Z", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bola-classica-premium", slug: "bola-volei-classica-premium-n5", name: "Bola de vôlei clássica Premium nº 5", brand: null, model: "Nº 5", attributes: ["quadra", "praia", "bola"], sourceRank: 58, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola de vôlei Premium", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GFWVMVY1", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-ortopedica", slug: "joelheira-ortopedica-esportiva", name: "Joelheira ortopédica de compressão esportiva", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 59, description: "Suporte de joelho descrito para vôlei e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira ortopédica", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HGMDZXXL", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-topper-v200", slug: "bola-topper-v200", name: "Bola de vôlei Topper V200", brand: "Topper", model: "V200", attributes: ["quadra", "bola"], sourceRank: 60, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Topper V200", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HGYMJ4QW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-muvin-manguito-elite", slug: "manguito-muvin-elite", name: "Manguito curto de voleibol Muvin Elite", brand: "Muvin", model: "Elite", attributes: ["manguito", "vôlei", "proteção"], sourceRank: 61, description: "Manguito esportivo identificado na segunda página consultada.", category: "volei", subcategory: "Acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o manguito Muvin Elite", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07H2LL3FC", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-liveup-bomba-manual", slug: "bomba-liveup-manual-6-polegadas", name: "Bomba manual LiveUp Sports de 6 polegadas", brand: "LiveUp Sports", model: null, attributes: ["bomba", "agulha", "bola"], sourceRank: 63, description: "Bomba manual esportiva identificada na segunda página consultada.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba LiveUp Sports", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07KCHDSZ9", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-vp5100", slug: "bola-penalty-vp-5100-xxvi", name: "Bola de vôlei Penalty VP 5100 XXVI", brand: "Penalty", model: "VP 5100 XXVI", attributes: ["quadra", "bola"], sourceRank: 65, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty VP 5100 XXVI", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GL3PGPQZ", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bomba-manual-esportiva", slug: "bomba-manual-bolas-esportes", name: "Bomba manual para bolas esportivas", brand: null, model: null, attributes: ["bomba", "agulha", "bola"], sourceRank: 66, description: "Bomba manual listada para bolas de vôlei, futebol e basquete.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba manual esportiva", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GXWV7WDH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-espuma", slug: "joelheira-antiderrapante-espuma", name: "Joelheiras antiderrapantes com espuma", brand: "Storeasy", model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 73, description: "Joelheiras esportivas identificadas na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras esportivas", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GPH8GVCX", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bola-profissional", slug: "bola-volei-profissional-sintetica", name: "Bola de vôlei profissional em material sintético", brand: null, model: null, attributes: ["quadra", "bola"], sourceRank: 80, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola profissional de vôlei", merchant: "", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0G1NBT7GS", active: true, featured: false, priceUpdatedAt: null },
  ...footballProducts,
];
export const allowedProductImageHosts: readonly string[] = [];

export function filterProducts(
  products: readonly Product[],
  filters: ProductFilters,
): Product[] {
  const query = normalizeSearchText(filters.query);
  const matches = products.filter((product) => {
    const matchesSport = isProductInSport(product, filters.sport);
    const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
    const matchesFootballType = !filters.footballType || product.footballTypes?.includes(filters.footballType) === true;
    const searchableText = normalizeSearchText(`${product.name} ${product.brand ?? ""} ${product.model ?? ""} ${product.description} ${product.subcategory} ${(product.attributes ?? []).join(" ")}`);
    const matchesBrand = !filters.brand || product.brand === filters.brand;

    return matchesSport && matchesSubcategory && matchesBrand && matchesFootballType && (!query || searchableText.includes(query));
  });

  if (filters.priceOrder === "relevance") {
    if (filters.sport === "todos") return matches;
    const selectedSport = filters.sport;

    return matches
      .map((product, index) => ({ product, index }))
      .sort((left, right) => {
        const leftRank = left.product.sourceRankBySport?.[selectedSport] ?? left.product.sourceRank ?? Number.POSITIVE_INFINITY;
        const rightRank = right.product.sourceRankBySport?.[selectedSport] ?? right.product.sourceRank ?? Number.POSITIVE_INFINITY;
        return leftRank - rightRank || left.index - right.index;
      })
      .map(({ product }) => product);
  }
  if (filters.priceOrder === "name-asc") return matches.sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));

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

export function isProductInSport(product: Product, sport: SportFilter): boolean {
  return sport === "todos" || product.category === sport || product.relatedSports?.includes(sport) === true;
}