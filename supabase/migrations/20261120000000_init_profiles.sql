-- Migration: 20261120000000_init_profiles.sql
-- Description: Criação da tabela profiles vinculada ao auth.users e configuração de RLS

-- 1. Criar tabela public.profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  net_monthly_income numeric(12, 2) not null default 0.00 check (net_monthly_income >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comentários nas colunas para documentação do schema
comment on table public.profiles is 'Perfis de usuários contendo dados financeiros básicos';
comment on column public.profiles.net_monthly_income is 'Renda mensal líquida informada para cálculo de comprometimento futuro';

-- 2. Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Políticas de RLS otimizadas com (select auth.uid())
create policy "Usuários podem visualizar o próprio perfil"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "Usuários podem atualizar o próprio perfil"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- 4. Função e trigger para criação automática do perfil no signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, net_monthly_income)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    0.00
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Trigger para atualizar automaticamente o updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profiles_updated_at on public.profiles;

create trigger on_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();
