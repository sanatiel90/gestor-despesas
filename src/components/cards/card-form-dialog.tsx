"use client";

import { useState } from "react";
import { CreditCardRecord } from "@/schemas/cards";
import { createCreditCardAction, updateCreditCardAction } from "@/app/actions/cards";
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
import { Loader2, CreditCard, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { formatCurrencyBRL } from "@/lib/utils";

// Paleta de temas/cores predefinidas populares
export const CARD_COLORS = [
  { name: "Roxo Nu", value: "#820ad1" },
  { name: "Laranja Inter", value: "#ff7a00" },
  { name: "Preto Black", value: "#1e293b" },
  { name: "Esmeralda", value: "#10b981" },
  { name: "Azul Royal", value: "#2563eb" },
  { name: "Dourado Gold", value: "#d97706" },
  { name: "Vermelho Rubi", value: "#dc2626" },
  { name: "Ciano Neon", value: "#06b6d4" },
];

interface CardFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cardToEdit?: CreditCardRecord | null;
  onSuccess?: () => void;
}

export function CardFormDialog({
  isOpen,
  onOpenChange,
  cardToEdit,
  onSuccess,
}: CardFormDialogProps) {
  const isEditing = !!cardToEdit;

  const [name, setName] = useState(cardToEdit?.name || "");
  const [color, setColor] = useState(cardToEdit?.color || CARD_COLORS[0].value);
  const [closingDay, setClosingDay] = useState(cardToEdit?.closing_day?.toString() || "20");
  const [dueDay, setDueDay] = useState(cardToEdit?.due_day?.toString() || "27");
  const [rawLimit, setRawLimit] = useState(
    cardToEdit?.limit_amount ? formatCurrencyBRL(cardToEdit.limit_amount) : ""
  );

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calcula se o vencimento ocorre no mês seguinte ao fechamento
  const closingNum = parseInt(closingDay, 10);
  const dueNum = parseInt(dueDay, 10);
  const isNextMonth = !isNaN(closingNum) && !isNaN(dueNum) && dueNum <= closingNum;

  function handleLimitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setRawLimit("");
      return;
    }
    const numberValue = parseFloat(value) / 100;
    setRawLimit(
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    formData.append("closingDay", closingDay);
    formData.append("dueDay", dueDay);

    if (rawLimit) {
      const cleanLimit = rawLimit.replace(/[^\d,]/g, "").replace(",", ".");
      formData.append("limitAmount", cleanLimit);
    }

    const result = isEditing
      ? await updateCreditCardAction(cardToEdit.id, formData)
      : await createCreditCardAction(formData);

    if (result.error) {
      setErrorMsg(result.error);
      setIsPending(false);
    } else {
      toast.success(
        isEditing
          ? "Cartão atualizado com sucesso!"
          : "Cartão cadastrado com sucesso!"
      );
      setIsPending(false);
      onOpenChange(false);
      onSuccess?.();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-border/80 bg-card p-6">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm"
              style={{ backgroundColor: color }}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold">
              {isEditing ? "Editar Cartão de Crédito" : "Novo Cartão de Crédito"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Defina as datas de fatura para que o sistema direcione o desembolso das assinaturas e compras para o mês correto.
          </DialogDescription>
        </DialogHeader>

        {/* Live Preview do Cartão */}
        <div
          className="relative mt-2 overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all"
          style={{
            backgroundColor: color,
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-80">
              Cartão de Crédito
            </span>
            <div className="flex h-6 w-9 rounded-md bg-white/20 border border-white/30 backdrop-blur-sm" />
          </div>

          <div className="my-4">
            <div className="text-lg font-bold tracking-wide">
              {name || "Nome do Cartão"}
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              {rawLimit ? `Limite: ${rawLimit}` : "Limite não definido"}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20">
            <div>
              <span className="opacity-75 block text-[10px] uppercase">Fechamento</span>
              <span className="font-semibold">Dia {closingDay || "--"}</span>
            </div>
            <div className="text-right">
              <span className="opacity-75 block text-[10px] uppercase">Vencimento</span>
              <span className="font-semibold">Dia {dueDay || "--"}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-3">
          {errorMsg && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Nome e Atalhos rápidos */}
          <div className="space-y-2">
            <Label htmlFor="cardName">Nome do Cartão</Label>
            <Input
              id="cardName"
              placeholder="Ex: Nubank Ultravioleta, Itaú Black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              className="h-10 bg-secondary/50"
            />
            {/* Atalhos para preenchimento ágil */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Nubank", "Itaú", "Inter", "Bradesco", "C6 Bank", "XP"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setName(preset)}
                  className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  +{preset}
                </button>
              ))}
            </div>
          </div>

          {/* Seletor de Cores */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Cor de Identificação
            </Label>
            <div className="flex flex-wrap gap-2.5">
              {CARD_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`h-7 w-7 rounded-full transition-transform hover:scale-110 focus:outline-none ${
                    color === c.value ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-background scale-110" : ""
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Ciclo de Fatura: Fechamento & Vencimento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="closingDay">Dia do Fechamento</Label>
              <Input
                id="closingDay"
                type="number"
                min={1}
                max={31}
                value={closingDay}
                onChange={(e) => setClosingDay(e.target.value)}
                disabled={isPending}
                required
                className="h-10 bg-secondary/50"
              />
              <p className="text-[11px] text-muted-foreground">Melhor dia de compra</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDay">Dia do Vencimento</Label>
              <Input
                id="dueDay"
                type="number"
                min={1}
                max={31}
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                disabled={isPending}
                required
                className="h-10 bg-secondary/50"
              />
              <p className="text-[11px] text-muted-foreground">Data de pagamento</p>
            </div>
          </div>

          {/* Alerta de Virada de Mês */}
          {isNextMonth && (
            <div className="flex items-start gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Vencimento no mês seguinte:</span> Como o vencimento (dia {dueDay}) é menor ou igual ao fechamento (dia {closingDay}), as compras deste ciclo são pagas no mês subsequente.
              </div>
            </div>
          )}

          {/* Limite Opcional */}
          <div className="space-y-2">
            <Label htmlFor="limitAmount">
              Limite Total <span className="text-muted-foreground text-xs">(opcional)</span>
            </Label>
            <Input
              id="limitAmount"
              type="text"
              placeholder="R$ 10.000,00"
              value={rawLimit}
              onChange={handleLimitChange}
              disabled={isPending}
              className="h-10 bg-secondary/50"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-3">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
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
              ) : isEditing ? (
                "Atualizar Cartão"
              ) : (
                "Salvar Cartão"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
