"use client";

import { useState } from "react";
import { updateMonthlyIncomeAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatCurrencyBRL } from "@/lib/utils";

interface SettingsFormProps {
  currentIncome: number;
  fullName: string;
  email: string;
}

export function SettingsForm({ currentIncome, fullName, email }: SettingsFormProps) {
  const [rawIncome, setRawIncome] = useState(
    currentIncome > 0 ? formatCurrencyBRL(currentIncome) : ""
  );
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleIncomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setRawIncome("");
      return;
    }
    const numberValue = parseFloat(value) / 100;
    setRawIncome(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(numberValue)
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg(null);

    const numericStr = rawIncome.replace(/[^\d,]/g, "").replace(",", ".");
    const numericVal = parseFloat(numericStr);

    if (isNaN(numericVal) || numericVal < 0) {
      setErrorMsg("Informe um valor válido maior ou igual a zero.");
      setIsPending(false);
      return;
    }

    const formData = new FormData();
    formData.append("netMonthlyIncome", numericVal.toString());

    const result = await updateMonthlyIncomeAction(formData);

    if (result.error) {
      setErrorMsg(result.error);
      setIsPending(false);
    } else {
      toast.success("Renda mensal atualizada com sucesso!");
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-600 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userEmail">E-mail</Label>
          <Input id="userEmail" type="text" value={email} disabled className="bg-muted" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userName">Nome Completo</Label>
          <Input id="userName" type="text" value={fullName} disabled className="bg-muted" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="incomeInput" className="font-semibold">
          Renda Mensal Líquida
        </Label>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Wallet className="h-4 w-4" />
          </div>
          <Input
            id="incomeInput"
            type="text"
            placeholder="R$ 5.000,00"
            value={rawIncome}
            onChange={handleIncomeChange}
            disabled={isPending}
            className="pl-9 font-semibold text-base"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Exemplo: salário líquido após impostos ou rendimento médio mensal garantido.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          "Salvar Alterações"
        )}
      </Button>
    </form>
  );
}
