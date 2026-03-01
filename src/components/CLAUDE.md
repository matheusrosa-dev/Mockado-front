# components

## Propósito do diretório

Contém os componentes de interface reutilizáveis da aplicação. Estes componentes são agnósticos de domínio e podem ser utilizados em qualquer parte da aplicação.

## Responsabilidades

- Prover elementos de UI compartilhados entre diferentes páginas e layouts.
- Abstrair primitivos de bibliotecas externas (Radix UI) em componentes com a identidade visual da aplicação.
- Expor uma API pública unificada através de um barrel file na raiz do diretório.

## Padrões de organização

- Cada componente reside em seu próprio subdiretório, cujo nome usa kebab-case e descreve o conceito do componente.
- O ponto de entrada de cada componente é sempre um `index.tsx` (ou `index.ts`) dentro do seu diretório.
- Quando um componente possui partes internas que não fazem parte da API pública, elas são colocadas em um subdiretório `partials/`.
- Diretórios `partials/` expõem seu conteúdo através de um `index.ts` local.
- Quando um componente possui estado global compartilhado entre sub-partes, o estado é gerenciado em um subdiretório `context/` dedicado.
- Quando um componente possui tipos internos específicos, eles ficam em um `types.ts` no diretório do componente.
- A raiz do diretório `components/` contém um `index.ts` que re-exporta todos os componentes públicos.

## Convenções de nomenclatura

- Diretórios de componentes: kebab-case (ex: `private-header`, `collapsible-submenu`).
- Componentes exportados: PascalCase (ex: `PrivateHeader`, `CollapsibleSubmenu`).
- Arquivos de partials individuais que são componentes: PascalCase no nome do arquivo quando representam um único componente isolado (ex: `Item.tsx`, `trigger.tsx`).
- Funções utilitárias internas ao contexto de um componente: camelCase.

## Padrões de exportação/importação

- Todos os componentes públicos são re-exportados pelo `index.ts` raiz de `components/`.
- O alias `@components` aponta para esse `index.ts`, sendo utilizado nos imports ao longo da aplicação.
- Partials são exportados apenas via o `index.ts` do seu diretório `partials/`, nunca importados diretamente por caminhos internos de fora do componente pai.

## Padrões de tipagem

- Props de cada componente são tipadas localmente com `type Props = { ... }` ou como interseção com tipos HTML nativos (ex: `React.InputHTMLAttributes<HTMLInputElement> & { ... }`).
- Quando um componente precisa estender props de um primitivo Radix UI, a interseção é feita com o tipo exportado pelo Radix (ex: `Select.SelectItemProps & { ... }`).
- Interfaces de types internos ao componente usam o prefixo `I` (ex: `IDefaultSubmenuItem`, `IEndpointSubmenuItem`).

## Padrões de separação de responsabilidades

- Componentes que precisam de interatividade no client (hooks, estado, event handlers) usam a diretiva `"use client"` no topo do arquivo. Componentes puramente de renderização não utilizam essa diretiva.
- A composição interna de um componente complexo é quebrada em partials dentro de `partials/`, mantendo o `index.tsx` principal responsável apenas pela orquestração.
- O padrão compound component é utilizado quando um componente possui sub-partes que precisam ser expostas externamente: sub-partes são anexadas como propriedades estáticas no componente principal (ex: `Sidebar.Provider`, `Sidebar.HamburgerButton`, `Sidebar.useSidebar`).
- Contextos React criados para uso interno de um componente ficam isolados em `context/index.tsx`, que exporta tanto o `Provider` quanto o hook de consumo.

## Outras convenções

- `forwardRef` é utilizado em componentes que precisam expor sua ref ao consumidor (campos de formulário, botões de submit).
- `twMerge` (da biblioteca `tailwind-merge`) é utilizado quando há composição condicional de classes Tailwind.
- Estilos são definidos inteiramente com classes Tailwind CSS, sem arquivos CSS externos por componente.
- Primitivos do Radix UI são sempre encapsulados; não há uso direto de primitivos do Radix nas páginas da aplicação.
