# Arquitetura do Projeto - Golden Phoenix

Este documento detalha a estrutura, tecnologias e organização do site **Golden Phoenix**.

## 🚀 Tecnologias Utilizadas

- **React 18**: Biblioteca principal para construção da interface baseada em componentes.
- **Vite 6**: Ferramenta de build ultrarrápida para servidor de desenvolvimento e empacotamento.
- **TypeScript**: Tipagem estática para menos erros e melhor autocompletação.
- **Tailwind CSS 4**: Framework de estilização utilitária para design responsivo.
- **Radix UI**: Primitivos de componentes acessíveis (menus, diálogos, etc).
- **Lucide React**: Biblioteca de ícones leves e elegantes.
- **Framer Motion**: Animações fluidas e interativas.

---

## 🏗️ Arquitetura (Feature-Based)

O projeto segue a arquitetura **Feature-Based**, onde cada funcionalidade do site é isolada em sua própria pasta. Isso facilita manutenção, testes e escalabilidade.

### Camadas da Arquitetura

| Camada       | Responsabilidade                                      |
|--------------|-------------------------------------------------------|
| `app/`       | Configuração central, providers, estilos globais      |
| `features/`  | Seções/funcionalidades independentes do site           |
| `shared/`    | Código reutilizável entre features (UI, hooks, utils) |
| `assets/`    | Recursos estáticos (imagens, vídeos, fontes, modelos) |

---

## 🌳 Árvore do Projeto

```text
src/
│
├── app/                          # Núcleo da aplicação
│   ├── App.tsx                   # Componente raiz que monta todas as seções
│   ├── providers/                # Providers de contexto (Placeholder para futuramente: auth, etc)
│   └── styles/                   # Estilos globais
│       ├── index.css             # Ponto de entrada CSS (importa os demais)
│       ├── fonts.css             # Configuração de fontes (Teko, Inter, Saira)
│       ├── tailwind.css          # Config do Tailwind CSS
│       ├── theme.css             # Variáveis de tema e design tokens
│       └── globals.css           # Estilos globais adicionais (Placeholder)
│
├── features/                     # Cada seção do site é uma feature isolada
│   ├── navbar/                   # Menu de navegação (Inclui Toggle de Tema)
│   │   └── Navbar.tsx
│   ├── hero/                     # Seção principal de destaque
│   │   └── HeroSection.tsx
│   ├── next-game/                # Próximo jogo + countdown
│   │   └── NextGameSection.tsx
│   ├── timeline/                 # Linha do tempo / história do time
│   │   └── TimelineSection.tsx
│   ├── roster/                   # Elenco de jogadores
│   │   └── RosterSection.tsx
│   ├── fan-zone/                 # Área educativa para fãs
│   │   └── FanZoneSection.tsx
│   ├── sponsorship/              # Patrocínio e parceiros
│   │   └── SponsorshipSection.tsx
│   └── footer/                   # Rodapé
│       └── Footer.tsx
│
├── shared/                       # Código compartilhado entre features
│   ├── ui/                       # Componentes base reutilizáveis (botões, inputs, etc)
│   │   ├── ScrollToTop.tsx
│   │   ├── ImageWithFallback.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (48 componentes Radix/Shadcn)
│   ├── hooks/                    # Custom hooks (useIsMobile, etc)
│   │   └── use-mobile.ts
│   ├── lib/                      # Funções utilitárias de biblioteca (cn, etc)
│   │   └── utils.ts
│   ├── animations/               # Variantes de animação (Placeholder)
│   └── utils/                    # Funções auxiliares gerais (Placeholder)
│
├── assets/                       # Recursos estáticos
│   ├── images/                   # Imagens do site
│   ├── videos/                   # Vídeos
│   ├── models/                   # Modelos 3D
│   └── fonts/                    # Fontes locais
│
└── main.tsx                      # Ponto de entrada React
```

---

## 📁 Arquivos na Raiz do Projeto

| Arquivo                    | Função                                           |
|----------------------------|--------------------------------------------------|
| `index.html`               | Ponto de entrada HTML do navegador                |
| `package.json`             | Dependências e scripts NPM                       |
| `vite.config.ts`           | Configuração do Vite (plugins, aliases)           |
| `postcss.config.mjs`       | Configuração de pós-processamento CSS             |
| `tsconfig.json`            | Configuração do TypeScript                       |
| `default_shadcn_theme.css` | Backup/Referência do tema original Shadcn        |
| `node_modules/`            | Bibliotecas instaladas (gerado automaticamente)   |

---

## 🛠️ Como o Site Foi Montado

1. **Feature-Based Architecture**: Cada seção do site vive em sua própria pasta dentro de `features/`, facilitando que um dev trabalhe em uma seção sem afetar outras.
2. **Shared Layer**: Componentes UI base (botões, cards, etc) e funções utilitárias ficam em `shared/`, sendo importados por qualquer feature que precise.
3. **Path Aliases**: O alias `@/` aponta para `src/`, permitindo imports limpos como `@/features/navbar/Navbar` em vez de caminhos relativos longos.
4. **Design System**: Tailwind CSS + variáveis CSS em `theme.css` garantem consistência visual em todo o site.
5. **Theme Toggle**: Implementado via manipulação da classe `.light` no elemento raiz (`<html>`), controlado diretamente pelo componente `Navbar`.
6. **Responsividade**: Cada componente usa classes responsivas do Tailwind (`md:`, `lg:`) para se adaptar a qualquer tela.
7. **Animações**: Framer Motion é usado em todas as seções para transições suaves e microinterações.

---

## 🌐 Deploy e Hospedagem

O projeto está configurado para deploy via **GitHub Pages**.

- **URL de Produção**: [https://Jef-taliari.github.io/site-golden-phoenix](https://Jef-taliari.github.io/site-golden-phoenix)
- **Comando**: Para fazer o build e publicar o projeto, basta rodar `npm run deploy`. O pacote `gh-pages` irá gerar a build na pasta `dist` e enviá-la para a branch `gh-pages`.
- O `vite.config.ts` possui a configuração `base: '/site-golden-phoenix/'` para roteamento correto no subdiretório do GitHub Pages.
