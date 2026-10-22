# PROMPT — CRIAR CATEGORIA COMPLETA DE PRODUTOS DA AMAZON NA F&V SPORTS STORE

## 1. Contexto do projeto

Você é um desenvolvedor sênior especializado em e-commerce, aplicações web modernas, SEO, UX/UI, performance e marketing de afiliados.

Seu objetivo é analisar o projeto existente da **F&V Sports Store** e implementar uma categoria completa de produtos esportivos inspirada na seleção de mais vendidos da Amazon Brasil.

**Página de referência:**
https://www.amazon.com.br/gp/bestsellers/sports/17834068011/ref=zg_bs_nav_sports_2_17833933011

- **Loja:** F&V Sports Store
- **Modelo de negócio:** marketing de afiliados
- **Mercado:** Brasil
- **Idioma:** português brasileiro
- **Moeda:** BRL (R$)
- **Hospedagem:** Netlify
- **Objetivo:** criar uma página de categoria profissional com os produtos identificados na referência, utilizando links de afiliado válidos para direcionar os clientes à Amazon.

Não se limite a criar um layout demonstrativo. Analise o projeto, identifique os produtos que podem ser cadastrados legitimamente, implemente a categoria funcional e teste o resultado.

## 2. Etapa obrigatória: auditoria do projeto

Antes de modificar qualquer arquivo:

1. Analise a estrutura completa do repositório.
2. Identifique o framework, as dependências, os componentes, os estilos e a arquitetura existentes.
3. Localize o catálogo de produtos, os dados de produtos, as páginas de categorias e o sistema de navegação.
4. Identifique o padrão visual atual da F&V Sports Store.
5. Verifique a configuração de rotas, build e deploy na Netlify.
6. Identifique se já existe integração com algum catálogo, API, banco de dados ou sistema de afiliados.
7. Preserve funcionalidades existentes, compatibilidade mobile, SEO e desempenho.
8. Evite duplicar componentes, bibliotecas ou regras CSS.

Não recrie o projeto do zero se a aplicação existente puder ser ampliada com segurança.

## 3. Análise da categoria de referência

Analise a página de referência e identifique a categoria correspondente, seus filtros, a estrutura dos produtos e a quantidade de itens efetivamente disponível.

A investigação deve:

- Identificar os nomes e as variações dos produtos.
- Registrar marca, modelo e descrição quando disponíveis.
- Identificar a imagem oficial de cada produto.
- Registrar o preço somente quando houver uma fonte autorizada e atualizada.
- Identificar a URL original de cada produto na Amazon.
- Verificar a disponibilidade de cada item quando a fonte permitir.
- Identificar a ordem dos produtos na listagem de mais vendidos.
- Investigar paginação, carregamento adicional ou outras formas de listar os itens.
- Distinguir produtos diferentes de variações do mesmo produto.
- Identificar filtros e atributos úteis para a categoria.

Não presuma que a página contém apenas os primeiros produtos visíveis. Investigue a paginação e os mecanismos legítimos de carregamento de conteúdo.

### Regras de integridade dos dados

- Não invente produtos, marcas, preços, avaliações, quantidades vendidas ou disponibilidade.
- Não afirme que todos os produtos foram importados se não houver evidência de que a lista está completa.
- Não utilize técnicas para contornar CAPTCHA, autenticação, bloqueios ou restrições de acesso.
- Respeite os termos da Amazon e os direitos de utilização das imagens, descrições e demais dados comerciais.
- Se não for possível obter legitimamente o catálogo completo, documente a limitação e implemente a categoria com os produtos efetivamente identificados. Prepare uma estrutura de importação para os itens restantes.

## 4. Fonte dos produtos e atualização do catálogo

Priorize fontes autorizadas, nesta ordem:

1. Amazon Product Advertising API, quando a conta e o acesso necessários estiverem disponíveis.
2. Dados fornecidos pelo próprio administrador, por arquivo JSON, CSV ou outro formato estruturado.
3. Cadastro manual de produtos com informações verificadas e links legítimos.
4. Outras fontes autorizadas compatíveis com os termos aplicáveis.

Não dependa de scraping da Amazon como mecanismo permanente de atualização do catálogo.

Se a API de afiliados estiver disponível, crie uma camada de serviço para consultar e normalizar os dados retornados. Se não estiver disponível, a loja deverá continuar funcionando com o catálogo local autorizado.

Não coloque credenciais secretas da API no código do navegador ou no repositório público.

Caso seja necessária uma função de backend, avalie o uso de Netlify Functions e variáveis de ambiente.

## 5. Estrutura da nova categoria

Crie uma página de categoria integrada à navegação existente da F&V Sports Store.

Utilize uma rota coerente com a arquitetura atual. Se o projeto ainda não possuir uma convenção, considere:

`/categorias/[slug-da-categoria]`

O slug definitivo deve ser baseado na categoria realmente identificada na página de referência.

A página deverá conter:

### A. Cabeçalho da categoria

- Breadcrumb: Início > Esportes > Categoria.
- Título claro e específico.
- Descrição original, relevante para SEO.
- Quantidade real de produtos cadastrados.
- Campo de busca dentro da categoria.
- Filtros e opções de ordenação.
- Indicadores de carregamento, erro e ausência de resultados.

Não utilize o nome Amazon como se a loja fosse oficial, parceira exclusiva ou representante da empresa.

### B. Grade de produtos

Implemente uma grade responsiva com cards de aparência profissional.

Cada card poderá apresentar, conforme os dados disponíveis:

- Imagem oficial autorizada do produto.
- Nome completo do produto.
- Marca e modelo.
- Preço atual, quando obtido de fonte autorizada.
- Preço anterior e desconto somente quando comprovados.
- Avaliação e quantidade de avaliações somente quando verificadas.
- Selo de destaque ou mais vendido somente quando houver justificativa verificável.
- Botão **“Ver produto na Amazon”**.
- Indicação de que o acesso é feito por um link de afiliado, conforme necessário.

Se o preço ou a disponibilidade não puderem ser confirmados, não os invente. O card deverá continuar útil e direcionar o visitante para consultar os detalhes na Amazon.

Evite exibir preços desatualizados como se fossem atuais.

### C. Filtros

Implemente somente os filtros compatíveis com os dados reais do catálogo:

- Marca.
- Faixa de preço, se houver preços confiáveis.
- Tipo de produto.
- Avaliação, se disponível.
- Características técnicas relevantes.
- Disponibilidade, se houver informação confiável.

Os filtros devem funcionar de verdade, sem serem apenas elementos visuais.

### D. Ordenação

Disponibilize, conforme os dados disponíveis:

- Mais relevantes.
- Ordem de referência ou popularidade, quando verificável.
- Menor preço.
- Maior preço.
- Melhor avaliação, quando verificável.
- Ordem alfabética.

Não apresente uma ordenação como “mais vendidos” se a fonte não sustentar essa classificação.

### E. Busca

A busca deverá:

- Ignorar diferenças entre maiúsculas e minúsculas.
- Aceitar correspondências parciais.
- Pesquisar nome, marca, modelo e atributos cadastrados.
- Funcionar em conjunto com os filtros.
- Exibir uma mensagem útil quando nenhum produto corresponder à pesquisa.

### F. Paginação e desempenho

Se o catálogo for grande:

- Utilize paginação ou carregamento progressivo.
- Evite renderizar milhares de cards desnecessariamente.
- Preserve o estado dos filtros quando o usuário navegar entre páginas.
- Implemente carregamento de imagens otimizado.
- Utilize dimensões de imagem adequadas e lazy loading quando apropriado.
- Evite requisições duplicadas e atualizações desnecessárias da interface.

## 6. Sistema de links de afiliado

Todos os botões de compra deverão utilizar links legítimos e válidos de afiliado.

Requisitos:

1. Cada produto deve possuir sua própria URL de destino.
2. Não direcione todos os produtos para a página inicial da Amazon.
3. Não invente ASINs, URLs de produtos ou parâmetros de rastreamento.
4. Preserve o destino correto do produto ao aplicar o identificador de afiliado.
5. Se houver um identificador de associado já configurado no projeto, reutilize-o somente após verificar que pertence à conta correta.
6. Caso o identificador ainda não esteja configurado, crie uma configuração centralizada para ele.
7. Não espalhe o identificador de afiliado por diversos componentes.
8. Não prometa comissões, descontos ou preços especiais sem fundamento.

Os links deverão abrir o destino esperado e utilizar os atributos de segurança adequados quando abrirem em uma nova aba.

Implemente uma identificação clara de publicidade ou participação em programas de afiliados, conforme as regras aplicáveis.

Exemplo de aviso:

> Como associado, podemos receber uma comissão por compras qualificadas realizadas por meio de alguns links desta página, sem custo adicional para você.

Revise o texto para garantir que seja adequado ao programa de afiliados utilizado e às regras de divulgação aplicáveis.

## 7. Organização dos dados

Separe os dados dos produtos da interface.

Utilize o padrão já existente no projeto. Se não houver um, crie uma estrutura equivalente à seguinte:

- `id`
- `name`
- `brand`
- `model`
- `category`
- `subcategory`
- `description`
- `imageUrl`
- `amazonUrl`
- `affiliateUrl`
- `price`
- `currency`
- `availability`
- `rating`
- `reviewCount`
- `attributes`
- `source`
- `lastVerifiedAt`

Todos os campos opcionais deverão aceitar ausência de dados sem quebrar a aplicação.

Não crie valores fictícios para preencher campos vazios.

Inclua validação dos registros, tratamento de duplicidades e uma maneira de identificar produtos com informações incompletas.

Se for utilizado um arquivo JSON local, organize-o de maneira que novos produtos possam ser adicionados sem modificar os componentes visuais.

## 8. Identidade visual

A nova categoria deverá seguir a identidade da F&V Sports Store.

Direção visual:

- Moderna.
- Esportiva.
- Profissional.
- Comercial, sem excesso de elementos.
- Responsiva.
- Consistente com o restante da loja.

Utilize uma hierarquia visual clara, imagens com proporções consistentes, espaçamento adequado e botões de ação facilmente identificáveis.

Não copie o layout da Amazon. Use a página apenas como referência de catálogo e organização dos produtos.

A interface deverá parecer uma categoria própria da F&V Sports Store, e não uma reprodução da loja de origem.

## 9. Responsividade e acessibilidade

Teste em:

- Celulares de telas pequenas.
- Celulares de telas grandes.
- Tablets.
- Notebooks.
- Monitores desktop.

Requisitos:

- Menu funcional em dispositivos móveis.
- Grade adaptável ao espaço disponível.
- Filtros acessíveis em telas pequenas.
- Botões com áreas de toque adequadas.
- Contraste legível.
- Textos alternativos para imagens.
- Navegação por teclado.
- Rótulos acessíveis nos campos de busca e filtros.
- Estados de foco visíveis.
- Nenhuma rolagem horizontal acidental.

## 10. SEO

Implemente:

- Título e meta description específicos da categoria.
- URL amigável.
- Um único H1 principal.
- Hierarquia correta de títulos.
- Breadcrumbs.
- URLs canônicas coerentes com a arquitetura da loja.
- Links internos para categorias relacionadas.
- Conteúdo original e útil.
- Dados estruturados somente quando aplicáveis e sustentados pelos dados reais.

Não utilize avaliações, preços ou informações estruturadas fictícias.

Não prometa indexação nem posicionamento garantido nos mecanismos de busca.

## 11. Segurança e confiabilidade

- Valide URLs externas antes de utilizá-las.
- Evite injeção de HTML proveniente de dados externos.
- Não exponha segredos ou credenciais.
- Não permita que parâmetros fornecidos pelo usuário redirecionem livremente para destinos arbitrários.
- Trate erros de rede, falhas da API e dados inválidos.
- Preserve a loja funcional quando a fonte externa estiver indisponível.
- Não introduza dependências desnecessárias.
- Não remova funcionalidades existentes.

## 12. Testes obrigatórios

Após implementar a categoria:

1. Execute o build de produção.
2. Corrija erros de compilação.
3. Teste o carregamento da página.
4. Teste os filtros individualmente e combinados.
5. Teste a busca.
6. Teste todas as opções de ordenação.
7. Teste paginação e carregamento progressivo.
8. Verifique os links de afiliado dos produtos.
9. Verifique imagens quebradas e dados ausentes.
10. Verifique duplicidades no catálogo.
11. Teste a navegação em dispositivos móveis.
12. Verifique se as páginas preexistentes continuam funcionando.
13. Confira erros no console e requisições desnecessárias.
14. Confirme que o projeto pode ser publicado na Netlify.

Não declare um teste como aprovado se ele não tiver sido executado.

## 13. Critérios de aceitação

A implementação só será considerada concluída quando:

- A categoria estiver integrada à navegação da loja.
- Os produtos efetivamente identificados estiverem cadastrados.
- A quantidade exibida corresponder ao catálogo carregado.
- A busca, os filtros e a ordenação funcionarem.
- Os botões utilizarem os destinos corretos.
- O identificador de afiliado estiver configurado corretamente.
- A interface funcionar em celulares e desktops.
- O build de produção for concluído sem erros.
- As funcionalidades anteriores forem preservadas.
- As limitações de cobertura do catálogo estiverem documentadas.

## 14. Entrega final

Ao concluir, apresente um relatório contendo:

1. Resumo da auditoria inicial.
2. Nome da categoria identificada na Amazon.
3. Quantidade de produtos encontrados, importados e efetivamente exibidos.
4. Fonte utilizada para os dados.
5. Lista dos arquivos criados e modificados.
6. Funcionalidades implementadas.
7. Testes executados e seus resultados.
8. Variáveis de ambiente ou configurações pendentes.
9. Limitações encontradas na coleta dos produtos.
10. Instruções para atualizar o catálogo futuramente.
11. Passos necessários para publicar a categoria na Netlify.

Se não for possível acessar a referência ou obter os dados de maneira autorizada, não simule a importação. Informe o bloqueio, implemente a estrutura preparada para receber o catálogo e indique exatamente quais dados ou credenciais faltam.

## Ordem final

Primeiro audite o projeto, depois identifique os dados disponíveis, implemente a categoria e, por último, teste e documente o resultado. Preserve a aplicação existente e não substitua dados reais por produtos fictícios.
