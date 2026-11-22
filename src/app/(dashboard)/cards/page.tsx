import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CardsClientList } from "@/components/cards/cards-client-list";
import { CreditCardRecord } from "@/schemas/cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cartões de Crédito · Gestor Financeiro",
  description: "Gerencie seus cartões de crédito e ciclos de fatura.",
};

export default async function CardsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: cards, error } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <CardsClientList initialCards={(cards as CreditCardRecord[]) || []} />;
}
