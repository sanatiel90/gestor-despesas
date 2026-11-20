import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um valor numérico para Moeda Brasileira (BRL)
 * Exemplo: 1250.5 -> "R$ 1.250,50"
 */
export function formatCurrencyBRL(value: number | string | null | undefined): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "R$ 0,00";
  }
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
}

/**
 * Converte string digitada com máscara monetária para número float puro
 * Exemplo: "R$ 1.250,50" -> 1250.50
 */
export function parseCurrencyBRL(val: string): number {
  if (!val) return 0;
  const cleaned = val.replace(/[^\d,]/g, "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
