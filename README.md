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

A aplicação local abre em `http://localhost:3000`. Em desenvolvimento, o catálogo mostra itens demonstrativos sem preço, imagem real ou link de compra. Eles não são publicados como ofertas.

Comandos de verificação:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run start
```

## Catálogo

Edite `publishedProducts` em `src/lib/products.ts` para cadastrar somente produtos conferidos e autorizados. Cada item contém id, slug, nome, descrição factual, modalidade, subcategoria, preço em BRL ou `null`, imagem e texto alternativo, vendedor, URL afiliada ou `null`, status, destaque e data de verificação do preço.

O catálogo público começa vazio. Em produção, só aparecem itens ativos com um link HTTPS válido em um host configurado. Produto sem preço pode ser exibido como “Preço não informado”, mas não participa da ordenação por preço. Produtos sem link válido não exibem botão de oferta.

Não copie exemplos para `publishedProducts` como se fossem ofertas reais. O responsável deve verificar produto, vendedor, imagem e preço, conseguir o link no programa oficial e confirmar suas regras antes de ativá-lo. Atualize `priceUpdatedAt` no formato `AAAA-MM-DD` toda vez que o preço for verificado.

Imagens locais em `public/` são preferíveis. Para imagem remota autorizada, cadastre o hostname HTTPS em `allowedProductImageHosts` em `src/lib/products.ts`; URLs de imagem são rejeitadas se o hostname não estiver nessa lista. Não use imagens sem licença ou autorização.

## Links de afiliados

Cadastre os hosts exatos aprovados em `allowedAffiliateHosts` em `src/lib/affiliate.ts`. O validador exige HTTPS, rejeita credenciais e não aceita subdomínios não listados. Ele preserva a URL original, inclusive parâmetros de rastreamento. Não cadastre um domínio até que a conta/programa confirme a aprovação e a URL seja gerada pelo próprio programa.

Os links abrem em outra aba com `rel="sponsored noopener noreferrer"`. A loja informa que pode receber comissão por compras elegíveis; um clique não é confirmação de venda ou comissão. O botão de oferta só é renderizado para link válido.

## Analytics e privacidade

Sem provedor externo configurado, nenhum evento é enviado ou armazenado. `trackEvent` em `src/lib/analytics.ts` emite um evento local `fv:analytics` para integração futura. Os eventos permitidos são `store_view`, `category_select`, `search_submit`, `product_view` e `affiliate_click`, sem dados de cadastro ou pagamento.

Para habilitar um provedor, integre um listener para `fv:analytics` na camada cliente somente depois de escolher o serviço, revisar seus termos e documentar cookies, consentimento aplicável e retenção. Não inclua chaves privadas no frontend. A página `/privacidade` deve ser revista pelo responsável antes da publicação.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` no desenvolvimento ou cadastre as variáveis nas configurações do site da Netlify:

- `NEXT_PUBLIC_SITE_URL`: domínio público HTTPS definitivo. Enquanto vazio, não são declarados canonical nem sitemap com domínio inventado.
- `NEXT_PUBLIC_STORE_CONTACT_EMAIL`: e-mail de contato comercial real, se houver.

Esses valores são públicos por definição do prefixo `NEXT_PUBLIC_`; nunca coloque tokens ou credenciais neles. Não há segredos necessários para o MVP.

## Publicação na Netlify

1. Envie este repositório para um repositório GitHub independente do F&V Sports.
2. Na Netlify, escolha **Add new site > Import an existing project** e conecte o GitHub.
3. Mantenha `npm run build` como comando e `.next` como diretório publicado; `netlify.toml` já registra esses valores e o plugin Next.js.
4. Configure `NEXT_PUBLIC_SITE_URL` com o endereço HTTPS fornecido pela Netlify depois de criar o site e, se desejado, `NEXT_PUBLIC_STORE_CONTACT_EMAIL`.
5. Dispare um novo deploy depois de configurar variáveis. Confira as páginas `/`, `/futebol`, `/volei`, `/privacidade`, `/robots.txt` e `/sitemap.xml`, além dos links de saída, no domínio publicado.

O build local foi verificado com Next.js 16.4.2 e o plugin Netlify 5.16.4. A publicação remota e a compatibilidade da conta/plano não foram testadas neste ambiente; nenhum domínio foi criado nem deploy foi feito.

## Pendências externas antes do lançamento

- Aprovar a loja nos programas de afiliados escolhidos e preencher os hosts/URLs oficiais.
- Selecionar e verificar de 10 a 20 produtos reais, vendedores, preços e imagens autorizadas.
- Informar canal de contato e domínio definitivo, quando disponíveis.
- Revisar a política de privacidade e os requisitos legais/comerciais aplicáveis.
- Criar/conectar a conta Netlify e validar o deploy real.
- Decidir se analytics será necessário; por padrão, não há ferramenta nem cookies de analytics.

## Limitações conhecidas

- Catálogo público vazio até cadastro de ofertas aprovadas.
- Sem sincronização automática de preço/estoque; atualização é manual.
- Não há páginas individuais de produto, checkout, contas ou processamento de pedidos.
- `npm audit` reporta cinco alertas altos em dependência de desenvolvimento `braces@3.0.3`, trazida por `eslint-config-next`/plugin de lint. O advisory afeta versões `<=3.0.3`, não há versão corrigida publicada disponível no registry consultado, e `npm audit fix --force` propõe downgrade incompatível para ESLint do Next 14. As dependências de produção não apresentam vulnerabilidades no audit atual (`npm audit --omit=dev`).
- Reavalie o advisory quando atualizar as dependências ou quando o upstream publicar uma correção.
