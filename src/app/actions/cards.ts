"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { creditCardSchema, CreditCardRecord } from "@/schemas/cards";

export type CardActionResult = {
  success?: boolean;
  error?: string;
  data?: CreditCardRecord;
};

/**
 * Cria um novo cartão de crédito
 */
export async function createCreditCardAction(formData: FormData): Promise<CardActionResult> {
  const name = formData.get("name") as string;
  const color = (formData.get("color") as string) || "#10b981";
  const closingDay = parseInt(formData.get("closingDay") as string, 10);
  const dueDay = parseInt(formData.get("dueDay") as string, 10);
  const rawLimit = formData.get("limitAmount") as string;
  const limitAmount = rawLimit && rawLimit.trim() !== "" ? parseFloat(rawLimit) : null;

  const validation = creditCardSchema.safeParse({
    name,
    color,
    closingDay,
    dueDay,
    limitAmount,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Dados inválidos." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado." };
  }

  const { data, error } = await supabase
    .from("credit_cards")
    .insert({
      user_id: user.id,
      name,
      color,
      closing_day: closingDay,
      due_day: dueDay,
      limit_amount: limitAmount,
    })
    .select()
    .single();

  if (error) {
    return { error: "Erro ao cadastrar cartão: " + error.message };
  }

  revalidatePath("/cards");
  revalidatePath("/dashboard");
  return { success: true, data: data as CreditCardRecord };
}

/**
 * Atualiza um cartão existente
 */
export async function updateCreditCardAction(
  cardId: string,
  formData: FormData
): Promise<CardActionResult> {
  const name = formData.get("name") as string;
  const color = (formData.get("color") as string) || "#10b981";
  const closingDay = parseInt(formData.get("closingDay") as string, 10);
  const dueDay = parseInt(formData.get("dueDay") as string, 10);
  const rawLimit = formData.get("limitAmount") as string;
  const limitAmount = rawLimit && rawLimit.trim() !== "" ? parseFloat(rawLimit) : null;

  const validation = creditCardSchema.safeParse({
    name,
    color,
    closingDay,
    dueDay,
    limitAmount,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Dados inválidos." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado." };
  }

  const { data, error } = await supabase
    .from("credit_cards")
    .update({
      name,
      color,
      closing_day: closingDay,
      due_day: dueDay,
      limit_amount: limitAmount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", cardId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { error: "Erro ao atualizar cartão: " + error.message };
  }

  revalidatePath("/cards");
  revalidatePath("/dashboard");
  return { success: true, data: data as CreditCardRecord };
}

/**
 * Remove um cartão de crédito
 */
export async function deleteCreditCardAction(cardId: string): Promise<CardActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado." };
  }

  // Futuramente na Fase 3 verificaremos se existem compromissos ativos vinculados a este cartão
  const { error } = await supabase
    .from("credit_cards")
    .delete()
    .eq("id", cardId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Erro ao excluir cartão: " + error.message };
  }

  revalidatePath("/cards");
  revalidatePath("/dashboard");
  return { success: true };
}
