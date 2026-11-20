import { createClient } from "@/lib/supabase/server";
import { IncomeOnboardingModal } from "@/components/dashboard/income-onboarding-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyBRL } from "@/lib/utils";
import { Wallet, ShieldAlert, CreditCard, CalendarDays, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, net_monthly_income")
    .eq("id", user?.id)
    .single();

  const netIncome = Number(profile?.net_monthly_income || 0);
  const showOnboarding = netIncome === 0;

  return (
    <div className="space-y-8">
      {/* Onboarding Dialog quando renda não está configurada */}
      {showOnboarding && (
        <IncomeOnboardingModal isOpen={true} onSuccess={() => {}} />
      )}

      {/* Hero Welcome banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-background to-muted/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Olá, {profile?.full_name?.split(" ")[0] || "seja bem-vindo(a)"}!
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Este é o seu centro de previsão de caixa futuro. Sem estresse com pequenas compras do dia a dia: aqui gerenciamos apenas seus contratos, assinaturas e parcelas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cards"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 text-sm shadow-sm transition-colors"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cadastrar Cartão
            </Link>
          </div>
        </div>
      </div>

      {/* Renda Alert se ainda for zero */}
      {showOnboarding && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-700 dark:text-amber-400 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold">Renda mensal ainda não definida:</span> Para que possamos calcular a taxa de comprometimento percentual da sua renda nos próximos 12 meses,{" "}
            <Link href="/settings" className="underline font-semibold hover:text-amber-600">
              clique aqui para definir sua renda líquida
            </Link>.
          </div>
        </div>
      )}

      {/* Grid de Resumo Financeiro Inicial */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card Renda */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Renda Mensal Líquida
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {formatCurrencyBRL(netIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Base de cálculo para taxa de comprometimento
            </p>
          </CardContent>
        </Card>

        {/* Card Fase 2 Próximo Passo */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cartões de Crédito
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              0 cadastrados
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ciclos de fechamento e vencimento de fatura (Fase 2)
            </p>
          </CardContent>
        </Card>

        {/* Card Projeção Futura */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projeção Futura
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <CalendarDays className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              12 Meses
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Visibilidade de caixa real e badges sazonais
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Roteiro do que esperar do sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Como funciona o seu gestor</CardTitle>
          <CardDescription>
            Planeje seu futuro financeiro sem perder tempo registrando pequenos gastos diários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/60 p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                1. Renda e Cartões
              </div>
              <p className="text-xs text-muted-foreground">
                Cadastre sua renda líquida e os cartões que utiliza com a data de fechamento e vencimento.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                2. Compromissos e Parcelas
              </div>
              <p className="text-xs text-muted-foreground">
                Adicione assinaturas com templates com 1 clique (Netflix, Spotify) e compras parceladas informando a parcela atual.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                3. Projeção de 12 Meses
              </div>
              <p className="text-xs text-muted-foreground">
                Acompanhe o gráfico futuro, saiba quando parcelas acabam e descubra meses com folga no orçamento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
