# CLAUDE.md — src/shared/services

## Propósito do diretório

Contém toda a lógica de comunicação com a API REST da aplicação. Organiza o acesso a dados em três camadas: configuração HTTP, serviços (funções de chamada), e integração com React Query.

## Responsabilidades

- Configurar a instância HTTP centralizada utilizada por todos os serviços.
- Implementar as funções de chamada à API agrupadas por recurso.
- Expor funções de consulta (queries) integradas ao React Query para consumo pelos componentes e rotas.
- Declarar os contratos de tipo de cada serviço.

## Padrões de organização

- Um subdiretório por recurso da API (ex.: `endpoints/`, `status-codes/`), nomeado em `kebab-case` no plural.
- Cada subdiretório de recurso segue uma estrutura de três arquivos fixos:
  - `hook.ts` — função de serviço que implementa as chamadas HTTP usando a instância `api`.
  - `react-query.ts` — funções que envolvem as chamadas do hook com `useQuery` do React Query.
  - `types.ts` — interfaces e tipos que descrevem os contratos do serviço.
- A configuração da instância HTTP axios fica em `config.ts` na raiz do diretório.

## Convenções de nomenclatura

- Funções de serviço (hook): prefixo `use` + nome do recurso + `Service` (ex.: `useEndpointsService`, `useStatusCodesService`).
- Funções React Query: prefixo `use` + verbo descritivo + recurso (ex.: `useGetEndpointsSummary`, `useGetEndpointById`, `useGetStatusCodes`, `useCreateEndpoint`, `useGoogleLogin`).
- Interfaces de serviço: prefixo `I` + `Use` + nome do recurso + `Service` (ex.: `IUseEndpointsService`, `IUseStatusCodesService`). Exceção: `auth` usa `IAuthService` por convenção própria.
- Tipos de função auxiliares no `types.ts`: `PascalCase` descritivo (ex.: `GetEndpoints`, `GetEndpointById`).

## Padrões de exportação/importação

- Exportações nomeadas em todos os arquivos. Sem `export default`.
- Consumidores importam as funções React Query via alias `@services/<recurso>/react-query`.
- A instância `api` é importada de `@services/config` (ou pelo caminho relativo dentro do mesmo diretório).
- Nenhum barrel export no nível do diretório de recurso; cada arquivo é importado diretamente.

## Padrões de tipagem

- A interface de serviço (`IUseXxxService`) é declarada em `types.ts` e define o contrato retornado pela função de hook.
- Tipos de função auxiliares (ex.: `type GetEndpoints = () => Promise<Array<IEndpoint>>`) são declarados como `type` no `types.ts` e compostos na interface de serviço.
- O tipo `AxiosError` é importado de `axios` e usado nos retornos do React Query quando a tipagem de erro é relevante para o consumidor.
- O tipo de retorno das funções React Query não é declarado explicitamente; é inferido pelo TypeScript a partir do `useQuery`.

## Padrões de separação de responsabilidades

- `hook.ts` é responsável exclusivamente pelo transporte HTTP (chamadas `api.get`, `api.post`, etc.) e retorno dos dados brutos.
- `react-query.ts` é responsável pela configuração do cache (queryKey, retry, refetchOnWindowFocus) e pelo wrapping com `useQuery` ou `useMutation`. Também inclui lógica de callback (`onSuccess`, `onError`) e integração com o `useToastStore`.
- `types.ts` concentra todos os contratos de tipo do módulo, sem lógica de execução.
- A instância de serviço é criada via hook dentro de cada função exportada: `const endpointsService = useEndpointsService()`.

## Padrões de retorno das funções React Query

**Queries:** espalham o resultado do `useQuery` e renomeiam `data` para o nome do recurso:
```ts
const { data, ...query } = useQuery({ ... });
return { ...query, endpoints: data };
```

**Mutations:** espalham o resultado do `useMutation`, desestruturando `mutate` fora do spread, e expõem `isSubmitting` como alias de `isPending`:
```ts
const { mutate, ...mutation } = useMutation({ ... });
return { ...mutation, createEndpoint: mutate, isSubmitting: mutation.isPending };
```

## Outras convenções em uso

- `retry: false` e `refetchOnWindowFocus: false` são configurados explicitamente em todas as queries.
- `initialData` não é utilizado; fallbacks para `undefined` são tratados no ponto de consumo (ex.: `data || []`).
- O arquivo `interfaces.ts` na raiz de `services/` define `IApiReturn<T>` (envelope de resposta da API) e `ApiError` (alias tipado de `AxiosError`), compartilhados por todos os serviços.
