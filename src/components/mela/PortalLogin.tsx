"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth, type Role } from "@/lib/auth";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";

const presets: Record<Role, { name: string; org: string; email: string; tagline: string }> = {
  customer: {
    name: "Sarah Cole",
    org: "Hawksmoor Group",
    email: "sarah@hawksmoor.example",
    tagline: "Buyer access",
  },
  vendor: {
    name: "James Okafor",
    org: "Borough Provisions Co.",
    email: "james@borough.example",
    tagline: "Vendor access",
  },
  admin: {
    name: "Priya Sharma",
    org: "MELA Operations",
    email: "priya@mela.london",
    tagline: "Operations access",
  },
};

export function PortalLogin({ role, accent }: { role: Role; accent: string }) {
  const { login } = useAuth();
  const p = presets[role];
  const [email, setEmail] = useState(p.email);
  const [password, setPassword] = useState("demo");
  const [name, setName] = useState(p.name);
  const [org, setOrg] = useState(p.org);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, { role, name, org });
  };

  const portalLabel = role === "vendor" ? "Vendor Hub" : "Admin Hub";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-6 font-sans">
      <div className="w-full max-w-[440px] space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 rounded-full bg-amazon-dark text-white grid place-items-center font-bold text-2xl transition-transform group-hover:scale-110 shadow-lg">
              m
            </div>
            <div className="text-3xl font-bold text-amazon-dark tracking-tighter">
              MELA <span className="text-amazon-orange">Trade</span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className={`w-2 h-2 rounded-full ${accent} animate-pulse`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {portalLabel} Authentication
            </span>
          </div>
          <h1 className="text-3xl font-bold text-amazon-dark tracking-tight">System Sign-In</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-xl shadow-black/5 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <Lock className="w-3.5 h-3.5" />
              Encrypted Session
            </div>
            <div className="text-[10px] font-bold text-amazon-orange uppercase tracking-widest">
              Demo Mode Active
            </div>
          </div>

          <form onSubmit={submit} className="p-8 space-y-5">
            <Field label="Full Operator Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="amazon-input"
                placeholder="Enter full name"
              />
            </Field>
            <Field label={role === "admin" ? "Internal System Email" : "Business Email"}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="amazon-input"
                placeholder="email@mela.london"
              />
            </Field>
            <Field label="Trade Organization">
              <input
                required
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="amazon-input"
                placeholder="e.g. MELA Operations"
              />
            </Field>
            <Field label="Security Key">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="amazon-input"
                placeholder="••••••••"
              />
            </Field>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark py-3 rounded-md text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Establish Secure Link
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="px-8 pb-8">
            <div className="flex gap-3 items-start bg-blue-50 p-4 rounded border border-blue-100">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-800 leading-normal font-medium italic">
                By accessing this portal, you acknowledge that all actions are logged and subject to
                MELA B2B security protocols.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            © 2026 MELA Trade Logistics District
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/about"
              className="text-[10px] font-bold text-gray-400 hover:text-amazon-orange uppercase tracking-widest transition-colors"
            >
              Infrastructure
            </Link>
            <Link
              href="/contact"
              className="text-[10px] font-bold text-gray-400 hover:text-amazon-orange uppercase tracking-widest transition-colors"
            >
              Tech Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] font-black uppercase tracking-widest text-amazon-dark mb-1.5 opacity-70">
        {label}
      </div>
      {children}
    </label>
  );
}
