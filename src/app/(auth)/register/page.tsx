import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro · Gestor de Compromissos Financeiros",
  description: "Crie sua conta para planejar suas finanças futuras e controlar parcelamentos.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-2">
            Comece em Segundos
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Criar Nova Conta</h1>
          <p className="text-sm text-muted-foreground">
            Sem cadastro de extratos nem complicação. Apenas previsibilidade real.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
