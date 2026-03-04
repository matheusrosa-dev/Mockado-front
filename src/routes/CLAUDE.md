# CLAUDE.md — src/routes

## Propósito do diretório

Contém todas as rotas da aplicação gerenciadas pelo TanStack Router com file-based routing. A estrutura de diretórios mapeia diretamente para a árvore de rotas da aplicação.

## Responsabilidades

- Definir o layout raiz da aplicação (providers globais, outlet principal).
- Definir layouts de grupos de rotas (ex.: layout privado com sidebar).
- Renderizar o conteúdo específico de cada rota (página).
- Hospedar componentes, tipos e helpers específicos de uma rota que não pertencem ao escopo global.

## Padrões de organização

### Estrutura de arquivo por convenção do TanStack Router

- `__root.tsx` — rota raiz; define os providers globais (`QueryClientProvider`) e o outlet principal.
- `route.tsx` dentro de um grupo — define o layout do grupo de rotas (componente com `<Outlet />`).
- `index.tsx` dentro de um grupo ou segmento — define a rota índice daquela localização.
- Segmentos dinâmicos: nomeados com `$` (ex.: `$endpointId/` como diretório com `index.tsx` interno, ou `$endpointId.tsx` como arquivo simples).
- Grupos de rota sem prefixo de URL: nomeados entre parênteses (ex.: `(private)`).

### Convenções de prefixo para arquivos co-localizados

- Diretórios e arquivos prefixados com `-` (hífen) são co-localizados na rota, mas **não geram rotas** no TanStack Router (ex.: `-partials/`, `-helpers/`, `-types.ts`).
- Esta convenção é usada sistematicamente para separar código de suporte (formulários, helpers, tipos) do código que define rotas.

### Estrutura interna de uma rota complexa

Rotas mais elaboradas organizam seu conteúdo co-localizado em:
- `-partials/` — componentes usados exclusivamente por aquela rota ou grupo de rotas, com `index.ts` de re-exportação.
- `-helpers/` — funções e configurações específicas da rota (ex.: schema de validação de formulário), com `index.ts` de re-exportação com `export * from`.
- `-types.ts` — interfaces de tipos locais da rota (ex.: tipo do formulário).

## Convenções de nomenclatura

- Arquivos de rota: `kebab-case` (convençao do TanStack Router).
- Componente de rota: sempre chamado `RouteComponent` (função local, não exportada).
- A exportação obrigatória de cada arquivo de rota é `export const Route = createFileRoute(...)`.
- Componentes em `-partials/`: `PascalCase` no nome da função; arquivo em `kebab-case` (ou `PascalCase` quando representa um sub-item, ex.: `Item.tsx`).

## Padrões de exportação/importação

- O objeto `Route` é sempre exportado de cada arquivo de rota; é a única exportação do arquivo.
- `RouteComponent` é uma função local (não exportada), atribuída ao campo `component` do `Route`.
- `-partials/` e `-helpers/` usam `index.ts` como barrel export para o restante da rota.
- Os `-helpers/` usam `export * from` para re-exportar tudo de seus sub-arquivos.
- Componentes globais são importados via alias `@components`.
- Serviços são importados via alias `@services/<recurso>/react-query`.
- Tipos, modelos, constantes e helpers compartilhados são importados via `@shared/`.

## Padrões de tipagem

- Tipos locais de formulário são declarados como `interface` com prefixo `I` em `-types.ts` (ex.: `IForm`).
- Schemas de validação são construídos com `yup` e o resolver é gerado com `yupResolver` do `@hookform/resolvers/yup`, exportado como `schemaResolver`.
- O tipo `Resolver<IForm>` do `react-hook-form` é usado explicitamente para tipar o resultado do `yupResolver`.

## Padrões de separação de responsabilidades

- O arquivo de rota (`index.tsx`) é responsável por: definir a rota, buscar dados via React Query e orquestrar a composição de `PrivateHeader`, `PrivateContent`, `FetchError` e os partials da rota.
- A lógica de formulário (estado, validação, submissão) é isolada inteiramente em um componente em `-partials/`, não no arquivo de rota.
- Helpers de transformação de dados específicos da rota (ex.: agrupamento de códigos de status) ficam em `-helpers/` e não nos componentes.
- Tipos de dado local da rota ficam em `-types.ts`, separados dos modelos globais em `@shared/models/`.

## Outras convenções em uso

- O padrão de layout privado usa `Sidebar.Provider` como wrapper no `route.tsx` do grupo, e `Sidebar` + `main > Outlet` como estrutura de conteúdo.
- Todas as páginas privadas compõem `PrivateHeader` e `PrivateContent` como estrutura visual padrão.
- Estados de erro nas rotas são tratados com o componente `FetchError`, que recebe `refetch` para retentar.
- O erro 404 específico de recurso é verificado via `error?.status === 404` e renderiza o componente `NotFound`.
- Formulários usam `react-hook-form` com `Controller` para campos de componentes controlados (selects customizados) e `register` para campos nativos.
