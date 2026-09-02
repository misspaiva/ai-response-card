# Cartão de Resposta de IA - Kit Inicial de Produção

Um kit inicial moderno em React, pronto para produção, com respostas geradas por IA, autenticação e uma interface polida construída com componentes Shadcn.

Criado por **misspaiva**.

## Stack Tecnológica

- **React 19** + **Vite 7** — Desenvolvimento rápido e builds otimizados
- **React Router 7** — Roteamento no lado do cliente
- **Tailwind CSS v4** — Estilização baseada em classes utilitárias
- **Shadcn UI** — Componentes acessíveis e personalizáveis
- **Convex** — Backend, banco de dados e sincronização em tempo real
- **Convex Auth** — Autenticação por código OTP via e-mail + acesso anônimo
- **Framer Motion** — Animações e transições suaves
- **Lucide React** — Conjunto consistente de ícones
- **TypeScript** — Desenvolvimento com tipagem segura

## Funcionalidades

- Página inicial pronta com seções animadas
- Fluxo de autenticação seguro (código por e-mail + login como convidado)
- Rota de painel protegida com redirecionamento automático
- Componente de cartão de resposta de IA com efeito de digitação
- Design responsivo com suporte a modo claro/escuro
- Notificações toast via Sonner
- Componentes de interface pensados primeiro para dispositivos móveis

## Início Rápido

### Pré-requisitos

- Node.js 18+
- npm
- Uma conta Convex (gratuita em [convex.dev](https://convex.dev))

### Instalação

1. **Clone ou baixe** este repositório.

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie um projeto Convex:**
   ```bash
   npx convex init
   ```
   Siga as instruções para criar um novo projeto Convex ou vincular um existente.

4. **Configure as variáveis de ambiente:**

   Copie `.env.example` para `.env` e preencha com a URL do seu deployment Convex:
   ```bash
   cp .env.example .env
   ```

   Atualize `VITE_CONVEX_URL` com a URL do seu deployment Convex (fornecida por `npx convex dev`).

5. **Gere os tipos do Convex:**
   ```bash
   npx convex dev
   ```
   Isso inicia o servidor de desenvolvimento do Convex e gera os tipos em `_generated` dentro de `src/convex/`.

6. **Adicione sua chave da API Anthropic** (necessária para as respostas reais de IA no cartão):
   ```bash
   npx convex env set ANTHROPIC_API_KEY sk-ant-...
   ```

7. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

8. Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## Build para Produção

```bash
npm run build
```

Os arquivos prontos para produção serão gerados na pasta `dist/`.

## Estrutura do Projeto

```
src/
  components/
    ui/           # Componentes primitivos do Shadcn UI
    StreamingResponseCard.tsx   # Cartão de resposta de IA (chama a Anthropic via Convex)
    RequireAuth.tsx             # Protege rotas que exigem login
    LogoDropdown.tsx            # Menu do logo (início / sair)
  convex/
    auth/         # Configuração de autenticação
    auth.config.ts
    auth.ts
    ai.ts         # Action que chama a API da Anthropic
    http.ts
    schema.ts
    users.ts
    _generated/   # Tipos gerados pelo Convex (criados por npx convex dev)
  hooks/
    use-auth.ts
  lib/
    utils.ts
  pages/
    Landing.tsx
    Auth.tsx
    Dashboard.tsx
    NotFound.tsx
  main.tsx        # Ponto de entrada da aplicação e roteamento
```

## Autenticação

Este kit inicial usa o **Convex Auth** com dois provedores:

1. **Código por e-mail (OTP)** — Os usuários entram com o e-mail e um código de uso único
2. **Anônimo** — Acesso como convidado, sem exigir credenciais

O hook `useAuth` fornece o estado de autenticação e os dados do usuário:

```typescript
import { useAuth } from "@/hooks/use-auth";

const { isLoading, isAuthenticated, user, signIn, signOut } = useAuth();
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-------------|
| `VITE_CONVEX_URL` | URL do seu deployment Convex (lado do cliente) |
| `CONVEX_SITE_URL` | URL do site do seu deployment Convex (autenticação no servidor) |
| `CONVEX_DEPLOYMENT` | Nome do seu deployment Convex |
| `ANTHROPIC_API_KEY` | Chave da API da Anthropic, configurada no deployment Convex (via `npx convex env set`) — usada pelo cartão de resposta de IA |

> **Observação:** Nunca faça commit do arquivo `.env` ou de arquivos com segredos reais. Use `.env.example` apenas como modelo de referência.

## Backend Convex

O backend Convex é configurado em `src/convex/`:

- `schema.ts` — Esquema do banco de dados
- `users.ts` — Consultas e mutações de usuários
- `ai.ts` — Action que chama a API da Anthropic para gerar respostas reais de IA
- `auth.ts` — Configuração dos provedores de autenticação
- `auth.config.ts` — Configurações de domínio da autenticação

Rode `npx convex dev` para sincronizar o código local com seu deployment Convex.

## Licença

Este kit inicial é licenciado para uso como modelo distribuível. Modifique e construa sobre ele para seus próprios projetos.
