import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, net_monthly_income, created_at")
    .eq("id", user?.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Configurações da Conta</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie suas preferências de perfil e parâmetros de cálculo financeiro.
        </p>
      </div>

      {/* Card de Renda Líquida */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">Parâmetros de Renda</CardTitle>
          </div>
          <CardDescription>
            A renda mensal líquida é o divisor de referência utilizado para calcular o percentual de comprometimento de cada um dos próximos 12 meses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm
            currentIncome={Number(profile?.net_monthly_income || 0)}
            fullName={profile?.full_name || ""}
            email={user?.email || ""}
          />
        </CardContent>
      </Card>

      {/* Card de Privacidade & RLS */}
      <Card className="border-border/40 bg-muted/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base text-muted-foreground">Privacidade e Isolamento de Dados</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Seus dados são protegidos por Row Level Security (RLS) no PostgreSQL. Nenhum outro usuário ou terceiro tem visibilidade sobre sua renda, cartões ou compromissos.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
