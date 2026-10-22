export type Sport = "futebol" | "volei";
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
  amazonUrl?: string | null;
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
  priceOrder: PriceOrder;
};

export const publishedProducts: readonly Product[] = [
  { id: "volei-mikasa-bv552c", slug: "bola-mikasa-bv552c-praia", name: "Bola Mikasa BV552C para vôlei de praia", brand: "Mikasa", model: "BV552C", attributes: ["praia", "bola"], sourceRank: 2, description: "Bola de vôlei de praia identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Mikasa BV552C", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CLZHRQK8", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-mikasa-v360w", slug: "bola-mikasa-v360w-quadra", name: "Bola Mikasa V360W para vôlei de quadra", brand: "Mikasa", model: "V360W", attributes: ["quadra", "bola"], sourceRank: 3, description: "Bola de quadra identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Mikasa V360W", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CLTSRYQW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-bomba-hp001-2", slug: "bomba-vollo-hp001-2", name: "Bomba de inflar dupla ação Vollo", brand: "Vollo", model: "HP001-2", attributes: ["bomba", "inflar", "bola"], sourceRank: 4, description: "Bomba manual de dupla ação listada entre os itens da categoria.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba Vollo", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09LR6DR89", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-tornozeleira-compressao", slug: "tornozeleira-compressao-esportiva", name: "Tornozeleira ortopédica de compressão ajustável", brand: null, model: null, attributes: ["proteção", "compressão", "esportes"], sourceRank: 5, description: "Tornozeleira esportiva listada na categoria; confira indicação e tamanho no destino.", category: "volei", subcategory: "Proteção esportiva", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a tornozeleira esportiva", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0D4FG4SGK", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-bomba-sac", slug: "bomba-penalty-sac", name: "Bomba manual Penalty SAC com agulha", brand: "Penalty", model: "SAC", attributes: ["bomba", "agulha", "bola"], sourceRank: 7, description: "Bomba manual para bolas identificada na consulta da categoria.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba Penalty SAC", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07FVXX4RD", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-rainha-pro-2", slug: "bola-rainha-pro-2", name: "Bola Rainha Vôlei Oficial Pró 2.0", brand: "Rainha", model: "Pró 2.0", attributes: ["quadra", "bola"], sourceRank: 8, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Rainha Pró 2.0", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DK7V9QXL", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-compressao", slug: "joelheira-compressao-esportiva", name: "Joelheira de compressão esportiva", brand: null, model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 9, description: "Suporte esportivo descrito para uso em vôlei e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira esportiva", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0H1DSGS2V", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-soft-xxiii", slug: "bola-penalty-soft-xxiii", name: "Bola Penalty Soft XXIII", brand: "Penalty", model: "Soft XXIII", attributes: ["quadra", "bola"], sourceRank: 10, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty Soft XXIII", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0CJKTD1Y8", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-snake", slug: "joelheira-snake", name: "Joelheira de compressão Snake", brand: "Snake", model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 14, description: "Joelheira esportiva listada para vôlei e outras modalidades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Snake", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09Z777DNH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-intex-rede-piscina", slug: "kit-volei-inflavel-intex", name: "Kit de vôlei inflável Intex para piscina", brand: "Intex", model: "56508EP", attributes: ["rede", "piscina", "lazer"], sourceRank: 17, description: "Kit recreativo de vôlei para piscina identificado na consulta.", category: "volei", subcategory: "Redes e lazer", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o kit de vôlei Intex", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B002V1H0W2", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-kit-manguito-joelheira", slug: "kit-manguito-joelheira-volei", name: "Kit de manguito e joelheira para vôlei", brand: null, model: null, attributes: ["manguito", "joelheira", "proteção"], sourceRank: 18, description: "Acessórios de proteção esportiva listados para vôlei e outras modalidades.", category: "volei", subcategory: "Proteção esportiva", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o kit esportivo", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0F95B2N3X", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-muvin-manguito-curto", slug: "manguito-curto-muvin-arrow", name: "Manguito curto de voleibol Muvin Arrow", brand: "Muvin", model: "Arrow MGT-100", attributes: ["manguito", "vôlei", "proteção"], sourceRank: 22, description: "Manguito esportivo identificado na consulta da categoria.", category: "volei", subcategory: "Acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o manguito Muvin Arrow", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07FYVH66T", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-vp5000", slug: "bola-penalty-vp-5000-x", name: "Bola de vôlei Penalty VP 5000 X", brand: "Penalty", model: "VP 5000 X", attributes: ["quadra", "bola"], sourceRank: 23, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty VP 5000 X", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07T85Q7CW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheiras-futsal", slug: "joelheiras-volei-futsal", name: "Joelheiras esportivas para vôlei e futsal", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 24, description: "Joelheiras listadas para vôlei, futsal, dança e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras esportivas", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DLWRX4J2", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheiras-infantis", slug: "joelheiras-infantis-volei", name: "Joelheiras infantis para vôlei e esportes", brand: null, model: null, attributes: ["joelheira", "infantil", "proteção"], sourceRank: 25, description: "Joelheiras infantis listadas para vôlei, handebol e futsal.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras infantis", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DLPFWG9S", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-mg3600", slug: "bola-penalty-mg-3600-xxi", name: "Bola de vôlei Penalty MG 3600 XXI", brand: "Penalty", model: "MG 3600 XXI", attributes: ["quadra", "bola"], sourceRank: 27, description: "Bola de vôlei identificada na consulta da categoria.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty MG 3600 XXI", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B09HRBMQVH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-esportiva", slug: "joelheira-esportiva-compressao", name: "Joelheira esportiva de compressão", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 29, description: "Suporte para joelho listado para vôlei, basquete e treinos.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira esportiva", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HJF6PCFB", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-triatleta-acepro", slug: "joelheira-triatleta-acepro", name: "Joelheira Triatleta AcePro para vôlei", brand: "Triatleta Esportes", model: "AcePro", attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 51, description: "Joelheira esportiva identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Triatleta AcePro", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0FMB1ZVMT", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-liveup-bomba-dupla", slug: "bomba-liveup-dupla-acao", name: "Bomba de inflar dupla ação LiveUp Sports", brand: "LiveUp Sports", model: null, attributes: ["bomba", "inflar", "bola"], sourceRank: 52, description: "Bomba esportiva manual identificada na segunda página consultada.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba LiveUp Sports", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07G4LHH1K", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-vr600", slug: "joelheira-vollo-vr600", name: "Joelheira elástica ajustável Vollo", brand: "Vollo", model: "VR600", attributes: ["joelheira", "proteção"], sourceRank: 56, description: "Joelheira elástica identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Vollo VR600", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DDQHX46N", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-vollo-hastes", slug: "joelheira-vollo-hastes-flexiveis", name: "Joelheira ajustável Vollo com hastes flexíveis", brand: "Vollo", model: null, attributes: ["joelheira", "proteção"], sourceRank: 57, description: "Joelheira ajustável identificada na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira Vollo", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0DDQHX45Z", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bola-classica-premium", slug: "bola-volei-classica-premium-n5", name: "Bola de vôlei clássica Premium nº 5", brand: null, model: "Nº 5", attributes: ["quadra", "praia", "bola"], sourceRank: 58, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola de vôlei Premium", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GFWVMVY1", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-ortopedica", slug: "joelheira-ortopedica-esportiva", name: "Joelheira ortopédica de compressão esportiva", brand: null, model: null, attributes: ["joelheira", "vôlei", "proteção"], sourceRank: 59, description: "Suporte de joelho descrito para vôlei e outras atividades.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a joelheira ortopédica", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HGMDZXXL", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-topper-v200", slug: "bola-topper-v200", name: "Bola de vôlei Topper V200", brand: "Topper", model: "V200", attributes: ["quadra", "bola"], sourceRank: 60, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Topper V200", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0HGYMJ4QW", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-muvin-manguito-elite", slug: "manguito-muvin-elite", name: "Manguito curto de voleibol Muvin Elite", brand: "Muvin", model: "Elite", attributes: ["manguito", "vôlei", "proteção"], sourceRank: 61, description: "Manguito esportivo identificado na segunda página consultada.", category: "volei", subcategory: "Acessórios", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para o manguito Muvin Elite", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07H2LL3FC", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-liveup-bomba-manual", slug: "bomba-liveup-manual-6-polegadas", name: "Bomba manual LiveUp Sports de 6 polegadas", brand: "LiveUp Sports", model: null, attributes: ["bomba", "agulha", "bola"], sourceRank: 63, description: "Bomba manual esportiva identificada na segunda página consultada.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba LiveUp Sports", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B07KCHDSZ9", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-penalty-vp5100", slug: "bola-penalty-vp-5100-xxvi", name: "Bola de vôlei Penalty VP 5100 XXVI", brand: "Penalty", model: "VP 5100 XXVI", attributes: ["quadra", "bola"], sourceRank: 65, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola Penalty VP 5100 XXVI", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GL3PGPQZ", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bomba-manual-esportiva", slug: "bomba-manual-bolas-esportes", name: "Bomba manual para bolas esportivas", brand: null, model: null, attributes: ["bomba", "agulha", "bola"], sourceRank: 66, description: "Bomba manual listada para bolas de vôlei, futebol e basquete.", category: "volei", subcategory: "Bombas para bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bomba manual esportiva", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GXWV7WDH", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-joelheira-espuma", slug: "joelheira-antiderrapante-espuma", name: "Joelheiras antiderrapantes com espuma", brand: "Storeasy", model: null, attributes: ["joelheira", "proteção", "vôlei"], sourceRank: 73, description: "Joelheiras esportivas identificadas na segunda página consultada.", category: "volei", subcategory: "Joelheiras", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para as joelheiras esportivas", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0GPH8GVCX", active: true, featured: false, priceUpdatedAt: null },
  { id: "volei-bola-profissional", slug: "bola-volei-profissional-sintetica", name: "Bola de vôlei profissional em material sintético", brand: null, model: null, attributes: ["quadra", "bola"], sourceRank: 80, description: "Bola de vôlei identificada na segunda página consultada.", category: "volei", subcategory: "Bolas", price: null, currency: "BRL", imageUrl: null, imageAlt: "Imagem não cadastrada para a bola profissional de vôlei", merchant: "Amazon Brasil", affiliateUrl: null, amazonUrl: "https://www.amazon.com.br/dp/B0G1NBT7GS", active: true, featured: false, priceUpdatedAt: null },
];
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
    const searchableText = normalizeSearchText(`${product.name} ${product.brand ?? ""} ${product.model ?? ""} ${product.description} ${product.subcategory} ${(product.attributes ?? []).join(" ")}`);
    const matchesBrand = !filters.brand || product.brand === filters.brand;

    return matchesSport && matchesSubcategory && matchesBrand && (!query || searchableText.includes(query));
  });

  if (filters.priceOrder === "relevance") return matches;
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