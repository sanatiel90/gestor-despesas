import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Buscar perfil financeiro
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, net_monthly_income")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || user.user_metadata?.full_name || null;
  const netIncome = Number(profile?.net_monthly_income || 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        userEmail={user.email || ""}
        fullName={fullName}
        netMonthlyIncome={netIncome}
      />
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
