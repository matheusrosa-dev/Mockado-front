# CLAUDE.md — src/shared

## Propósito do diretório

Contém todo o código agnóstico de rota e de componente que é compartilhado transversalmente pela aplicação: contratos de dados (models), valores imutáveis (const), funções utilitárias puras (helpers) e camada de acesso a dados (services).

## Responsabilidades

- Centralizar definições de tipos e interfaces de domínio.
- Fornecer constantes e enumerações usadas em múltiplas camadas da aplicação.
- Abstrair a comunicação com a API em uma camada de serviços coesa.
- Disponibilizar funções auxiliares puras reutilizáveis.

## Padrões de organização

O diretório é dividido em quatro subdiretórios, cada um com responsabilidade exclusiva:

- `const/` — valores imutáveis e enumerações.
- `helpers/` — funções utilitárias puras sem efeitos colaterais.
- `models/` — interfaces TypeScript que representam entidades de domínio.
- `services/` — lógica de acesso a dados via API, incluindo configuração HTTP, hooks de serviço e integrações com React Query.

Cada subdiretório possui seu próprio `CLAUDE.md` com detalhes específicos.

## Convenções de nomenclatura

- Diretórios: `kebab-case`.
- Arquivos: `kebab-case` (ex.: `http-method.ts`, `status-code.ts`, `form-schema.ts`).
- Interfaces de domínio: prefixo `I` + `PascalCase` (ex.: `IEndpoint`, `IStatusCode`).
- Enumerações: `PascalCase` (ex.: `HttpMethod`).
- Constantes de objeto: `UPPER_SNAKE_CASE` (ex.: `STATUS_CODE_GROUPS`, `STATUS_CODES_WITHOUT_BODY`).
- Funções exportadas: `camelCase`.

## Padrões de exportação/importação

- Todos os símbolos são exportados como exportações nomeadas. Nenhum arquivo usa `export default`.
- O alias `@shared` (configurado no Vite) aponta para a raiz deste diretório, sendo usado por todos os consumidores internos.
- O alias `@services` aponta especificamente para `src/shared/services/`, permitindo importações diretas dos módulos de serviço.
- Não há barrel export na raiz de `shared/`; cada subdiretório é acessado diretamente via caminho completo.

## Padrões de tipagem

- Interfaces de domínio usam apenas tipos TypeScript nativos e referências a outros tipos do próprio projeto. Nenhuma dependência de biblioteca externa nos modelos.
- Interfaces de serviço (ex.: `IUseEndpointsService`) são definidas em arquivos `types.ts` separados e importadas pelos demais arquivos do mesmo módulo de serviço.
- Tipos de função (ex.: `GetEndpoints`, `GetEndpointById`) são declarados como `type` local no arquivo `types.ts` correspondente e compõem as interfaces de serviço.
