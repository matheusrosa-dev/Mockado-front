# models

## Propósito do diretório

Define os modelos de dados da aplicação como interfaces TypeScript. Estes modelos representam as entidades do domínio e são a referência de tipagem utilizada pelos serviços, componentes e demais camadas da aplicação.

## Responsabilidades

- Definir a forma (shape) dos dados que trafegam entre a API e a interface.
- Prover tipagem centralizada e reutilizável para as entidades de domínio.

## Padrões de organização

- Cada arquivo representa um único conceito de domínio, nomeado em kebab-case de acordo com a entidade que modela.
- Não há subdiretórios; todos os modelos residem diretamente na raiz de `models/`.
- Não há `index.ts` de barrel neste diretório; cada modelo é importado diretamente pelo seu caminho via `@shared/models/<nome>`.

## Convenções de nomenclatura

- Interfaces de modelo utilizam o prefixo `I` seguido do nome da entidade em PascalCase (ex: `IEndpoint`, `IStatusCode`).
- Os arquivos são nomeados em kebab-case com base no conceito que representam (ex: `endpoint.ts`, `status-code.ts`).

## Padrões de exportação/importação

- Cada arquivo exporta sua interface com `export interface`.
- Importações de outros módulos de `shared/` dentro dos modelos são feitas via alias `@shared/` quando há dependência (ex: importar `HttpMethod` de `@shared/const/endpoint`).

## Padrões de tipagem

- Apenas interfaces TypeScript são utilizadas para definir modelos — não `type` aliases.
- Quando uma propriedade do modelo corresponde a um conjunto enumerado de valores, ela é tipada com o `enum` correspondente de `const/`, não com `string` genérico.
- Cada interface possui apenas as propriedades que refletem a estrutura real dos dados retornados pela API.
