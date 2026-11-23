"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCardRecord } from "@/schemas/cards";
import { deleteCreditCardAction } from "@/app/actions/cards";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteCardDialogProps {
  card: CreditCardRecord | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (deletedCardId: string) => void;
}

export function DeleteCardDialog({
  card,
  isOpen,
  onOpenChange,
  onSuccess,
}: DeleteCardDialogProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!card) return;
    setIsPending(true);
    const cardId = card.id;
    const result = await deleteCreditCardAction(cardId);

    if (result.error) {
      toast.error(result.error);
      setIsPending(false);
    } else {
      toast.success(`Cartão "${card.name}" excluído.`);
      setIsPending(false);
      onOpenChange(false);
      onSuccess?.(cardId);
      router.refresh();
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-border/80 bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Excluir cartão "{card?.name}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Tem certeza de que deseja remover este cartão de crédito? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending || !card}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Sim, excluir cartão"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
