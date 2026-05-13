"use client";
import Link from "next/link";
import { PageHeader, StatCard, Pill } from "@/components/mela/PortalShell";
import { ProductCard } from "@/components/mela/ProductCard";
import { products, enquiries, orders, findProduct, findVendor, categories } from "@/lib/seed";
import { MessageSquare, TrendingUp, LayoutDashboard, ArrowUpRight } from "lucide-react";
import { type ReactNode } from "react";

export default function Page() {
  const recent = enquiries.filter((e) => e.buyerCompany === "Hawksmoor Group");
  const recommended = products.slice(0, 4);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        eyebrow="Central Trade Desk"
        title="Sarah, welcome back."
        sub="Monitor your live hub enquiries, manage trade re-stocks, and optimize your procurement lifecycle."
        action={
          <Link
            href="/buyer/catalogue"
            className="mela-button-primary px-8 py-4 flex items-center gap-2 shadow-xl"
          >
            Browse Catalogue <ArrowUpRight className="w-4 h-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Enquiries" value={recent.length} hint="Avg response 1.6h" />
        <StatCard label="In Dispatch" value="2" hint="MELA-01 Park Royal" />
        <StatCard label="Quarterly Volume" value="38" hint="↑ 22% vs Q2" />
        <StatCard label="Saved Hubs" value="6" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight italic uppercase">
              Recommended for Hub
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Based on your historical procurement patterns.
            </p>
          </div>
          <Link
            href="/buyer/catalogue"
            className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            Full Analytics
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <Panel
          title="Recent Enquiries"
          icon={<MessageSquare className="w-5 h-5 text-blue-600" />}
          link={{ to: "/buyer/enquiries", label: "Registry" }}
        >
          <ul className="divide-y divide-slate-100">
            {recent.map((e) => {
              const p = findProduct(e.product);
              return (
                <li
                  key={e.id}
                  className="py-4 flex items-center justify-between group cursor-pointer hover:px-2 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {p?.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {e.ref} · {e.qty} {p?.unit}
                      </div>
                    </div>
                  </div>
                  <Pill tone={e.status === "Won" ? "good" : e.status === "New" ? "info" : "warn"}>
                    {e.status}
                  </Pill>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title="Market Sectors"
          icon={<LayoutDashboard className="w-5 h-5 text-blue-600" />}
          link={{ to: "/buyer/catalogue", label: "Directory" }}
        >
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href="/buyer/catalogue"
                className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-500/20 transition-all group"
              >
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                  {c.name}
                </div>
                <div className="text-xs font-bold text-slate-500 group-hover:text-slate-700 line-clamp-1">
                  {c.blurb}
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Panel({
  title,
  icon,
  link,
  children,
}: {
  title: string;
  icon: ReactNode;
  link?: { to: string; label: string };
  children: ReactNode;
}) {
  return (
    <div className="mela-card p-6 md:p-8 border-t-4 border-slate-200 hover:border-blue-500 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            {icon}
          </div>
          <h3 className="font-black text-lg tracking-tight uppercase italic">{title}</h3>
        </div>
        {link && (
          <Link
            href={link.to}
            className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-1"
          >
            {link.label} <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
