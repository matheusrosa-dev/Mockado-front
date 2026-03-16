# CLAUDE.md — src/components

## Propósito do diretório

Contém componentes React reutilizáveis da aplicação, independentes de rotas específicas. São elementos de UI compartilhados que podem ser consumidos por qualquer parte do projeto.

## Responsabilidades

- Prover componentes visuais genéricos e reutilizáveis sem acoplamento a lógica de negócio de rotas específicas.
- Encapsular integrações com bibliotecas de UI externas (Radix UI, Monaco Editor) atrás de interfaces próprias.
- Disponibilizar um único ponto de entrada para importação de todos os componentes públicos.

## Padrões de organização

- Cada componente ocupa seu próprio subdiretório nomeado em `kebab-case`.
- O arquivo principal de cada componente é sempre `index.tsx` (ou `index.ts` para re-exportações).
- Componentes que possuem sub-partes internas as organizam dentro de um subdiretório `partials/`, com seu próprio `index.ts` de re-exportação.
- Subcomponentes dentro de `partials/` seguem a mesma regra: cada um em seu próprio diretório ou arquivo, com barrel export no `index.ts` do diretório.
- Componentes com estado ou contexto próprio organizam essa lógica em um subdiretório `context/`.
- O diretório raiz de `components/` expõe um barrel export (`index.ts`) com todos os componentes públicos da aplicação.

## Convenções de nomenclatura

- Diretórios: `kebab-case` (ex.: `private-header`, `json-editor`, `fetch-error`).
- Funções de componente: `PascalCase`.
- Arquivos de componentes: `index.tsx` para o componente principal; nomes em `PascalCase` apenas quando o arquivo representa uma variante ou sub-item explicitamente nomeado (ex.: `Item.tsx`).
- Arquivos de barrel: `index.ts` (sem JSX).

## Padrões de exportação/importação

- Exportações nomeadas (`export const` / `export function`) em todos os componentes. Nenhum componente usa exportação padrão (`export default`).
- O barrel raiz (`src/components/index.ts`) re-exporta todos os componentes públicos. Consumidores externos importam via alias `@components`, que aponta diretamente para esse barrel.
- Subdiretórios `partials/` possuem seu próprio `index.ts` que re-exporta apenas os símbolos daquele nível.

## Padrões de tipagem

- Props são definidas como `type Props = { ... }` localmente no mesmo arquivo do componente.
- Tipos de props de elementos HTML nativos são estendidos via intersecção (`React.InputHTMLAttributes<HTMLInputElement> & { ... }`), preservando os atributos HTML originais.
- Props que envolvem bibliotecas externas estendem os tipos da própria biblioteca (ex.: `FormRadix.FormProps`).
- Tipos específicos de um componente mais complexo (com múltiplos sub-arquivos) são isolados em um arquivo `types.ts` dentro do diretório do componente.
- O uso de `forwardRef` é adotado nos componentes que precisam expor referências ao elemento DOM subjacente, com tipagem explícita no genérico (`forwardRef<HTMLInputElement, Props>`).

## Padrões de separação de responsabilidades

- Componentes folha (sem subcomponentes internos) concentram sua lógica de apresentação inteiramente no `index.tsx`.
- Componentes compostos (como `Form` e `Sidebar`) delegam partes visuais a `partials/` e expõem a composição através do componente raiz.
- Dois padrões de namespace são usados dependendo do componente:
  - **Objeto namespace**: quando o componente raiz é um objeto exportado com membros nomeados. Exemplo: `Form` é `export const Form = { Form: ..., Input, Submit, Textarea }` — consumido como `<Form.Form>`, `<Form.Input>`.
  - **Propriedades estáticas em função**: quando o componente raiz é uma função com sub-componentes atribuídos como propriedades. Exemplo: `Sidebar.HamburgerButton = HamburgerButton`.
- Componentes podem acessar Zustand stores diretamente via `@shared/stores` ou caminho direto (ex.: `useSessionStore`, `useSidebarStore`, `useToastStore`).
- Integração com bibliotecas externas (Radix UI, Monaco) acontece dentro do componente que a encapsula, nunca exposta diretamente ao consumidor.

## Outras convenções em uso

- Estilização exclusivamente via classes Tailwind CSS v4, usando os tokens de design definidos em `@theme` no CSS global (`text-text-muted`, `bg-background-secondary`, `text-error`, etc.).
- A função `twMerge` (de `tailwind-merge`) é utilizada para composição condicional de classes, evitando conflitos.
- Ícones provêm exclusivamente da biblioteca `react-icons`.
- O componente `Skeleton` recebe `show: boolean` como prop para exibir o estado de carregamento. Componentes que encapsulam `Skeleton` (como `Input`, `Submit`, `JsonEditor`) expõem a prop como `showSkeleton?: boolean` e a repassam para `show`. Quando `showSkeleton` é `true`, o campo subjacente também recebe `disabled={true}`.
- Componentes funcionais são preferidos; `forwardRef` é o único wrapper de ordem superior utilizado.
