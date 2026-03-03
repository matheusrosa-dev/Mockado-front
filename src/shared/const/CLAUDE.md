# CLAUDE.md — src/shared/const

## Propósito do diretório

Define valores imutáveis e enumerações que representam conceitos de domínio fixos da aplicação. São a fonte de verdade para todos os valores literais que aparecem em múltiplas camadas.

## Responsabilidades

- Declarar enumerações de domínio (ex.: métodos HTTP).
- Declarar objetos de configuração imutáveis com `as const` (ex.: grupos de códigos de status com seus metadados visuais).
- Declarar listas de exceção imutáveis (ex.: códigos de status sem corpo de resposta).

## Padrões de organização

- Um arquivo por domínio, nomeado em `kebab-case`.
- Sem barrel export; cada arquivo é importado diretamente pelo caminho completo via alias `@shared/const/<domínio>`.

## Convenções de nomenclatura

- Enumerações: `PascalCase` (ex.: `HttpMethod`).
- Membros de enumeração: `UPPER_CASE` com valor string igual ao nome (ex.: `GET = "GET"`).
- Objetos de constante: `UPPER_SNAKE_CASE` (ex.: `STATUS_CODE_GROUPS`, `STATUS_CODES_WITHOUT_BODY`).
- Chaves de objetos de constante: representação literal do domínio (ex.: `"1xx"`, `"2xx"`).

## Padrões de exportação/importação

- Exportações nomeadas (`export enum`, `export const`). Sem `export default`.
- Todos os objetos de configuração são declarados com `as const` para garantir tipos literais estritos e imutabilidade em tempo de compilação.

## Padrões de tipagem

- Enumerações TypeScript (`enum`) para conjuntos fechados de valores de domínio.
- Objetos com `as const` para estruturas de configuração com múltiplos metadados associados a cada chave.
- A tipagem de chaves de acesso é derivada do próprio objeto com `keyof typeof` nos pontos de consumo.
