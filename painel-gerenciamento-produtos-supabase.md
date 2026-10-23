# Criar painel administrativo completo para gerenciamento de produtos

Quero que você desenvolva um painel administrativo completo para cadastrar e gerenciar manualmente todos os produtos da plataforma.

**Importante:** o projeto ainda não possui banco de dados. Neste momento, não se preocupe em configurar ou conectar o banco de dados. Porém, prepare toda a estrutura necessária para que a futura integração com o **Supabase** seja simples, organizada e funcional, evitando a necessidade de refazer o painel posteriormente.

## 1. Cadastro e gerenciamento de produtos

Crie uma página administrativa onde seja possível:

- Cadastrar produtos manualmente com nome, descrição, preço, imagens, categoria, plataforma de origem e link de afiliado.
- Visualizar todos os produtos cadastrados em uma listagem organizada.
- Consultar todas as informações de cada produto.
- Editar qualquer informação de um produto existente.
- Atualizar manualmente o preço dos produtos.
- Adicionar, substituir e remover imagens.
- Adicionar e editar links de afiliados.
- Alterar a categoria de um produto.
- Excluir produtos, solicitando confirmação antes de concluir a operação.

## 2. Identificação das plataformas

Cada produto deverá estar associado à plataforma de origem, com identificação visual clara. Inicialmente, disponibilize as seguintes opções:

- Amazon;
- Shopee;
- Mercado Livre.

Deixe a estrutura preparada para adicionar outras plataformas futuramente, sem precisar reconstruir o sistema.

## 3. Gerenciamento de categorias

O painel deverá permitir:

- Criar novas categorias.
- Editar o nome das categorias.
- Excluir categorias, tratando corretamente os produtos vinculados a elas.
- Alterar a categoria de qualquer produto.
- Filtrar e organizar os produtos por categoria.

## 4. Organização e pesquisa

Na página de controle, implemente:

- Campo de pesquisa por nome do produto.
- Filtros por categoria e plataforma.
- Exibição das principais informações na listagem.
- Acesso rápido às opções de visualizar, editar e excluir.
- Interface responsiva para computadores e celulares.

## 5. Preparação para o Supabase

Embora a conexão com o banco de dados não seja necessária nesta etapa, deixe a arquitetura preparada para a futura integração com o Supabase.

- Organize os dados dos produtos, categorias e plataformas de maneira estruturada.
- Separe a lógica de gerenciamento dos produtos da interface visual, utilizando uma camada de serviços ou repositórios.
- Defina os modelos e tipos de dados necessários, preferencialmente com tipagem adequada caso o projeto utilize TypeScript.
- Prepare a estrutura para persistência dos produtos e categorias no Supabase.
- Planeje os campos necessários para tabelas futuras, incluindo identificadores, nome, descrição, preço, imagens, link de afiliado, categoria, plataforma e datas de criação e atualização.
- Considere o armazenamento das imagens no Supabase Storage.
- Deixe prevista a configuração das variáveis de ambiente necessárias, sem expor chaves secretas no código.
- Estruture o projeto para permitir a substituição da fonte de dados temporária pela integração real com o Supabase, sem precisar reescrever toda a aplicação.

Se for necessário utilizar dados temporários nesta fase, deixe explícito que são apenas para desenvolvimento e não representam dados persistidos definitivamente. Evite misturar dados fictícios com os dados reais futuramente cadastrados.

## 6. Requisitos de implementação

Antes de começar, analise a estrutura atual do projeto e identifique a melhor maneira de implementar o painel sem prejudicar as funcionalidades existentes.

Desenvolva uma solução funcional, e não apenas uma interface visual demonstrativa. Todas as ações devem funcionar na etapa atual, utilizando armazenamento temporário apropriado quando necessário.

**Não configure o Supabase nem crie dependências de conexão com um banco de dados inexistente nesta etapa.** Apenas deixe os modelos, a organização do código e os pontos de integração preparados para essa implementação futura.

Ao finalizar, informe quais funcionalidades foram implementadas, como os dados estão sendo armazenados temporariamente e quais etapas serão necessárias para conectar o painel ao Supabase posteriormente.
