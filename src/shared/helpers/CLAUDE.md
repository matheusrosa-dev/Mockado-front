# CLAUDE.md — src/shared/helpers

## Propósito do diretório

Contém funções utilitárias puras agrupadas por domínio. Cada arquivo reúne funções relacionadas a um único conceito da aplicação.

## Responsabilidades

- Encapsular lógica de derivação e transformação de dados que seria repetida em múltiplos lugares.
- Mapear valores de domínio (como método HTTP ou código de status) para representações visuais (classes CSS Tailwind).
- Fornecer predicados de domínio (ex.: verificar se um código de status possui corpo de resposta).

## Padrões de organização

- Um arquivo por domínio, nomeado em `kebab-case` correspondendo ao conceito (ex.: `http-method.ts`, `status-code.ts`).
- Sem barrel export; cada arquivo é importado diretamente pelo caminho completo.

## Convenções de nomenclatura

- Funções: `camelCase` com verbos descritivos (ex.: `getHttpMethodTextColor`, `getHttpMethodBgColor`, `statusCodeHasBody`).
- Arquivos: `kebab-case` pelo domínio que agrupam.

## Padrões de exportação/importação

- Exportações nomeadas (`export const`). Sem `export default`.
- Importados via alias `@shared/helpers/<domínio>` pelos consumidores.
- As funções consomem constantes e enumerações de `@shared/const/`.

## Padrões de tipagem

- Parâmetros tipados com os tipos de domínio do projeto (ex.: `HttpMethod`).
- Retornos inferidos pelo TypeScript (sem anotações explícitas de tipo de retorno, exceto quando necessário para clareza — ex.: `: boolean`).
- Sem dependências de bibliotecas externas.

## Padrões de separação de responsabilidades

- Funções são estritamente puras: recebem um valor e retornam um resultado derivado, sem efeitos colaterais.
- A lógica de mapeamento visual (classes CSS) é centralizada aqui e nunca duplicada nos componentes consumidores.
- Constantes de referência (como listas de exceção) são importadas de `@shared/const/`, nunca redefinidas localmente.
