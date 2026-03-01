# helpers

## Propósito do diretório

Contém funções utilitárias puras que encapsulam lógica de derivação de valores reutilizável em múltiplos pontos da aplicação.

## Responsabilidades

- Derivar valores de apresentação (como classes CSS do Tailwind) a partir de valores de domínio (como enumerações).
- Centralizar lógica de mapeamento que seria duplicada se escrita inline nos componentes.

## Padrões de organização

- Não há subdiretórios; os helpers residem diretamente na raiz de `helpers/`, organizados por domínio em arquivos individuais.
- Cada arquivo agrupa helpers relacionados a um único conceito de domínio, nomeado em kebab-case de acordo com esse conceito (ex: `http-method.ts`).
- Não há `index.ts` de barrel neste diretório; cada arquivo é importado diretamente pelo caminho via `@shared/helpers/<nome>`.

## Convenções de nomenclatura

- Funções: camelCase, nomeadas com verbos que descrevem a derivação (ex: `getHttpMethodTextColor`, `getHttpMethodBgColor`).
- Arquivos: kebab-case, nomeados pelo conceito de domínio sobre o qual os helpers operam.

## Padrões de exportação/importação

- Todas as funções são exportadas como named exports.
- Não há default exports.

## Padrões de tipagem

- Os parâmetros das funções são tipados com os `enum`s ou interfaces do domínio correspondente, importados de `@shared/const/` ou `@shared/models/`.
- Os retornos são `string` quando a função deriva valores de classe CSS.

## Padrões de separação de responsabilidades

- Todas as funções são puras: não possuem estado, não produzem efeitos colaterais e retornam sempre o mesmo valor para a mesma entrada.
- A estrutura de controle predominante para mapeamento de enumerações é o `switch` sobre os valores do enum.
- Helpers não importam de `services/`, `models/` (a não ser para tipagem de parâmetros) nem de `components/`.
