"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  onSuccess?: (card?: CreditCardRecord) => void;
}

export function CardFormDialog({
  isOpen,
  onOpenChange,
  cardToEdit,
  onSuccess,
}: CardFormDialogProps) {
  const isEditing = !!cardToEdit;
  const router = useRouter();

  const [name, setName] = useState(cardToEdit?.name || "");
  const [color, setColor] = useState(cardToEdit?.color || CARD_COLORS[0].value);
  const [closingDay, setClosingDay] = useState(cardToEdit?.closing_day?.toString() || "20");
  const [dueDay, setDueDay] = useState(cardToEdit?.due_day?.toString() || "27");
  const [rawLimit, setRawLimit] = useState(
    cardToEdit?.limit_amount ? formatCurrencyBRL(cardToEdit.limit_amount) : ""
  );

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sincroniza / reseta formulário sempre que o modal abre ou cardToEdit altera
  useEffect(() => {
    if (isOpen) {
      setName(cardToEdit?.name || "");
      setColor(cardToEdit?.color || CARD_COLORS[0].value);
      setClosingDay(cardToEdit?.closing_day?.toString() || "20");
      setDueDay(cardToEdit?.due_day?.toString() || "27");
      setRawLimit(
        cardToEdit?.limit_amount ? formatCurrencyBRL(cardToEdit.limit_amount) : ""
      );
      setErrorMsg(null);
    }
  }, [isOpen, cardToEdit]);

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
      onSuccess?.(result.data);
      router.refresh();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-border/80 bg-card p-4 sm:p-6 max-h-[calc(100dvh-2rem)] sm:max-h-[min(92dvh,760px)] overflow-y-auto">
        <DialogHeader className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-white shadow-sm shrink-0"
              style={{ backgroundColor: color }}
            >
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold">
              {isEditing ? "Editar Cartão de Crédito" : "Novo Cartão de Crédito"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Defina as datas de fatura para que o sistema direcione o desembolso das assinaturas e compras para o mês correto.
          </DialogDescription>
        </DialogHeader>

        {/* Live Preview do Cartão */}
        <div
          className="relative mt-1.5 sm:mt-2 overflow-hidden rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-white shadow-lg transition-all"
          style={{
            backgroundColor: color,
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-80">
              Cartão de Crédito
            </span>
            <div className="flex h-5 w-8 sm:h-6 sm:w-9 rounded bg-white/20 border border-white/30 backdrop-blur-sm" />
          </div>

          <div className="my-2.5 sm:my-3.5">
            <div className="text-base sm:text-lg font-bold tracking-wide truncate">
              {name || "Nome do Cartão"}
            </div>
            <div className="text-[11px] sm:text-xs opacity-75 mt-0.5">
              {rawLimit ? `Limite: ${rawLimit}` : "Limite não definido"}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs pt-2 border-t border-white/20">
            <div>
              <span className="opacity-75 block text-[9px] sm:text-[10px] uppercase">Fechamento</span>
              <span className="font-semibold">Dia {closingDay || "--"}</span>
            </div>
            <div className="text-right">
              <span className="opacity-75 block text-[9px] sm:text-[10px] uppercase">Vencimento</span>
              <span className="font-semibold">Dia {dueDay || "--"}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 pt-2 sm:pt-3">
          {errorMsg && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 sm:p-3 text-xs font-medium text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Nome e Atalhos rápidos */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="cardName" className="text-xs sm:text-sm">Nome do Cartão</Label>
            <Input
              id="cardName"
              placeholder="Ex: Nubank Ultravioleta, Itaú Black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              className="h-9 sm:h-10 text-xs sm:text-sm bg-secondary/50"
            />
            {/* Atalhos para preenchimento ágil */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
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
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Cor de Identificação
            </Label>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {CARD_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full transition-transform hover:scale-110 focus:outline-none ${
                    color === c.value ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-background scale-110" : ""
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Ciclo de Fatura: Fechamento & Vencimento */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="closingDay" className="text-xs sm:text-sm">Dia do Fechamento</Label>
              <Input
                id="closingDay"
                type="number"
                min={1}
                max={31}
                value={closingDay}
                onChange={(e) => setClosingDay(e.target.value)}
                disabled={isPending}
                required
                className="h-9 sm:h-10 text-xs sm:text-sm bg-secondary/50"
              />
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">Melhor dia de compra</p>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="dueDay" className="text-xs sm:text-sm">Dia do Vencimento</Label>
              <Input
                id="dueDay"
                type="number"
                min={1}
                max={31}
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                disabled={isPending}
                required
                className="h-9 sm:h-10 text-xs sm:text-sm bg-secondary/50"
              />
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">Data de pagamento</p>
            </div>
          </div>

          {/* Alerta de Virada de Mês */}
          {isNextMonth && (
            <div className="flex items-start gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/10 p-2.5 sm:p-3 text-xs text-blue-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Vencimento no mês seguinte:</span> Como o vencimento (dia {dueDay}) é menor ou igual ao fechamento (dia {closingDay}), as compras deste ciclo são pagas no mês subsequente.
              </div>
            </div>
          )}

          {/* Limite Opcional */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="limitAmount" className="text-xs sm:text-sm">
              Limite Total <span className="text-muted-foreground text-xs">(opcional)</span>
            </Label>
            <Input
              id="limitAmount"
              type="text"
              placeholder="R$ 10.000,00"
              value={rawLimit}
              onChange={handleLimitChange}
              disabled={isPending}
              className="h-9 sm:h-10 text-xs sm:text-sm bg-secondary/50"
            />
          </div>

          <DialogFooter className="mt-3 pt-3 border-t border-border/40 bg-transparent m-0 p-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
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
