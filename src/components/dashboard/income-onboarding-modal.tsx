"use client";

import { useState } from "react";
import { updateMonthlyIncomeAction } from "@/app/actions/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IncomeOnboardingModalProps {
  isOpen: boolean;
  onSuccess?: () => void;
}

export function IncomeOnboardingModal({ isOpen, onSuccess }: IncomeOnboardingModalProps) {
  const [open, setOpen] = useState(isOpen);
  const [rawIncome, setRawIncome] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  // Formata o input para moeda BRL enquanto digita
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

    // Extrair valor numérico
    const numericStr = rawIncome.replace(/[^\d,]/g, "").replace(",", ".");
    const numericVal = parseFloat(numericStr);

    if (isNaN(numericVal) || numericVal <= 0) {
      setErrorMsg("Por favor, informe um valor de renda válido maior que zero.");
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
      toast.success("Renda cadastrada com sucesso!");
      setOpen(false);
      onSuccess?.();
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-border/80 bg-card p-6">
        <DialogHeader className="text-center sm:text-left space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl font-bold">Defina sua Renda Mensal Líquida</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Para calcularmos a taxa de comprometimento do seu orçamento e alertar sobre meses críticos, informe sua renda média líquida de referência (salário ou pró-labore fixo).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {errorMsg && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-400">
              {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="incomeInput" className="text-sm font-medium">
              Renda Líquida Mensal (R$)
            </Label>
            <div className="relative">
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
                className="pl-9 h-11 text-base font-semibold bg-secondary/50"
                autoFocus
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Você poderá ajustar esse valor a qualquer momento nas Configurações.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Definir mais tarde
            </Button>
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
                "Salvar e Continuar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
