"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyBRL } from "@/lib/utils";
import {
  TrendingUp,
  Settings,
  LogOut,
  Wallet,
  LayoutDashboard,
  CreditCard,
  CalendarDays,
} from "lucide-react";

interface HeaderProps {
  userEmail: string;
  fullName?: string | null;
  netMonthlyIncome: number;
}

export function Header({ userEmail, fullName, netMonthlyIncome }: HeaderProps) {
  const pathname = usePathname();

  const userInitial = fullName
    ? fullName.charAt(0).toUpperCase()
    : userEmail.charAt(0).toUpperCase();

  const navigation = [
    { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cartões", href: "/cards", icon: CreditCard },
    { name: "Projeção 12 Meses", href: "/projection", icon: CalendarDays },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline-block">Gestor Financeiro</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side stats & Profile */}
        <div className="flex items-center gap-4">
          {/* Income indicator pill */}
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            title="Clique para atualizar sua renda líquida"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline text-muted-foreground">Renda Líquida:</span>
            <span className="font-semibold">{formatCurrencyBRL(netMonthlyIncome)}</span>
          </Link>

          {/* User Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu do usuário"
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:opacity-80 transition-opacity outline-none"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-emerald-600 text-white font-semibold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{fullName || "Usuário"}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/settings" className="w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações da Conta</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400 cursor-pointer focus:text-red-600"
                onClick={async () => {
                  await logoutAction();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
