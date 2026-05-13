import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, Pill } from "@/components/mela/PortalShell";
import { products, enquiries, orders, findProduct, findVendor, categories } from "@/lib/seed";
import { LayoutDashboard, ShoppingBag, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/buyer/")({
  component: BuyerHome,
});

function BuyerHome() {
  const recent = enquiries.filter((e) => e.buyerCompany === "Hawksmoor Group");
  const recommended = products.slice(0, 4);
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        eyebrow="Central Trade Desk"
        title="Sarah, welcome back."
        sub="Monitor your live hub enquiries, manage trade re-stocks, and optimize your procurement lifecycle."
        action={
          <Link to="/buyer/catalogue" className="mela-button-primary px-8 py-4 flex items-center gap-2 shadow-xl">
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
               <h2 className="text-2xl font-black tracking-tight italic uppercase">Recommended for Hub</h2>
               <p className="text-slate-500 text-sm font-medium mt-1">Based on your historical procurement patterns.</p>
            </div>
            <Link to="/buyer/catalogue" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Full Analytics</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((p) => <ProductCard key={p.id} id={p.id} />)}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <Panel title="Recent Enquiries" icon={<MessageSquare className="w-5 h-5 text-blue-600" />} link={{ to: "/buyer/enquiries", label: "Registry" }}>
          <ul className="divide-y divide-slate-100">
            {recent.map((e) => {
              const p = findProduct(e.product);
              return (
                <li key={e.id} className="py-4 flex items-center justify-between group cursor-pointer hover:px-2 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <TrendingUp className="w-4 h-4" />
                     </div>
                     <div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{p?.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{e.ref} · {e.qty} {p?.unit}</div>
                     </div>
                  </div>
                  <Pill tone={e.status === "Won" ? "good" : e.status === "New" ? "info" : "warn"}>{e.status}</Pill>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Market Sectors" icon={<LayoutDashboard className="w-5 h-5 text-blue-600" />} link={{ to: "/buyer/catalogue", label: "Directory" }}>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((c) => (
              <Link key={c.slug} to="/buyer/catalogue" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-500/20 transition-all group">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{c.name}</div>
                <div className="text-xs font-bold text-slate-500 group-hover:text-slate-700 line-clamp-1">{c.blurb}</div>
              </Link>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

export function ProductCard({ id }: { id: string }) {
  const p = findProduct(id)!;
  const v = findVendor(p.vendor)!;
  return (
    <Link to="/buyer/catalogue" className="group mela-card overflow-hidden hover:shadow-blue-500/10 transition-all">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-3 left-3 text-[8px] font-black uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-2 py-1 rounded shadow-sm">Enterprise Trade</div>
        <div className="absolute bottom-3 right-3 font-mono text-[8px] font-bold bg-slate-900/80 text-white backdrop-blur-md px-2 py-1 rounded">{p.sku}</div>
      </div>
      <div className="p-5">
        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{v.name}</div>
        <div className="font-black text-lg leading-tight mt-2 text-slate-900 group-hover:text-blue-700 transition-colors italic tracking-tight uppercase line-clamp-1">{p.name}</div>
        <div className="text-[10px] font-bold text-slate-500 mt-3 flex items-center gap-2">
            <ShoppingBag className="w-3 h-3" /> {p.unit} · MOQ {p.moq}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <Pill tone={p.stock > 200 ? "good" : "warn"}>{p.stock > 200 ? "In Stock" : "Low Hub"}</Pill>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">Procure <ArrowUpRight className="w-3 h-3" /></span>
        </div>
      </div>
    </Link>
  );
}

function Panel({ title, icon, link, children }: { title: string; icon: React.ReactNode; link?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <div className="mela-card p-6 md:p-8 border-t-4 border-slate-200 hover:border-blue-500 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
              {icon}
           </div>
           <h3 className="font-black text-lg tracking-tight uppercase italic">{title}</h3>
        </div>
        {link && <Link to={link.to} className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-1">{link.label} <ArrowUpRight className="w-3 h-3" /></Link>}
      </div>
      {children}
    </div>
  );
}
