"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema, profileIncomeSchema } from "@/schemas/auth";

export type AuthActionResult = {
  success?: boolean;
  error?: string;
};

/**
 * Autentica o usuário com e-mail e senha
 */
export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "E-mail ou senha incorretos." };
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/**
 * Cadastra um novo usuário
 */
export async function registerAction(formData: FormData): Promise<AuthActionResult> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validation = registerSchema.safeParse({
    fullName,
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Este e-mail já possui uma conta cadastrada." };
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/**
 * Encerra a sessão do usuário
 */
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

/**
 * Atualiza a renda mensal líquida do perfil
 */
export async function updateMonthlyIncomeAction(formData: FormData): Promise<AuthActionResult> {
  const incomeValue = parseFloat(formData.get("netMonthlyIncome") as string);

  const validation = profileIncomeSchema.safeParse({ netMonthlyIncome: incomeValue });
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Valor inválido para renda." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sessão expirada. Faça login novamente." };
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      net_monthly_income: incomeValue,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    return { error: "Erro ao atualizar a renda mensal: " + error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/settings");
  return { success: true };
}
