"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/95 shadow-xl backdrop-blur-sm p-6 sm:p-8">
      <CardHeader className="space-y-1 text-center p-0 mb-6">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Bem-vindo de volta</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Acesse para gerenciar seus compromissos e planejar seus próximos 12 meses.
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
              placeholder="••••••••"
              required
              disabled={isPending}
              autoComplete="current-password"
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
                Entrando...
              </>
            ) : (
              <>
                Entrar na conta
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link
              href="/register"
              className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Criar conta gratuita
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}
