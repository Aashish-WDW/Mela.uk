import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { categories, vendors, products } from "@/lib/seed";
import { DealsCarousel } from "@/components/mela/DealsCarousel";
import { CustomerShell } from "@/components/mela/CustomerShell";
import SparklesText from "@/components/magicui/SparklesText";
import Marquee from "@/components/magicui/Marquee";
import NeonGradientCard from "@/components/magicui/NeonGradientCard";
import catTrade from "@/assets/cat-trade.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mela.uk — London's B2B Wholesale Marketplace" },
      { name: "description", content: "Verified buyers. Vetted vendors. One London warehouse." },
    ],
  }),
  component: () => (
    <CustomerShell>
      <Landing />
    </CustomerShell>
  ),
});

function Landing() {
  const [loading, setLoading] = useState(true);
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(4, 12);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* HERO = Carousel */}
      <section className="relative h-[380px] md:h-[650px] lg:h-[720px] overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full bg-slate-200 animate-pulse" />
        ) : (
          <DealsCarousel />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Main Grid Overlay */}
      <section className="max-w-[1500px] mx-auto px-4 -mt-12 md:-mt-32 lg:-mt-44 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Category Squares from Seed Data */}
          {loading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} className="h-[400px] rounded-3xl bg-white/50 backdrop-blur-sm" />)
          ) : (
            categories.slice(0, 3).map((c) => (
              <CategorySquare key={c.slug} title={c.name} linkText="Explore Hub" image={c.image} subItems={c.subs.slice(0, 4)} />
            ))
          )}
          
          {/* Sign in Card with Neon Gradient */}
          <NeonGradientCard className="flex flex-col h-full" borderRadius={24} borderSize={2}>
            <div className="p-6 flex flex-col h-full group">
              <h3 className="text-2xl font-black mb-6 tracking-tighter group-hover:text-blue-600 transition-colors">Enterprise Access</h3>
              <Link to="/login" className="block w-full mela-button-primary text-center py-3.5 transition-all shadow-xl">
                Sign in securely
              </Link>
              <div className="mt-auto border-t border-slate-200/50 pt-8">
                  <div className="relative h-40 overflow-hidden rounded-2xl mb-4 shadow-inner">
                     <img src={catTrade} alt="Trade" className="w-full h-full object-cover transition-transform hover:scale-110 duration-1000 ease-out" />
                     <div className="absolute inset-0 bg-blue-900/10" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.1em] leading-relaxed">
                     Verified partners get priority hub access & enterprise-grade pricing.
                  </p>
              </div>
            </div>
          </NeonGradientCard>
        </div>

        {/* Best Sellers Strip */}
        <div className="mt-8 md:mt-12 mela-card p-6 md:p-8 glass overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter italic">Top Trade Acquisitions</h2>
            <Link to="/catalogue" className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline hover:text-blue-700">See full catalog</Link>
          </div>
          <div className="flex gap-6 md:gap-8 overflow-x-auto pb-6 -mx-1 px-1 snap-x scrollbar-hide">
             {loading ? (
               [...Array(6)].map((_, i) => <Skeleton key={i} className="min-w-[200px] aspect-[3/4] rounded-2xl" />)
             ) : (
               bestSellers.map(p => (
                  <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="min-w-[160px] md:min-w-[200px] group snap-start">
                     <div className="aspect-square bg-slate-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden border border-slate-200/50 shadow-sm transition-all group-hover:shadow-blue-500/10">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                     </div>
                     <div className="text-sm font-bold group-hover:text-blue-600 group-hover:underline line-clamp-2 leading-tight h-10 transition-colors">{p.name}</div>
                     <div className="flex items-center mt-2">
                        <div className="flex text-blue-500 text-[10px] space-x-0.5">
                           {[...Array(5)].map((_, i) => <span key={i} className="drop-shadow-sm">★</span>)}
                        </div>
                        <span className="text-[10px] text-slate-400 ml-2 font-bold">1.2k+ Sold</span>
                     </div>
                     <div className="text-[11px] font-black text-blue-600 mt-2 uppercase tracking-widest border-l-2 border-blue-500 pl-2">Hub Direct</div>
                  </Link>
               ))
             )}
          </div>
        </div>

        {/* Full Categories Strip - Two Rows */}
        <div className="mt-8 md:mt-12 mela-card p-6 md:p-10 glass">
            <h2 className="text-2xl md:text-3xl font-black mb-10 flex items-center justify-between tracking-tighter italic">
               <SparklesText text="Acquire by Sector" className="text-3xl md:text-4xl" />
               <Link to="/catalogue" className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Full Directory</Link>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
                {loading ? (
                   [...Array(12)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-full" />)
                ) : (
                  <>
                    {categories.map(c => (
                        <Link key={c.slug} to="/catalogue" className="flex flex-col items-center group">
                            <div className="w-full aspect-square rounded-full overflow-hidden mb-6 border-2 border-slate-100 group-hover:border-blue-500 transition-all p-1.5 bg-white shadow-xl group-hover:shadow-blue-500/20">
                               <img src={c.image} alt={c.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700 ease-out" />
                            </div>
                            <div className="text-center">
                               <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{c.name}</div>
                               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{c.subs.length} Segments</div>
                            </div>
                        </Link>
                    ))}
                    {categories.map(c => (
                        <Link key={c.slug + '-2'} to="/catalogue" className="flex flex-col items-center group opacity-80 hover:opacity-100">
                            <div className="w-full aspect-square rounded-full overflow-hidden mb-6 border-2 border-slate-100 group-hover:border-blue-500 transition-all p-1.5 bg-white shadow-xl group-hover:shadow-blue-500/20">
                               <img src={c.image} alt={c.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700 ease-out" />
                            </div>
                            <div className="text-center">
                               <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">Enterprise {c.name}</div>
                               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Hub Preferred</div>
                            </div>
                        </Link>
                    ))}
                  </>
                )}
            </div>
        </div>

        {/* Featured Items and Sidebar */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="lg:col-span-3 mela-card p-6 md:p-8 glass">
                <h2 className="text-xl md:text-2xl font-black mb-8 tracking-tighter italic">Newly Fulfilled Hub Acquisitions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {loading ? (
                      [...Array(4)].map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />)
                    ) : (
                      featured.map(p => (
                          <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group">
                              <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden relative border border-slate-200/50 shadow-sm transition-all group-hover:shadow-blue-500/10">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg tracking-[0.1em] uppercase">Enterprise Deal</div>
                              </div>
                              <div className="text-sm font-bold group-hover:text-blue-600 group-hover:underline line-clamp-1 transition-colors">{p.name}</div>
                              <div className="text-[11px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">{p.unit}</div>
                              <div className="text-[10px] text-emerald-600 font-black mt-2 uppercase tracking-widest flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                 Hub Ready
                              </div>
                          </Link>
                      ))
                    )}
                </div>
            </div>
            
            <div className="mela-card p-6 md:p-8 glass border-t-4 border-blue-600">
                <h2 className="text-xl font-black mb-6 tracking-tighter italic">Why Hub with Mela?</h2>
                <ul className="space-y-6">
                    <FeatureItem num="01" text="Access 500+ verified enterprise partners." />
                    <FeatureItem num="02" text="High-velocity fulfillment via London Hubs." />
                    <FeatureItem num="03" text="Zero-friction logistics & supply management." />
                </ul>
                <div className="mt-10 p-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center italic">
                    Institutional Access Restricted
                </div>
            </div>
        </div>

        {/* Partners Marquee */}
        <div className="mt-8 md:mt-12 mela-card p-6 md:p-12 glass overflow-hidden">
             <h2 className="text-xl md:text-2xl font-black mb-8 md:mb-10 text-center tracking-tighter italic uppercase">Strategic Supply Partners</h2>
             <Marquee pauseOnHover className="[--duration:30s] md:[--duration:20s]">
                {vendors.map(v => (
                    <div key={v.id} className="flex flex-col items-center justify-center text-center group cursor-pointer mx-8">
                        <div className="w-20 h-20 rounded-2xl mb-4 border border-slate-200 p-2 bg-white shadow-sm group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all flex items-center justify-center">
                           <img src={v.logo} alt={v.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">{v.name.split(' ')[0]}</div>
                    </div>
                ))}
             </Marquee>
        </div>
      </section>
    </div>
  );
}

function CategorySquare({ title, linkText, image, subItems }: { title: string; linkText: string; image: string; subItems: string[] }) {
    return (
        <div className="mela-card p-6 flex flex-col group glass">
            <h3 className="text-xl font-black mb-6 line-clamp-1 tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic">{title}</h3>
            <div className="aspect-[4/3] mb-6 overflow-hidden rounded-2xl relative cursor-pointer shadow-lg border border-slate-200/50">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8">
                {subItems.map(item => (
                    <Link key={item} to="/catalogue" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 hover:underline transition-colors leading-none">
                        {item}
                    </Link>
                ))}
            </div>
            <Link to="/catalogue" className="text-blue-600 text-[10px] mt-auto hover:underline hover:text-blue-700 font-black uppercase tracking-[0.2em]">{linkText}</Link>
        </div>
    );
}

function FeatureItem({ num, text }: { num: string; text: string }) {
    return (
        <li className="flex gap-4 items-start group">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-black shadow-lg group-hover:scale-110 transition-transform">{num}</div>
            <div className="text-[13px] leading-relaxed font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{text}</div>
        </li>
    );
}
