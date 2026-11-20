"use client";

import { useState } from "react";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setErrorMessage("As senhas informadas não coincidem.");
      setIsPending(false);
      return;
    }

    const formData = new FormData(form);
    const result = await registerAction(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/95 shadow-xl backdrop-blur-sm p-6 sm:p-8">
      <CardHeader className="space-y-1 text-center p-0 mb-6">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
          <Sparkles className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Criar sua conta</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Comece agora a prever seus gastos recorrentes e compras parceladas.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm font-medium text-red-400">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Nome completo</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Seu nome"
              required
              disabled={isPending}
              autoComplete="name"
              className="h-11 bg-secondary/50 border-border/80 focus:border-emerald-500 text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              disabled={isPending}
              autoComplete="email"
              className="h-11 bg-secondary/50 border-border/80 focus:border-emerald-500 text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              disabled={isPending}
              autoComplete="new-password"
              className="h-11 bg-secondary/50 border-border/80 focus:border-emerald-500 text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              required
              minLength={6}
              disabled={isPending}
              autoComplete="new-password"
              className="h-11 bg-secondary/50 border-border/80 focus:border-emerald-500 text-foreground"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              <>
                Cadastrar e Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}
