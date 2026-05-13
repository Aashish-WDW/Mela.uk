"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAuth, type Role } from "@/lib/auth";
import { PortalLogin } from "./PortalLogin";
import { Menu, X, LogOut, ChevronRight, ArrowRight } from "lucide-react";

export type NavItem = { to: string; label: string; icon?: any };

type Props = {
  portal: "Buyer" | "Vendor" | "Admin";
  role: Role;
  accent: string;
  nav: NavItem[];
  right?: ReactNode;
  children: ReactNode;
};

export function PortalShell({ portal, role, accent, nav, right, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, ready } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (!ready) return <div className="min-h-screen bg-slate-50" />;

  if (role !== "customer" && (!user || user.role !== role)) {
    return <PortalLogin role={role} accent={accent} />;
  }

  const displayName = user?.name ?? "Guest User";
  const displayOrg = user?.org ?? "MELA Trade Partner";

  const Sidebar = (
    <div className="h-full flex flex-col bg-slate-950 text-white">
      <Link href="/" className="px-6 py-8 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white grid place-items-center font-black text-2xl shadow-lg shadow-blue-500/20 italic tracking-tighter">
          M
        </div>
        <div>
          <div className="font-display text-2xl font-black tracking-tighter leading-none italic">
            MELA
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1.5 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${accent} animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
            />{" "}
            {portal} Hub
          </div>
        </div>
      </Link>

      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 px-3 mb-6">
          Portal Matrix
        </div>
        {nav.map((n) => {
          const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to + "/"));
          return (
            <Link
              key={n.to}
              href={n.to}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                {active && (
                  <ArrowRight className="w-4 h-4 animate-in slide-in-from-left-2 duration-300" />
                )}
                {n.label}
              </span>
              {!active && <ChevronRight className="w-4 h-4 opacity-20" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 bg-slate-900/50 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-black text-xs text-blue-400 shadow-inner">
            {displayName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm truncate text-slate-200">{displayName}</div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest truncate">
              {displayOrg}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/10"
        >
          <LogOut className="w-3.5 h-3.5" />
          Terminate Session
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-slate-200 sticky top-0 h-screen shadow-xl shadow-black/5">
        {Sidebar}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-slate-950 shadow-2xl transition-transform duration-300">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            {Sidebar}
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-slate-200 px-4 sm:px-6 lg:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap hidden sm:inline">
                Central Hub
              </span>
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 hidden sm:inline" />
              <span className="text-xs font-bold text-slate-900 truncate uppercase italic tracking-tight">
                {portal} Portal · London District
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">{right}</div>
        </header>

        <div className="p-4 sm:p-8 lg:p-12 max-w-[1200px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 border-b border-slate-200 pb-10">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none italic uppercase break-words">
          {title}
        </h1>
        {sub && (
          <p className="text-slate-500 mt-4 max-w-2xl text-xs sm:text-sm md:text-base font-medium leading-relaxed">
            {sub}
          </p>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 group-hover:text-blue-600 transition-colors">
        {label}
      </div>
      <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{value}</div>
      {hint && (
        <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />{" "}
          {hint}
        </div>
      )}
    </div>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "good" | "warn" | "bad" | "info";
}) {
  const tones: Record<string, string> = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    good: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warn: "bg-amber-50 text-amber-800 border-amber-100",
    bad: "bg-red-50 text-red-700 border-red-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
