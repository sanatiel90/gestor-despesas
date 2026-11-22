import { z } from "zod";

export const creditCardSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do cartão deve ter pelo menos 2 caracteres")
    .max(40, "O nome não pode exceder 40 caracteres"),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Cor hexadecimal inválida")
    .default("#10b981"),
  closingDay: z
    .number()
    .int("O dia deve ser um número inteiro")
    .min(1, "O dia de fechamento deve ser entre 1 e 31")
    .max(31, "O dia de fechamento deve ser entre 1 e 31"),
  dueDay: z
    .number()
    .int("O dia deve ser um número inteiro")
    .min(1, "O dia de vencimento deve ser entre 1 e 31")
    .max(31, "O dia de vencimento deve ser entre 1 e 31"),
  limitAmount: z
    .number()
    .min(0, "O limite não pode ser negativo")
    .nullable()
    .optional(),
});

export type CreditCardFormData = z.infer<typeof creditCardSchema>;

export interface CreditCardRecord {
  id: string;
  user_id: string;
  name: string;
  color: string;
  closing_day: number;
  due_day: number;
  limit_amount: number | null;
  created_at: string;
  updated_at: string;
}
