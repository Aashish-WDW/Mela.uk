"use client";

import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { findProduct, findVendor } from "@/lib/seed";
import { Pill } from "@/components/mela/PortalShell";

export function ProductCard({ id }: { id: string }) {
  const p = findProduct(id)!;
  const v = findVendor(p.vendor)!;
  return (
    <Link
      href="/buyer/catalogue"
      className="group mela-card overflow-hidden hover:shadow-blue-500/10 transition-all"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-3 left-3 text-[8px] font-black uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-2 py-1 rounded shadow-sm">
          Enterprise Trade
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[8px] font-bold bg-slate-900/80 text-white backdrop-blur-md px-2 py-1 rounded">
          {p.sku}
        </div>
      </div>
      <div className="p-5">
        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
          {v.name}
        </div>
        <div className="font-black text-lg leading-tight mt-2 text-slate-900 group-hover:text-blue-700 transition-colors italic tracking-tight uppercase line-clamp-1">
          {p.name}
        </div>
        <div className="text-[10px] font-bold text-slate-500 mt-3 flex items-center gap-2">
          <ShoppingBag className="w-3 h-3" /> {p.unit} · MOQ {p.moq}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <Pill tone={p.stock > 200 ? "good" : "warn"}>
            {p.stock > 200 ? "In Stock" : "Low Hub"}
          </Pill>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Procure <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
