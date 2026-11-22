"use client";

import { CreditCardRecord } from "@/schemas/cards";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { Edit2, Trash2, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CardItemProps {
  card: CreditCardRecord;
  onEdit: (card: CreditCardRecord) => void;
  onDelete: (card: CreditCardRecord) => void;
}

export function CardItem({ card, onEdit, onDelete }: CardItemProps) {
  const isNextMonth = card.due_day <= card.closing_day;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-border hover:shadow-md">
      {/* Visual estilo Cartão de Crédito Físico */}
      <div
        className="relative overflow-hidden rounded-xl p-5 text-white shadow-md transition-transform"
        style={{
          backgroundColor: card.color,
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.35) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest font-semibold opacity-85">
            Crédito
          </span>
          {/* Chip dourado metálico */}
          <div className="h-6 w-8 rounded bg-gradient-to-tr from-amber-400 to-yellow-200 border border-amber-300 shadow-inner flex items-center justify-center opacity-90">
            <div className="h-3 w-5 border-t border-b border-amber-600/50 rounded-xs" />
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-xl font-bold tracking-wide truncate">{card.name}</h3>
          <p className="text-xs opacity-80 mt-0.5">
            {card.limit_amount ? `Limite: ${formatCurrencyBRL(card.limit_amount)}` : "Sem limite cadastrado"}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-white/20">
          <div>
            <span className="opacity-75 block text-[10px] uppercase font-medium">Fecha</span>
            <span className="font-bold text-sm">Dia {card.closing_day}</span>
          </div>
          <div className="text-right">
            <span className="opacity-75 block text-[10px] uppercase font-medium">Vence</span>
            <span className="font-bold text-sm">Dia {card.due_day}</span>
          </div>
        </div>
      </div>

      {/* Detalhes do Ciclo e Ações */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            Ciclo de faturamento
          </span>
          {isNextMonth ? (
            <Badge variant="outline" className="text-[11px] border-blue-500/30 text-blue-400 bg-blue-500/10">
              Vence no mês seguinte
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[11px] border-border text-muted-foreground">
              Vence no mesmo mês
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(card)}
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(card)}
            className="h-8 px-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
