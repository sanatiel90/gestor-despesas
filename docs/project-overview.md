# Visão Geral do Projeto

> Última atualização: 2026-11-22

O **Gestor de Assinaturas e Compromissos Financeiros** é uma aplicação web voltada para a previsibilidade financeira pessoal. Em vez do registro retroativo de micro-gastos diários, o sistema foca exclusivamente no planejamento e visibilidade de contratos fixos, assinaturas recorrentes e compras parceladas em uma linha do tempo de 12 meses.

---

## Proposta de Valor

- **Zero Fadiga:** Sem necessidade de anotar almoços, cafezinhos ou conciliar extratos minuciosos.
- **Previsibilidade Real:** Cálculo de desembolso futuro baseado nas datas reais de fechamento e vencimento de fatura de cartões de crédito.
- **Taxa de Comprometimento:** Visão clara de quanto da renda líquida já está consumida por mês.

---

## Status Atual de Implementação

### ✅ Fase 1 — Fundação, Autenticação e Perfil de Renda
- **Autenticação Individual:** Cadastro, login e logout com e-mail/senha via Supabase Auth.
- **Isolamento de Dados:** Row Level Security (RLS) ativo em todas as tabelas via `auth.uid() = user_id`.
- **Perfil Financeiro & Onboarding:** Modal de primeiro acesso solicitando a renda líquida e página `/settings` para edição.
- **Tema Visual:** Interface escura nativa (Dark Mode), tipografia Roboto e feedback visual com Framer Motion.

### ✅ Fase 2 — Meios de Pagamento e Gestão de Cartões de Crédito
- **CRUD de Cartões (`/cards`):** Cadastro, edição e exclusão de cartões de crédito.
- **Ciclo de Fatura:** Configuração de dia de fechamento (1 a 31) e dia de vencimento (1 a 31).
- **Regra de Virada de Mês:** Detecção visual e lógica de faturas que fecham em um mês e vencem no seguinte (`due_day <= closing_day`).
- **Cards Visuais:** Representação inspirada em cartões físicos com seletor de 8 temas de cores e atalhos rápidos de bancos.
- **Dashboard Sincronizado:** Indicadores de cartões cadastrados e renda refletidos em tempo real no `/dashboard`.

### ⏳ Próximas Fases (Conforme PRD)
- **Fase 3:** Gestão de Compromissos (Presets de streaming/software, parcelamentos e contas flutuantes).
- **Fase 4:** Motor de Projeção de 12 Meses e badges de sazonalidade.
- **Fase 5:** Checklist Mensal de Execução de Pagamentos e Central de Insights.

---

## Documentos Relacionados

- [Arquitetura e Decisões Técnicas](./architecture.md)
- [PRD do Produto](./prd/gestor-compromissos-financeiros.md)
- [Plano de Implementação - Fase 1](./plans/fase-1-fundacao-autenticacao.md)
- [Plano de Implementação - Fase 2](./plans/fase-2-cartoes-credito.md)
- [Plano de Implementação - Fase 3](./plans/fase-3-gestao-compromissos.md)
