# Gestor de Assinaturas e Compromissos Financeiros

Aplicação web para previsibilidade financeira pessoal e projeção de caixa para os próximos 12 meses, focada em contratos fixos, assinaturas recorrentes e compras parceladas.

---

## Funcionalidades Principais

- **Autenticação Individual e Segura:** Login e cadastro com isolamento multi-tenant via Row Level Security (RLS) no Supabase.
- **Perfil Financeiro & Renda Mensal:** Definição da renda líquida como base para o cálculo da taxa de comprometimento.
- **Gestão de Cartões de Crédito:** Cadastro de cartões com datas de fechamento e vencimento de fatura, identificando viradas de mês.
- **Design Escuro Moderno:** Interface visual dark nativa, tipografia Roboto e componentes acessíveis com shadcn/ui.

---

## Tecnologias Utilizadas

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Componentes:** shadcn/ui com Base UI.
- **Backend & Banco de Dados:** Supabase (PostgreSQL, Supabase Auth, Row Level Security) e `@supabase/ssr`.
- **Validação:** Zod e React Hook Form.

---

## Pré-requisitos

- **Node.js:** Versão 18.18+ ou superior (recomendado 20+).
- **Gerenciador de pacotes:** `npm`.
- **Instância do Supabase:** Projeto configurado no [Supabase](https://supabase.com).

---

## Instalação e Execução

### 1. Clonar o repositório e instalar dependências
```bash
git clone <url-do-repositorio>
cd gestor-despesas
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz baseado no `.env.example`:

```bash
cp .env.example .env.local
```

Preencha com as credenciais do seu projeto Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
```

### 3. Aplicar as Migrações no Banco de Dados
Acesse o **SQL Editor** no painel do Supabase e execute os arquivos de migração em ordem:
1. `supabase/migrations/20261120000000_init_profiles.sql` (Cria tabela de perfis, RLS e triggers de signup)
2. `supabase/migrations/20261120000001_create_credit_cards.sql` (Cria tabela de cartões de crédito e RLS)

### 4. Rodar o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local de desenvolvimento com Turbopack. |
| `npm run build` | Compila o projeto e gera a build de produção otimizada. |
| `npm run start` | Inicia o servidor de produção após o build. |
| `npm run lint` | Executa o ESLint para análise estática de código. |

---

## Documentação do Projeto

- [Visão Geral do Produto](docs/project-overview.md)
- [Arquitetura e Decisões Técnicas](docs/architecture.md)
- [PRD Completo](docs/prd/gestor-compromissos-financeiros.md)
- [Plano da Fase 1 — Fundação e Autenticação](docs/plans/fase-1-fundacao-autenticacao.md)
- [Plano da Fase 2 — Meios de Pagamento e Cartões](docs/plans/fase-2-cartoes-credito.md)
