"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAuth, useCart } from "@/lib/auth";
import { Search, ShoppingCart, MapPin, Menu, User, ChevronDown, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/seed";

export function CustomerShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <CustomerHeader />
      <main className="flex-1">{children}</main>
      <CustomerFooter />
    </div>
  );
}

function CustomerHeader() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const router = useRouter();
  const [locOpen, setLocOpen] = useState(false);
  const [district, setDistrict] = useState("London NW10");

  const districts = [
    "London NW10 (Park Royal)",
    "London SE1 (Southwark)",
    "London E1 (Whitechapel)",
    "London W1 (Mayfair)",
    "London E14 (Canary Wharf)",
    "London N1 (Islington)",
  ];

  return (
    <header className="z-[100] sticky top-0 shadow-lg">
      <div className="bg-slate-900/90 text-white backdrop-blur-md border-b border-white/5 py-1 relative z-50">
        <div className="max-w-[1500px] mx-auto px-2 md:px-4 flex items-center gap-2 md:gap-4 h-14 md:h-16">
          <div className="flex items-center gap-1">
            <button className="md:hidden p-2 hover:bg-white/10 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-0.5 hover:bg-white/10 p-1 md:p-1.5 md:px-3 rounded-xl transition-all group shrink-0"
            >
              <span className="font-display text-2xl md:text-3xl font-black tracking-tighter italic">
                MELA
              </span>
              <span className="text-blue-500 font-black text-xl md:text-2xl mt-1">.uk</span>
            </Link>
          </div>

          <div className="relative hidden lg:block">
            <button
              onClick={() => setLocOpen(!locOpen)}
              className="flex items-center gap-2 hover:bg-white/10 p-2 px-3 rounded-xl transition-all text-left group shrink-0 border border-white/5"
            >
              <MapPin className="w-5 h-5 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Deliver to
                </span>
                <span className="text-sm font-bold leading-none mt-1 whitespace-nowrap">
                  {district}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
            {locOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 text-slate-900 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-2 py-2 mb-3">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
                    Select Distribution Hub
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {districts.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setDistrict(d.split(" (")[0]);
                        setLocOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl text-sm font-bold text-slate-700 transition-all flex items-center justify-between group"
                    >
                      {d}
                      {district === d.split(" (")[0] && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 flex h-11 md:h-12 group overflow-hidden rounded-xl bg-white/10 border border-white/10 focus-within:ring-2 focus-within:ring-blue-500/50 shadow-inner transition-all">
            <div className="hidden md:flex items-center bg-white/5 hover:bg-white/10 text-white px-5 border-r border-white/10 cursor-pointer text-xs font-bold transition-colors shrink-0">
              All <ChevronDown className="w-3 h-3 ml-2 opacity-60" />
            </div>
            <input
              type="text"
              placeholder="Search trade items, vendors or SKUs..."
              className="flex-1 px-5 bg-transparent outline-none text-white text-sm w-0 min-w-0 font-medium placeholder-slate-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 transition-all shrink-0 flex items-center justify-center shadow-lg group">
              <Search
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                strokeWidth={3}
              />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button className="hidden lg:flex items-center gap-1 hover:bg-white/10 p-2 px-3 rounded-xl text-sm font-bold transition-all">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-black ml-1 uppercase tracking-tighter">EN</span>
              <ChevronDown className="w-3 h-3 opacity-40" />
            </button>

            <div className="relative group hover:bg-white/10 p-2 px-3 rounded-xl transition-all cursor-pointer flex flex-col justify-center border border-transparent hover:border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Account
                </span>
                <span className="text-sm font-bold leading-none mt-1 flex items-center">
                  <span className="hidden sm:inline whitespace-nowrap">
                    {user ? user.name.split(" ")[0] : "Sign in"}
                  </span>
                  <User className="w-5 h-5 sm:hidden" />
                  <ChevronDown className="w-3 h-3 ml-1 text-slate-500 hidden sm:inline" />
                </span>
              </div>
              {!user && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl py-5 px-6 invisible group-hover:visible z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/login"
                    className="block w-full mela-button-primary text-center py-3 mb-4"
                  >
                    Sign in securely
                  </Link>
                  <div className="text-[11px] text-center text-slate-500 font-bold uppercase tracking-wider">
                    Authorized Trade Personnel Only
                  </div>
                </div>
              )}
              {user && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-slate-900 shadow-2xl rounded-2xl py-4 invisible group-hover:visible z-[110] border border-white/10 overflow-hidden">
                  <div className="px-6 py-2 border-b border-white/5 mb-2">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Trade Account
                    </div>
                  </div>
                  <Link
                    href="/orders"
                    className="block px-6 py-3 hover:bg-white/5 text-sm font-bold text-slate-200 transition-colors"
                  >
                    Your Orders
                  </Link>
                  <Link
                    href="/buyer/account"
                    className="block px-6 py-3 hover:bg-white/5 text-sm font-bold text-slate-200 transition-colors"
                  >
                    Trade Account
                  </Link>
                  <div className="h-px bg-white/5 my-2" />
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="block w-full text-left px-6 py-3 hover:bg-red-500/10 text-sm font-bold text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/orders"
              className="hidden xl:flex flex-col hover:bg-white/10 p-2 px-3 rounded-xl transition-all border border-transparent hover:border-white/5"
            >
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                Returns
              </span>
              <span className="text-sm font-bold leading-none mt-1">& Orders</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center hover:bg-white/10 p-2 px-3 rounded-xl transition-all relative border border-transparent hover:border-white/5 group"
            >
              <div className="relative">
                <ShoppingCart className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-slate-900">
                  {count}
                </span>
              </div>
              <span className="text-sm font-black hidden lg:inline ml-3">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-slate-900/90 backdrop-blur-md px-4 pb-4 border-b border-white/5 relative z-40">
        <div className="flex h-11 bg-slate-800 border border-white/10 rounded-xl overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
          <input
            type="text"
            placeholder="Search catalog..."
            className="flex-1 px-4 bg-transparent outline-none text-white text-sm w-0 min-w-0 font-medium placeholder-slate-400"
          />
          <button className="bg-blue-600 text-white px-5 transition-colors shrink-0 flex items-center justify-center">
            <Search className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="bg-slate-800/90 text-white h-11 flex items-center overflow-x-auto no-scrollbar scroll-smooth backdrop-blur-md border-b border-white/5 relative z-30">
        <div className="max-w-[1500px] mx-auto px-2 md:px-4 flex items-center gap-3 md:gap-6 w-full text-xs md:text-sm font-bold whitespace-nowrap">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-white/10 p-1.5 px-3 rounded-lg transition-all shrink-0">
                <Menu className="w-5 h-5" /> All Departments
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-slate-950 border-r border-white/10 p-0 text-white"
            >
              <SheetHeader className="p-6 bg-slate-900 border-b border-white/5">
                <SheetTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="font-black tracking-tight italic uppercase">
                    Hello, {user ? user.name.split(" ")[0] : "Sign in"}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="py-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                <div className="px-6 mb-6">
                  <h3 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                    Trade Sectors
                  </h3>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href="/catalogue"
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold group"
                      >
                        {c.name}
                        <ChevronDown className="w-4 h-4 -rotate-90 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-white/5 mx-6 mb-6" />
                <div className="px-6">
                  <h3 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                    Account & Settings
                  </h3>
                  <div className="space-y-1 text-sm font-bold">
                    <Link
                      href="/buyer/account"
                      className="block px-4 py-3 rounded-xl hover:bg-white/5"
                    >
                      Trade Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-3 rounded-xl hover:bg-white/5">
                      Order Tracking
                    </Link>
                    <Link href="/support" className="block px-4 py-3 rounded-xl hover:bg-white/5">
                      Enterprise Support
                    </Link>
                    {user && (
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <NavL href="/catalogue">Catalogue</NavL>
          <NavL href="/catalogue">Trade Deals</NavL>
          <NavL href="/catalogue">New arrivals</NavL>
          <NavL href="/support" className="hidden sm:block">
            Support
          </NavL>
          <NavL href="/catalogue" className="hidden lg:block">
            Logistics
          </NavL>

          <div className="ml-auto hidden md:flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] animate-pulse">
            <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            Direct Hub Active
          </div>
        </div>
      </div>
    </header>
  );
}

function NavL({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`p-1.5 px-3 rounded-lg transition-all text-xs md:text-[13px] font-bold hover:bg-white/10 hover:text-blue-400 ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

function CustomerFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-slate-950 text-white mt-12 font-sans overflow-x-hidden relative">
      <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" />
      <button
        onClick={scrollToTop}
        className="w-full bg-slate-900/50 hover:bg-slate-800 py-4 text-xs font-black uppercase tracking-[0.3em] transition-all border-y border-white/5 backdrop-blur-sm"
      >
        Back to top
      </button>
      <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center sm:text-left relative z-10">
        <div>
          <h4 className="font-black text-xs mb-8 uppercase tracking-[0.2em] text-blue-500">
            Corporate Hub
          </h4>
          <ul className="text-sm text-slate-400 space-y-4">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About MELA Hub
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Trade Solutions
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Logistics Network
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Digital Ecosystem
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs mb-8 uppercase tracking-[0.2em] text-blue-500">
            Partnerships
          </h4>
          <ul className="text-sm text-slate-400 space-y-4">
            <li>
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin Portal
              </Link>
            </li>
            <li>
              <Link href="/vendor" className="hover:text-white transition-colors">
                Vendor / Warehouse
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Verified Logistics
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs mb-8 uppercase tracking-[0.2em] text-blue-500">
            Financials
          </h4>
          <ul className="text-sm text-slate-400 space-y-4">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                MELA Trade Credit
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Direct Settlement
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Invoice Lifecycle
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Currency Exchange
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs mb-8 uppercase tracking-[0.2em] text-blue-500">
            Resource Center
          </h4>
          <ul className="text-sm text-slate-400 space-y-4">
            <li>
              <Link href="/buyer/account" className="hover:text-white transition-colors">
                Your Account
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-white transition-colors">
                Supply Chain Tracking
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Hub Operations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Enterprise Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-16 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-0.5 group cursor-pointer">
            <span className="font-display text-4xl font-black tracking-tighter italic">MELA</span>
            <span className="text-blue-500 font-black text-3xl mt-2 group-hover:translate-x-1 transition-transform">
              .uk
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] text-slate-500 font-black uppercase tracking-[0.15em]">
            <span className="border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer backdrop-blur-md">
              Global - English
            </span>
            <span className="border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer backdrop-blur-md">
              GBP - Sterling
            </span>
            <span className="border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer backdrop-blur-md">
              HQ - United Kingdom
            </span>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 py-12 px-6 text-center text-[10px] text-slate-600 border-t border-white/5 relative z-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6 font-bold uppercase tracking-widest">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Governance
          </Link>
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Privacy Framework
          </Link>
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Trade Cookies
          </Link>
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Accessibility
          </Link>
        </div>
        <div className="font-black tracking-[0.05em] uppercase text-slate-700">
          © 2024-2026, MELA GLOBAL TRADE NETWORK. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
