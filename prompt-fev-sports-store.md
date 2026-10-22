# PROMPT MESTRE --- DESENVOLVIMENTO COMPLETO DA F&V SPORTS STORE

## 1. PAPEL E RESPONSABILIDADE

Atue como um engenheiro de software sênior, arquiteto de aplicações web,
especialista em Next.js, TypeScript, UX/UI responsiva, SEO técnico,
segurança e desenvolvimento de lojas de afiliados.

Sua missão é planejar, desenvolver, testar e preparar para publicação
uma loja virtual de afiliados chamada **F&V Sports Store**,
especializada em produtos de futebol e vôlei.

Não quero apenas uma demonstração visual, um protótipo estático ou
instruções teóricas. Quero uma aplicação funcional, organizada,
responsiva, com código real, pronta para receber links de afiliados
válidos e ser publicada na Netlify.

Trabalhe diretamente nos arquivos do projeto quando o ambiente permitir.
Não se limite a explicar como eu poderia implementar.

## 2. CONTEXTO DO NEGÓCIO

A F&V Sports Store será uma loja independente de afiliados, relacionada
à comunidade esportiva do aplicativo F&V Sports.

Contexto:

-   Nome: F&V Sports Store.
-   Segmentos: futebol e vôlei.
-   Modelo comercial: divulgação de produtos de terceiros por links de
    afiliados.
-   Público: jogadores amadores, pessoas que participam de partidas,
    atletas recreativos e praticantes de esportes.
-   País inicial: Brasil.
-   Idioma: português brasileiro.
-   Moeda: real brasileiro (BRL).
-   Orçamento inicial: R\$ 0.
-   Hospedagem desejada: Netlify, usando um plano gratuito disponível e
    compatível.
-   Origem inicial do tráfego: usuários do F&V Sports, indicações de
    amigos, grupos de futebol e vôlei e redes sociais.
-   Objetivo principal: validar o interesse pelos produtos e gerar
    comissões de afiliados sem investir em estoque ou desenvolver um
    sistema próprio de pagamentos.

A loja deverá ser um projeto independente. Não transforme o aplicativo
F&V Sports em uma loja integrada e não migre sua lógica de negócio para
este projeto.

## 3. REGRAS INEGOCIÁVEIS

1.  Não invente produtos reais, preços, descontos, avaliações, links de
    afiliados, disponibilidade de estoque ou comissões.
2.  Não implemente checkout próprio, pagamentos, carrinho de compras,
    gestão de estoque ou pedidos nesta primeira versão.
3.  Não exija login ou cadastro para navegar.
4.  Não adicione dependências desnecessárias ou serviços pagos.
5.  Não coloque segredos, tokens privados ou credenciais nos arquivos
    públicos do frontend.
6.  Não utilize links fictícios como se fossem links de afiliados
    válidos.
7.  Não use imagens sem origem ou autorização de uso apropriada.
8.  Não prometa descontos, frete grátis ou condições comerciais que não
    estejam confirmados.
9.  Não crie funcionalidades apenas decorativas. Todo controle
    interativo deverá funcionar.
10. Não afirme que a aplicação foi testada, publicada ou integrada se
    isso não tiver sido efetivamente realizado.
11. Não modifique o repositório ou o funcionamento do aplicativo F&V
    Sports.
12. Não comece a desenvolver sem verificar primeiro os arquivos e as
    condições do ambiente.
13. Não interrompa o trabalho após apresentar o planejamento. Prossiga
    com a implementação, os testes e a documentação, dentro das
    capacidades e permissões disponíveis.

## 4. ARQUITETURA E TECNOLOGIAS

Utilize preferencialmente:

-   Next.js com App Router.
-   React.
-   TypeScript em modo estrito.
-   CSS responsivo e organizado.
-   Componentes reutilizáveis.
-   Catálogo local tipado em TypeScript ou JSON.
-   Git para controle de versão.
-   Netlify para hospedagem, desde que a versão do Next.js e as
    funcionalidades utilizadas sejam compatíveis com a integração
    disponível.

Antes de definir versões ou instalar dependências, examine o ambiente e
utilize versões estáveis e compatíveis. Não copie configurações antigas
sem verificar sua validade.

Se o projeto já tiver uma estrutura adequada, aproveite-a. Se estiver
vazio, inicialize a aplicação de maneira limpa.

Não adicione Supabase, banco de dados, autenticação ou backend
personalizado sem uma necessidade comprovada nesta fase.

A arquitetura deve permitir migrar o catálogo para uma fonte de dados
externa no futuro sem reescrever todos os componentes.

## 5. IDENTIDADE VISUAL

Crie uma identidade visual moderna, esportiva, profissional e comercial.

Nome da marca: F&V Sports Store.

Conceito visual:

-   Fundo grafite ou azul-marinho muito escuro nas áreas de destaque.
-   Branco para legibilidade.
-   Verde-lima como cor de destaque.
-   Tipografia forte, moderna e de fácil leitura.
-   Ícones esportivos discretos.
-   Cards de produtos organizados e consistentes.
-   Bordas e sombras moderadas.
-   Animações discretas, rápidas e não intrusivas.
-   Contraste adequado e acessibilidade.
-   Aparência profissional, sem excesso de elementos visuais.

Crie um logotipo tipográfico ou símbolo vetorial simples, original e
implementado localmente, sem depender de imagens de marcas de terceiros.

A interface não deve parecer um template genérico inacabado. Desenvolva
uma hierarquia visual coerente, com atenção a espaçamento, tipografia,
botões, estados de interação, imagens e comportamento responsivo.

Não use emojis como substitutos permanentes de ícones profissionais na
interface.

## 6. ESTRUTURA DA PÁGINA INICIAL

Desenvolva uma página inicial completa com as seguintes seções.

### 6.1 Cabeçalho

Incluir:

-   Logo F&V Sports Store.
-   Navegação para Início, Futebol e Vôlei.
-   Campo ou botão de pesquisa.
-   Menu adaptado para dispositivos móveis.
-   Acesso visível às categorias.

Não crie ícone de carrinho, conta de usuário ou favoritos se essas
funcionalidades não forem implementadas.

### 6.2 Hero principal

Criar uma área de destaque com:

Título principal: "EQUIPADO PARA O JOGO."

Texto de apoio: "Encontre equipamentos e acessórios para sua próxima
partida."

Botões: - "Explorar futebol". - "Explorar vôlei".

Os botões devem levar às respectivas seções ou aplicar o filtro
correspondente.

Utilize uma imagem esportiva de boa qualidade, com origem autorizada e
carregamento otimizado. Se não houver imagem disponível, crie uma
composição visual com CSS e elementos vetoriais próprios, em vez de
utilizar uma URL inventada.

### 6.3 Categorias

Apresente duas categorias principais:

**Futebol** - Chuteiras. - Bolas. - Caneleiras. - Meiões. - Bolsas
esportivas. - Bombas para bolas. - Cones e acessórios de treino.

**Vôlei** - Bolas de vôlei. - Joelheiras. - Tênis para quadra. - Mangas
e acessórios esportivos. - Bolsas e equipamentos de treino.

As categorias devem permitir filtrar os produtos realmente cadastrados.

Não mostre categorias vazias como se houvesse ofertas disponíveis.

### 6.4 Área de produtos

Crie uma grade de produtos responsiva com:

-   Imagem.
-   Nome.
-   Categoria.
-   Preço, quando confirmado.
-   Nome do vendedor ou marketplace.
-   Informação de preço atualizado em determinada data, quando houver
    essa informação.
-   Botão "Ver oferta".
-   Identificação discreta de oferta em destaque, somente quando houver
    fundamento real para isso.

Inclua estados de carregamento quando necessários, ausência de produtos
e falha no carregamento de imagens.

Não crie contadores falsos de vendas, escassez artificial, cronômetros,
avaliações inventadas ou mensagens de urgência enganosas.

### 6.5 Pesquisa e filtros

Implementar:

-   Pesquisa por nome do produto.
-   Filtro por modalidade: todas, futebol e vôlei.
-   Filtro por categoria.
-   Ordenação por preço crescente e decrescente, apenas quando os preços
    forem válidos e comparáveis.
-   Opção para limpar filtros.
-   Mensagem útil quando nenhum produto corresponder à pesquisa.

Os filtros devem funcionar em conjunto. Não devem apagar a pesquisa do
usuário sem motivo.

### 6.6 Produtos em destaque

Permitir que os produtos sejam marcados como destaque no catálogo.

Não apresente um produto como mais vendido, melhor avaliado ou mais
popular sem dados que comprovem essa afirmação.

### 6.7 Rodapé

Incluir:

-   Nome da loja.
-   Navegação para categorias.
-   Política de privacidade.
-   Informação de transparência sobre links de afiliados.
-   Canal de contato configurável.
-   Informações comerciais verdadeiras e verificadas.

Não invente endereço físico, CNPJ, telefone, e-mail ou dados
empresariais.

## 7. MODELO DE DADOS DOS PRODUTOS

Crie um modelo TypeScript consistente, com campos equivalentes a:

-   id: identificador único.
-   slug: identificador legível para URLs, quando necessário.
-   name: nome do produto.
-   description: descrição curta e factual.
-   category: futebol ou vôlei.
-   subcategory: categoria específica.
-   price: preço numérico ou null.
-   currency: BRL.
-   imageUrl: caminho local ou endereço de imagem autorizado.
-   imageAlt: texto alternativo.
-   merchant: nome do vendedor.
-   affiliateUrl: URL real de afiliado ou null enquanto não estiver
    configurada.
-   active: indica se o produto deve ser exibido.
-   featured: indica se pode aparecer em destaque.
-   priceUpdatedAt: data da última verificação do preço, quando
    disponível.

Adapte o modelo se necessário, mantendo a tipagem e a clareza.

Crie inicialmente um catálogo de exemplo claramente identificado como
demonstração, separado do catálogo publicável.

Não publique produtos de demonstração como ofertas reais.

Produtos sem link de afiliado válido não devem exibir um botão que
pareça funcional. Eles podem permanecer no catálogo de desenvolvimento
ou ficar ocultos na produção até serem configurados.

Não codifique URLs de marketplaces como links de afiliados se elas não
tiverem sido geradas ou validadas no programa correspondente.

## 8. LINKS DE AFILIADOS

Implemente uma função centralizada para tratar os links de saída.

Requisitos:

-   Aceitar apenas URLs HTTPS de destinos permitidos e configurados.
-   Validar os links antes de permitir a navegação.
-   Não permitir URLs arbitrárias controladas por parâmetros da URL,
    para evitar redirecionamentos maliciosos.
-   Abrir ofertas externas em nova aba quando apropriado.
-   Usar `target="_blank"` com `rel="sponsored noopener noreferrer"` nos
    links de afiliados que abrirem em nova aba.
-   Exibir uma informação transparente de que a loja pode receber
    comissão por compras elegíveis.
-   Não alterar os links de rastreamento dos programas de afiliados de
    forma que comprometa a atribuição.
-   Não usar encurtadores ou redirecionamentos que violem as regras do
    programa.
-   Não afirmar que a comissão é garantida em todas as compras.

Permita configurar os marketplaces aceitos em um único local do projeto.

Não tente contornar requisitos de aprovação dos programas de afiliados.

## 9. MONETIZAÇÃO E CATÁLOGO INICIAL

A primeira versão deve comportar de 10 a 20 produtos reais, divididos
entre futebol e vôlei, conforme a disponibilidade de boas ofertas.

Priorize:

-   Produtos úteis para jogadores amadores.
-   Acessórios de treino.
-   Equipamentos com preço competitivo.
-   Produtos com avaliações e informações verificáveis.
-   Vendedores confiáveis.
-   Links de afiliados aprovados e válidos.

Não presuma que todos os produtos geram a mesma comissão.

Prepare o sistema para cadastrar produtos manualmente em um arquivo de
dados, sem necessidade de alterar os componentes da interface.

Não implemente integração automática com marketplaces, APIs de produtos
ou scraping sem verificar autorização, requisitos técnicos e regras de
uso.

## 10. ANALYTICS E MÉTRICAS

Implemente uma camada simples e substituível para registrar eventos.

Eventos mínimos:

-   `store_view`: abertura da página da loja.
-   `category_select`: seleção de modalidade ou categoria.
-   `search_submit`: envio de uma pesquisa.
-   `product_view`: visualização de um produto, se houver uma página
    individual.
-   `affiliate_click`: clique no link de afiliado.

Cada evento deve conter apenas os dados necessários, como o
identificador do produto, a categoria, o evento e a origem da visita,
quando disponíveis e apropriados.

Requisitos:

-   Não coletar CPF, telefone, endereço ou outros dados pessoais
    desnecessários.
-   Não armazenar segredos no frontend.
-   Não criar um banco de dados apenas para registrar cliques se uma
    ferramenta gratuita e adequada puder atender ao MVP.
-   Se não houver ferramenta de analytics configurada, criar uma
    interface de analytics que não falhe e documentar como habilitá-la.
-   Respeitar as regras de privacidade e o consentimento exigido para as
    tecnologias de rastreamento utilizadas.
-   Não afirmar que uma compra aconteceu com base apenas em um clique.

As vendas e comissões confirmadas devem ser verificadas nos relatórios
oficiais do programa de afiliados.

## 11. SEO E COMPARTILHAMENTO

Implementar:

-   Título e descrição SEO da página inicial.
-   Metadados específicos para as categorias.
-   Open Graph e informações de compartilhamento.
-   URLs canônicas quando houver um domínio definitivo.
-   Sitemap e robots.txt adequados ao projeto.
-   HTML semântico.
-   URLs estáveis e legíveis, quando forem criadas páginas individuais.
-   Textos originais, claros e úteis.

Não invente dados estruturados, avaliações ou informações comerciais.

Não declare páginas como indexáveis se forem páginas de teste ou
conteúdo de demonstração.

## 12. RESPONSIVIDADE E ACESSIBILIDADE

A loja deve funcionar em:

-   Celulares Android.
-   iPhones.
-   Tablets.
-   Notebooks.
-   Desktops.

Requisitos:

-   Layout mobile-first.
-   Menu móvel funcional.
-   Grade de produtos adaptável à largura.
-   Imagens com dimensões definidas e carregamento otimizado.
-   Botões com área de toque adequada.
-   Foco visível para teclado.
-   Contraste legível.
-   Textos alternativos nas imagens.
-   Formulários e controles com rótulos acessíveis.
-   Respeito à preferência de redução de movimento.
-   Nenhum conteúdo cortado ou rolagem horizontal indevida.

Priorize o desempenho em conexões móveis.

## 13. SEGURANÇA E PRIVACIDADE

-   Não inserir chaves privadas no código do navegador.
-   Não executar HTML recebido de fontes externas.
-   Validar dados de entrada.
-   Evitar dependências desnecessárias.
-   Manter dependências atualizadas e compatíveis.
-   Criar política de privacidade compatível com as tecnologias
    efetivamente utilizadas.
-   Documentar a finalidade de analytics e cookies.
-   Não implementar cookies publicitários ou rastreadores sem avaliar a
    necessidade de consentimento.
-   Não inventar informações legais ou empresariais.
-   Não publicar dados de usuários do F&V Sports na loja.

## 14. PUBLICAÇÃO NA NETLIFY

Prepare a aplicação para publicação na Netlify.

Antes de configurar:

1.  Verifique a compatibilidade entre a versão escolhida do Next.js e a
    integração disponível na Netlify.
2.  Configure o comando de build e a versão do Node.js de forma
    compatível.
3.  Evite configurar exportação estática se a aplicação exigir
    funcionalidades incompatíveis com esse modo.
4.  Documente as variáveis de ambiente necessárias, sem inserir valores
    secretos no repositório.
5.  Prepare instruções de deploy pelo GitHub.
6.  Documente como validar a versão de produção.
7.  Utilize o endereço gratuito fornecido pela Netlify inicialmente, se
    disponível.

Não afirme que a loja está publicada sem ter concluído o processo e
verificado o endereço real.

## 15. TESTES OBRIGATÓRIOS

Crie e execute os testes que forem viáveis no ambiente.

Verifique:

-   Instalação de dependências.
-   Compilação TypeScript.
-   Lint.
-   Build de produção.
-   Renderização da página inicial.
-   Funcionamento dos filtros.
-   Pesquisa.
-   Ordenação de preços válidos.
-   Comportamento de produtos sem preço.
-   Comportamento de produtos sem link de afiliado.
-   Validação dos links de saída.
-   Links externos e seus atributos de segurança.
-   Menu móvel.
-   Navegação por teclado.
-   Ausência de erros evidentes no console.
-   Compatibilidade da configuração de deploy.

Se uma ferramenta de teste não estiver instalada, avalie se vale
adicioná-la ou documente a limitação.

Corrija os problemas encontrados antes de declarar a implementação
concluída.

Não esconda erros com configurações que desabilitem verificações
importantes.

## 16. DOCUMENTAÇÃO

Crie um README em português contendo:

-   Objetivo do projeto.
-   Tecnologias.
-   Pré-requisitos.
-   Instalação.
-   Comandos para desenvolvimento.
-   Comando de build.
-   Como cadastrar produtos.
-   Como validar links de afiliados.
-   Como atualizar preços.
-   Como configurar analytics.
-   Como publicar na Netlify.
-   Como configurar variáveis de ambiente.
-   Limitações conhecidas.
-   Lista de tarefas que ainda dependem de aprovação externa.

Explique claramente quais valores precisam ser preenchidos pelo
proprietário da loja.

## 17. PLANO DE EXECUÇÃO

Execute o trabalho nesta ordem:

### Fase A --- Inspeção e planejamento

-   Examine o diretório atual.
-   Verifique se existe projeto e se há arquivos que precisam ser
    preservados.
-   Identifique ferramentas, versões e limitações.
-   Se o diretório contiver outro projeto, não sobrescreva arquivos sem
    autorização.
-   Apresente um resumo breve da arquitetura antes de iniciar mudanças
    relevantes.

### Fase B --- Implementação

-   Criar ou adaptar a estrutura.
-   Implementar identidade visual.
-   Desenvolver componentes.
-   Implementar catálogo e filtros.
-   Implementar links de afiliados.
-   Implementar analytics configurável.
-   Implementar metadados e documentação.
-   Garantir responsividade.

### Fase C --- Verificação

-   Instalar dependências necessárias.
-   Executar lint, TypeScript e build.
-   Corrigir os problemas encontrados.
-   Verificar o funcionamento das interações.
-   Conferir a configuração de publicação.

### Fase D --- Entrega

Apresente:

1.  Resumo do que foi implementado.
2.  Estrutura dos arquivos criados.
3.  Comandos para executar localmente.
4.  Resultado real dos testes.
5.  Instruções para publicar na Netlify.
6.  Campos que precisam ser preenchidos com produtos e links reais.
7.  Pendências que exigem uma conta, aprovação ou ação do proprietário.
8.  Problemas conhecidos que não puderam ser resolvidos.

Não apresente como concluída uma etapa que não tenha sido executada.

## 18. CRITÉRIOS DE ACEITAÇÃO

A primeira versão será considerada tecnicamente pronta quando:

-   A aplicação executar localmente.
-   A interface estiver completa e responsiva.
-   Futebol e vôlei estiverem implementados como categorias funcionais.
-   Pesquisa e filtros funcionarem.
-   O catálogo for editável sem alterar os componentes visuais.
-   Os produtos de demonstração não forem confundidos com ofertas reais.
-   Os links de afiliados forem validados e configuráveis.
-   A transparência comercial estiver presente.
-   Os eventos de analytics estiverem implementados ou documentados para
    configuração.
-   O build de produção passar.
-   As instruções de deploy estiverem documentadas.
-   O projeto permanecer independente do F&V Sports existente.

## 19. INSTRUÇÃO FINAL

Comece inspecionando o ambiente e verificando se há arquivos existentes
que precisam ser preservados.

Em seguida, execute o plano de desenvolvimento até onde as ferramentas,
permissões e recursos disponíveis permitirem.

Priorize uma aplicação simples, profissional, segura, funcional e fácil
de manter.

Não gaste tempo criando recursos desnecessários. O objetivo é lançar a
F&V Sports Store com custo inicial zero, validar o interesse real dos
usuários e gerar as primeiras comissões de afiliados.

Quando terminar, informe com precisão o que foi criado, testado,
corrigido e o que ainda depende de configuração externa.

**Comece pela inspeção do ambiente e prossiga com a implementação.**
