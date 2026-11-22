-- Migration: 20261120000001_create_credit_cards.sql
-- Description: Criação da tabela credit_cards com regras de ciclo de fatura (fechamento vs. vencimento) e RLS

-- 1. Criar tabela public.credit_cards
create table if not exists public.credit_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#10b981',
  closing_day integer not null check (closing_day between 1 and 31),
  due_day integer not null check (due_day between 1 and 31),
  limit_amount numeric(12, 2) check (limit_amount is null or limit_amount >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comentários descritivos
comment on table public.credit_cards is 'Cartões de crédito com ciclos de fechamento e vencimento de fatura';
comment on column public.credit_cards.closing_day is 'Dia do mês em que a fatura fecha (1 a 31)';
comment on column public.credit_cards.due_day is 'Dia do mês em que a fatura vence (1 a 31)';

-- 2. Habilitar Row Level Security (RLS)
alter table public.credit_cards enable row level security;

-- 3. Políticas de RLS otimizadas com (select auth.uid())
create policy "Usuários podem visualizar seus próprios cartões"
  on public.credit_cards for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Usuários podem criar seus próprios cartões"
  on public.credit_cards for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Usuários podem atualizar seus próprios cartões"
  on public.credit_cards for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Usuários podem excluir seus próprios cartões"
  on public.credit_cards for delete
  to authenticated
  using (user_id = (select auth.uid()));

-- 4. Índice para agilidade em consultas por usuário
create index if not exists idx_credit_cards_user_id on public.credit_cards(user_id);

-- 5. Trigger para atualizar updated_at automaticamente
drop trigger if exists on_credit_cards_updated_at on public.credit_cards;

create trigger on_credit_cards_updated_at
  before update on public.credit_cards
  for each row execute function public.handle_updated_at();
