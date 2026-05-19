# 🦅 Golden Phoenix

Landing Page oficial da equipe **Golden Phoenix** futebol americano de Arapongas-PR.

## 🚀 Tecnologias e Recursos Visuais

- **React 18** com **TypeScript** e build ultrarrápido com **Vite 6**
- **Tailwind CSS v4** para um sistema de design de alta performance
- **Framer Motion** para animações interativas e microtransições premium
- **Canvas 2D Rendering**: Renderizador customizado baseado em canvas para reproduzir uma animação cinematográfica da Fênix controlada por scroll com suavização por FPS (RAF)
- **Shared Brand Components**: Componentes compartilhados da identidade visual (como o `PhoenixButton` com acabamentos metálicos, gradientes e varreduras de luz)
- **Sistema de Partículas Modular (`Particles`)**: Efeito dinâmico de chispas/fagulhas douradas fluídas e otimizadas
- **Floating Pill Navbar**: Barra de navegação flutuante premium com efeito de *glassmorphism* e logo badges tridimensionais
- Componentes baseados em **Radix UI** de alta acessibilidade

## 🏗️ Estrutura e Arquitetura

O projeto utiliza uma arquitetura **Feature-Based** moderna (focada em facilidade de escala e isolamento por seção). Para detalhes completos sobre a árvore de diretórios, regras e padrões de código do site, veja a nossa documentação técnica:
👉 **[ESTRUTURA_PROJETO.md](./ESTRUTURA_PROJETO.md)**

## 💻 Como Rodar Localmente (Desenvolvimento)

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O servidor local ficará disponível (geralmente na porta `5173`).

## 🌐 Deploy e Hospedagem

O site está configurado para ser publicado automaticamente no **GitHub Pages**.

Para enviar uma nova versão para produção, utilize o comando:

```bash
npm run deploy
```

Esse comando cuida de gerar o build de produção e enviar a pasta `dist` para a branch `gh-pages`.

**Acesse o site em produção:** [https://Jef-taliari.github.io/site-golden-phoenix](https://Jef-taliari.github.io/site-golden-phoenix)
