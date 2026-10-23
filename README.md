# F&V Sports Store

Loja independente de afiliados para equipamentos de futebol e vôlei. Não tem estoque, login, carrinho, checkout ou integração com o aplicativo F&V Sports.

## Tecnologias

- Next.js 16 com App Router, React 19 e TypeScript estrito.
- CSS responsivo, sem biblioteca visual adicional.
- Catálogo tipado em `src/lib/products.ts`.
- Adaptador oficial `@netlify/plugin-nextjs` para publicação na Netlify.
- Testes de domínio com o test runner nativo do Node.js.

## Pré-requisitos e execução

Use Node.js 24 e npm 11 (ou versão compatível). O arquivo `.nvmrc` registra a versão do Node.

```bash
npm install
npm run dev
```

A aplicação local abre em `http://localhost:3000`. Os ambientes de desenvolvimento e produção usam o mesmo catálogo; nenhum produto ilustrativo é inserido automaticamente.

Comandos de verificação:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run start
```

## Catálogo

Edite `publishedProducts` em `src/lib/products.ts` para cadastrar produtos conferidos e autorizados. Cada item contém id, slug, nome, marca/modelo e atributos quando conhecidos, descrição factual, modalidade, subcategoria, preço em BRL ou `null`, imagem e texto alternativo, vendedor, URL do produto Amazon, URL afiliada ou `null`, status, destaque e data de verificação do preço.

O catálogo contém registros locais ativos. Produtos sem preço aparecem como “Preço não informado” e não participam da ordenação por preço. Produtos sem link de afiliado válido continuam visíveis, mas não exibem botão de compra.

Antes de adicionar um item a `publishedProducts`, verifique produto, vendedor, imagem e preço, obtenha o link no programa oficial e confirme as regras aplicáveis. Deixe campos sem comprovação vazios. Atualize `priceUpdatedAt` no formato `AAAA-MM-DD` toda vez que o preço for verificado.

Imagens locais em `public/` são preferíveis. Para imagem remota autorizada, cadastre o hostname HTTPS em `allowedProductImageHosts` em `src/lib/products.ts`; URLs de imagem são rejeitadas se o hostname não estiver nessa lista. Não use imagens sem licença ou autorização.

## Links de afiliados

Cadastre os hosts exatos aprovados em `allowedAffiliateHosts` em `src/lib/affiliate.ts`. O validador exige HTTPS, rejeita credenciais e não aceita subdomínios não listados. Ele preserva a URL original, inclusive parâmetros de rastreamento. Não cadastre um domínio até que a conta/programa confirme a aprovação e a URL seja gerada pelo próprio programa.

Para os produtos Amazon, defina `AMAZON_ASSOCIATE_TAG` com o identificador fornecido pela conta aprovada no programa de associados. O servidor cria URLs `/dp/{ASIN}?tag=...` somente para ASINs cadastrados e tags no formato esperado; sem a variável, os cards permanecem visíveis e o link de compra não é exibido. Não use uma tag de exemplo. Os links abrem em outra aba com `rel="sponsored noopener noreferrer"`. A loja informa que pode receber comissão por compras elegíveis; um clique não é confirmação de venda ou comissão.

### Categoria de vôlei

`/volei` contém 30 produtos identificados na página de mais vendidos consultada em 22/10/2026. Foram cadastrados nomes normalizados, marcas/modelos quando explícitos e destinos individuais observados; preços, imagens, avaliações e disponibilidade não foram importados. A página de referência indicava duas páginas, mas a extração retornou posições 1–30 e 51–80; posições 31–50 permanecem sem identificação. A seleção não é uma lista completa nem um ranking atual. Antes de ampliar o catálogo, valide os dados e destinos por uma fonte autorizada (preferencialmente PA-API ou cadastro administrativo) e confirme as regras do programa.

### Categoria de futebol

`/futebol` usa o nome observado na referência: “Itens para jogar Futebol”. O catálogo mostra 29 produtos relacionados, de 27 registros novos e dois infladores de bola já compartilhados com a categoria de vôlei. Inclui bolas, chuteiras de campo/futsal/society, luvas de goleiro, mini-gol, camisas de torcida, roupa de treino, acessórios, cones e apitos. A referência apresentou posições 1–30 e 51–80, deixando 31–50 sem dados; itens de outras modalidades, camisetas esportivas genéricas e variações repetidas do mesmo anúncio foram excluídos. A ordem é o ranking observado em 22/10/2026, não uma classificação atual.

#### Relatório de imagens

Nenhuma imagem oficial foi obtida por fonte autorizada, exibida ou baixada. Os 29 produtos da página permanecem sem imagem de produto e usam o placeholder já existente, identificado como pendente. Para os 27 registros novos, `imageSourceUrl` e `imageVerifiedAt` ficam vazios e `imageSourceType` fica como `pending`. A extração da referência não retornou URLs de imagem que pudessem ser verificadas; não há origem ou permissão de uso confirmada. Para preencher imagens, use PA-API com acesso aprovado ou material autorizado pelo administrador, registrando origem, URL e data de verificação.

#### Atualização

Os novos itens ficam separados da interface em `footballProducts`, em `src/lib/products.ts`. Os dois infladores existentes recebem `relatedSports` para aparecerem nas duas modalidades sem duplicar IDs/ASINs. Adicione apenas registros conferidos, mantenha a posição da fonte em `sourceRank`, classifique `footballTypes` somente quando o tipo estiver explícito e deixe preço/imagem vazios até confirmar fonte e autorização.

## Analytics e privacidade

Sem provedor externo configurado, nenhum evento é enviado ou armazenado. `trackEvent` em `src/lib/analytics.ts` emite um evento local `fv:analytics` para integração futura. Os eventos permitidos são `store_view`, `category_select`, `search_submit`, `product_view` e `affiliate_click`, sem dados de cadastro ou pagamento.

Para habilitar um provedor, integre um listener para `fv:analytics` na camada cliente somente depois de escolher o serviço, revisar seus termos e documentar cookies, consentimento aplicável e retenção. Não inclua chaves privadas no frontend. A página `/privacidade` deve ser revista pelo responsável antes da publicação.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` no desenvolvimento ou cadastre as variáveis nas configurações do site da Netlify:

- `NEXT_PUBLIC_SITE_URL`: domínio público HTTPS definitivo. Enquanto vazio, não são declarados canonical nem sitemap com domínio inventado.
- `NEXT_PUBLIC_STORE_CONTACT_EMAIL`: e-mail de contato comercial real, se houver.
- `AMAZON_ASSOCIATE_TAG`: identificador de associado Amazon aprovado; sem ele, não há links de compra ativos.
- `ADMIN_PASSWORD`: senha exclusiva do painel administrativo. A rota permanece bloqueada enquanto não estiver configurada.
- `ADMIN_SESSION_SECRET`: chave privada para assinar sessões administrativas. Gere um valor aleatório forte e não o publique.

Somente as variáveis com prefixo `NEXT_PUBLIC_` são expostas ao navegador; nunca use esse prefixo para credenciais. `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` devem permanecer exclusivamente no ambiente server-side.

## Publicação na Netlify

1. Envie este repositório para um repositório GitHub independente do F&V Sports.
2. Na Netlify, escolha **Add new site > Import an existing project** e conecte o GitHub.
3. Mantenha `npm run build` como comando e `.next` como diretório publicado; `netlify.toml` já registra esses valores e o plugin Next.js.
4. Configure `NEXT_PUBLIC_SITE_URL` com o endereço HTTPS fornecido pela Netlify, `AMAZON_ASSOCIATE_TAG` com a tag aprovada, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` em **Site configuration > Environment variables**, e, se desejado, `NEXT_PUBLIC_STORE_CONTACT_EMAIL`.
5. Dispare um novo deploy depois de configurar variáveis. Confira as páginas `/`, `/futebol`, `/volei`, `/privacidade`, `/robots.txt` e `/sitemap.xml`, além dos links de saída, no domínio publicado.

O build local foi verificado com Next.js 16.4.2 e o plugin Netlify 5.16.4. A publicação remota e a compatibilidade da conta/plano não foram testadas neste ambiente; nenhum domínio foi criado nem deploy foi feito.

## Painel administrativo

O painel fica em `/admin` e usa senha server-side com cookie HttpOnly, SameSite Strict e sessão assinada de oito horas. Configure `ADMIN_PASSWORD` (mínimo de 16 caracteres) e `ADMIN_SESSION_SECRET` (mínimo de 32 bytes) antes de acessar; não há senha padrão. Gere a chave de sessão com `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` e guarde ambos os valores como variáveis privadas do servidor, nunca com prefixo `NEXT_PUBLIC_`.

Produtos e categorias do painel são persistidos em `localStorage` no navegador onde foram cadastrados. O seed inicial deriva somente de `publishedProducts`; alterações não são compartilhadas com visitantes, outros dispositivos ou deploys. O botão **Exportar JSON** permite guardar uma cópia para migração. URLs de imagem podem ser adicionadas, substituídas ou removidas no formulário; arquivos não são enviados nem armazenados. Nenhuma conexão Supabase é criada nesta etapa.

Para migrar futuramente, implemente outro `CatalogRepository` usando as tabelas de produtos/categorias e substitua o adaptador local sem alterar as telas. Crie tabelas relacionais com IDs, `created_at`/`updated_at`, RLS que permita operações administrativas apenas para usuários autenticados autorizados e buckets privados ou políticas de Storage apropriadas; então configure as chaves Supabase somente no servidor e migre o JSON exportado. O seed importado deve ser revisado antes de virar fonte pública.

## Pendências externas antes do lançamento

- Aprovar a loja nos programas de afiliados escolhidos e preencher os hosts/URLs oficiais.
- Verificar a disponibilidade e os destinos atuais dos produtos; obter preços e imagens apenas por fonte autorizada.
- Informar canal de contato e domínio definitivo, quando disponíveis.
- Revisar a política de privacidade e os requisitos legais/comerciais aplicáveis.
- Criar/conectar a conta Netlify e validar o deploy real.
- Decidir se analytics será necessário; por padrão, não há ferramenta nem cookies de analytics.

## Limitações conhecidas

- O catálogo contém 57 registros locais; preços e imagens permanecem vazios até serem verificados por fontes autorizadas.
- Sem sincronização automática de preço/estoque; atualização é manual.
- Não há páginas individuais de produto, checkout, contas ou processamento de pedidos.
- `npm audit` reporta cinco alertas altos em dependência de desenvolvimento `braces@3.0.3`, trazida por `eslint-config-next`/plugin de lint. O advisory afeta versões `<=3.0.3`, não há versão corrigida publicada disponível no registry consultado, e `npm audit fix --force` propõe downgrade incompatível para ESLint do Next 14. As dependências de produção não apresentam vulnerabilidades no audit atual (`npm audit --omit=dev`).
- Reavalie o advisory quando atualizar as dependências ou quando o upstream publicar uma correção.
