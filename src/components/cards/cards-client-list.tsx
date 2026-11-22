"use client";

import { useState } from "react";
import { CreditCardRecord } from "@/schemas/cards";
import { CardItem } from "@/components/cards/card-item";
import { CardFormDialog } from "@/components/cards/card-form-dialog";
import { DeleteCardDialog } from "@/components/cards/delete-card-dialog";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Sparkles } from "lucide-react";

interface CardsClientListProps {
  initialCards: CreditCardRecord[];
}

export function CardsClientList({ initialCards }: CardsClientListProps) {
  const [cards, setCards] = useState<CreditCardRecord[]>(initialCards);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CreditCardRecord | null>(null);
  const [deletingCard, setDeletingCard] = useState<CreditCardRecord | null>(null);

  function handleOpenCreate() {
    setEditingCard(null);
    setFormOpen(true);
  }

  function handleOpenEdit(card: CreditCardRecord) {
    setEditingCard(card);
    setFormOpen(true);
  }

  function handleOpenDelete(card: CreditCardRecord) {
    setDeletingCard(card);
  }

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Meus Cartões de Crédito</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cadastre os cartões que você utiliza com suas datas de fechamento e vencimento de fatura.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm self-start sm:self-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Cartão
        </Button>
      </div>

      {/* Grid de Cartões ou Estado Vazio */}
      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4">
            <CreditCard className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold">Nenhum cartão cadastrado</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1 mb-6">
            Cadastre seus cartões de crédito para calcular o mês exato de desembolso das suas assinaturas e parcelas.
          </p>
          <Button
            onClick={handleOpenCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Primeiro Cartão
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {/* Modais de Formulário e Confirmação */}
      <CardFormDialog
        isOpen={formOpen}
        onOpenChange={setFormOpen}
        cardToEdit={editingCard}
      />

      <DeleteCardDialog
        card={deletingCard}
        isOpen={!!deletingCard}
        onOpenChange={(open) => !open && setDeletingCard(null)}
      />
    </div>
  );
}
