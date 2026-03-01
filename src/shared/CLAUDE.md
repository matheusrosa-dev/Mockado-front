# shared

## Propósito do diretório

Contém toda a lógica e definições que são transversais à aplicação e não pertencem a nenhuma feature ou rota específica. É o núcleo de código compartilhado entre as camadas de apresentação, serviços e domínio.

## Responsabilidades

- Centralizar definições de rotas da aplicação.
- Definir os modelos de dados (interfaces TypeScript) utilizados em toda a aplicação.
- Prover serviços de acesso a dados.
- Prover funções utilitárias reutilizáveis.
- Centralizar constantes e enumerações de domínio.

## Padrões de organização

O diretório é subdividido por responsabilidade técnica:

- `const/` — constantes e enumerações de domínio.
- `helpers/` — funções utilitárias puras.
- `models/` — interfaces TypeScript de modelos de dados.
- `services/` — serviços de acesso à API.
- `routes.ts` — definições de rotas da aplicação (arquivo único na raiz de `shared/`).

Cada subdiretório possui seu próprio `index.ts` quando há múltiplos artefatos a expor, ou um único arquivo quando o conteúdo é coeso o suficiente para não necessitar de subdivisão.

## Convenções de nomenclatura

- Subdiretórios: kebab-case no plural descrevendo a categoria do conteúdo.
- Arquivos dentro dos subdiretórios: kebab-case, nomeados pelo conceito de domínio que representam (ex: `endpoint.ts`, `status-code.ts`).

## Padrões de exportação/importação

- O alias TypeScript `@shared/*` aponta para `src/shared/*`, sendo utilizado nos imports ao longo da aplicação.
- Cada subdiretório com múltiplos arquivos expõe seu conteúdo via `index.ts` local.
- O arquivo `routes.ts` é importado diretamente via `@shared/routes`.

## Padrões de tipagem

- Tipagem forte em TypeScript com `strict: true` ativo.
- Não há uso de `any` nas definições de `shared/`.
- Modelos são definidos como interfaces TypeScript, não como tipos (`type`).

## Padrões de separação de responsabilidades

- Nenhum arquivo dentro de `shared/` contém lógica de renderização (JSX/TSX). Todo o conteúdo é TypeScript puro.
- Constantes e modelos são completamente separados entre si; modelos podem referenciar tipos de `const/`, mas não o contrário.
- Serviços dependem de `models/` (para tipagem de retorno) e de `const/` (indiretamente, via models), mas não de `helpers/`.
- Helpers dependem de `const/` para as enumerações sobre as quais operam.
