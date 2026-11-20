import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Informe um formato de e-mail válido"),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(60, "O nome não pode exceder 60 caracteres"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Informe um formato de e-mail válido"),
    password: z
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const profileIncomeSchema = z.object({
  netMonthlyIncome: z
    .number()
    .min(0, "A renda mensal líquida não pode ser negativa"),
});

export type ProfileIncomeFormData = z.infer<typeof profileIncomeSchema>;
