# services

## Propósito do diretório

Contém a camada de acesso a dados da aplicação, responsável por realizar as chamadas HTTP à API e retornar os dados tipados para quem os consome.

## Responsabilidades

- Encapsular as chamadas à API REST usando o utilitário centralizado de configuração HTTP.
- Retornar dados tipados com as interfaces definidas em `models/`.
- Isolar do restante da aplicação qualquer detalhe de transporte (fetch, URLs, tratamento de resposta).

## Padrões de organização

- Cada domínio de recurso possui seu próprio subdiretório (ex: `endpoints/`, `status-codes/`).
- Cada subdiretório contém dois arquivos fixos: `index.ts` com a implementação do serviço e `types.ts` com as tipagens exclusivas daquele serviço.
- A raiz do diretório `services/` contém um `index.ts` que re-exporta todos os serviços e um `config.ts` que define o utilitário HTTP compartilhado.

## Convenções de nomenclatura

- Os serviços são funções nomeadas com o prefixo `use` seguido do nome do domínio em PascalCase e o sufixo `Service` (ex: `useEndpointsService`, `useStatusCodesService`).
- As interfaces de tipo do serviço seguem o mesmo padrão com prefixo `I` (ex: `IUseEndpointsService`, `IUseStatusCodesService`).
- Os tipos individuais de cada método do serviço são declarados como `type` aliases separados dentro do `types.ts`, nomeados em PascalCase descrevendo a operação (ex: `GetEndpoints`, `GetEndpointById`).

## Padrões de exportação/importação

- O alias `@services` aponta para o `index.ts` raiz de `services/`, sendo este o único ponto de importação dos serviços no restante da aplicação.
- Tipos internos de cada serviço não são re-exportados para fora do diretório `services/`; são usados apenas internamente para tipar a implementação.

## Padrões de tipagem

- Cada serviço tem sua interface definida em `types.ts`, que declara o formato completo do objeto retornado pela factory function.
- Os tipos de cada método são definidos como aliases nomeados separados, compondo a interface principal do serviço.
- Os métodos do serviço são sempre assíncronos e retornam `Promise<T>`, onde `T` é uma interface de `models/` ou uma coleção dela (`Array<T>`).

## Padrões de separação de responsabilidades

- As factory functions de serviço não possuem estado interno; são funções puras que retornam um objeto com métodos.
- A lógica de construção de URL e execução da requisição HTTP é delegada inteiramente ao utilitário `api` definido em `config.ts`.
- O `config.ts` centraliza a URL base e normaliza os endpoints antes de chamar `fetch`, sem conhecimento dos domínios.
- Cada subdiretório de serviço conhece apenas seu próprio domínio; não há imports cruzados entre subdiretórios de serviços.
