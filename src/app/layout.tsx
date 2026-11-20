import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestor de Assinaturas e Compromissos Financeiros",
  description: "Previsibilidade financeira pessoal e projeção de caixa para os próximos 12 meses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${roboto.variable} antialiased`}>
      <body className="font-sans min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
        <Toaster position="top-right" theme="dark" richColors closeButton />
      </body>
    </html>
  );
}
