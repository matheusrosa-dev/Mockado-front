# CLAUDE.md — src/shared/models

## Propósito do diretório

Define as interfaces TypeScript que representam as entidades de domínio da aplicação. São os contratos de dados que trafegam entre a API e o restante do código.

## Responsabilidades

- Declarar a forma (shape) dos objetos de domínio retornados pela API.
- Servir como fonte de verdade para tipagem em serviços, componentes e rotas.

## Padrões de organização

- Um arquivo por entidade de domínio, nomeado em `kebab-case` de acordo com o conceito que representa.
- Nenhum barrel export: cada arquivo é importado diretamente pelo caminho completo.

## Convenções de nomenclatura

- Interfaces: prefixo `I` + `PascalCase` (ex.: `IEndpoint`, `IStatusCode`).
- Arquivos: `kebab-case` correspondendo ao nome da entidade em singular.

## Padrões de exportação/importação

- Exportações nomeadas (`export interface`). Sem `export default`.
- Importados via alias `@shared/models/<entidade>` pelos consumidores.

## Padrões de tipagem

- Interfaces com campos tipados usando tipos primitivos TypeScript (`string`, `number`) ou referências a tipos do próprio projeto (ex.: `HttpMethod` importado de `@shared/const/endpoint`).
- Sem dependências de bibliotecas externas.
- Interfaces declaradas com a palavra-chave `interface`, nunca como `type`.
