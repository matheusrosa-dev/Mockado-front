# const

## Propósito do diretório

Define as constantes e enumerações de domínio da aplicação. Estes valores representam conjuntos fixos e conhecidos em tempo de compilação, como métodos HTTP e grupos de status codes.

## Responsabilidades

- Centralizar valores fixos de domínio que são referenciados em múltiplas camadas da aplicação.
- Garantir tipagem forte para conjuntos de valores que, sem enumeração, seriam representados como strings soltas.

## Padrões de organização

- Não há subdiretórios; os arquivos residem diretamente na raiz de `const/`, um por conceito de domínio.
- Arquivos são nomeados em kebab-case de acordo com o conceito que definem.
- Não há `index.ts` de barrel neste diretório; cada arquivo é importado diretamente pelo caminho via `@shared/const/<nome>`.

## Convenções de nomenclatura

- Enumerações TypeScript: PascalCase no nome do `enum` (ex: `HttpMethod`), com membros em UPPER_SNAKE_CASE quando o valor é uma string em caixa alta (ex: `GET = "GET"`).
- Objetos de constante: UPPER_SNAKE_CASE no nome da variável (ex: `STATUS_CODE_GROUPS`).
- Chaves de objetos de constante: quando representam intervalos ou códigos, usam a notação do domínio como string literal (ex: `"1xx"`, `"2xx"`).

## Padrões de exportação/importação

- Todos os valores são exportados como named exports.
- Não há default exports.

## Padrões de tipagem

- Enumerações são definidas com TypeScript `enum` para conjuntos de valores categóricos utilizados como tipo em outras partes do código.
- Objetos de constante agrupados são declarados com asserção `as const` para preservar literalidade e inferência precisa de tipos.
- Quando um objeto de constante agrupa múltiplos atributos por chave, todos os atributos da mesma chave possuem o mesmo conjunto de propriedades (estrutura uniforme entre as entradas).
