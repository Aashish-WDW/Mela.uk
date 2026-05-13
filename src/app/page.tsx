"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { categories, vendors, products, stats } from "@/lib/seed";
import { useCart } from "@/lib/auth";
import { DealsCarousel } from "@/components/mela/DealsCarousel";
import { CustomerShell } from "@/components/mela/CustomerShell";
import SparklesText from "@/components/magicui/SparklesText";
import Marquee from "@/components/magicui/Marquee";
import {
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Package,
  Truck,
  Star,
  ChevronRight,
  Building2,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Page() {
  return (
    <CustomerShell>
      <Landing />
    </CustomerShell>
  );
}

function Landing() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const { add } = useCart();
  const router = useRouter();
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(0, 8);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string, productName: string) => {
    e.preventDefault();
    e.stopPropagation();
    add(productId, 1);
    showToast(`Added to cart`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] md:h-[620px] lg:h-[700px] overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full bg-slate-200 animate-pulse" />
        ) : (
          <DealsCarousel />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Stats Strip */}
      <section className="bg-slate-900 text-white py-6 -mt-1 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-slate-700">
            <StatCell
              icon={<Users className="w-5 h-5 text-blue-400" />}
              value={`${stats.buyers.toLocaleString()}+`}
              label="Trade Buyers"
            />
            <StatCell
              icon={<Building2 className="w-5 h-5 text-blue-400" />}
              value={`${stats.vendors}+`}
              label="Verified Vendors"
            />
            <StatCell
              icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
              value={`${stats.fulfilment}%`}
              label="Fulfilment Rate"
            />
            <StatCell
              icon={<Clock className="w-5 h-5 text-blue-400" />}
              value={`${stats.responseHrs}h`}
              label="Avg. Response Time"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16">
        {/* Category Cards — full-bleed dark overlay */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mb-2">
                Browse by Category
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Shop the Hub</h2>
            </div>
            <Link
              href="/catalogue"
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:underline"
            >
              All Categories <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalogue?cat=${c.slug}`}
                className="relative group rounded-2xl overflow-hidden aspect-[3/4] block"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-black text-sm uppercase tracking-tight leading-tight mb-1">
                    {c.name}
                  </div>
                  <div className="text-blue-300 text-[9px] font-bold uppercase tracking-[0.2em]">
                    {c.subs.length} segments
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-600 rounded-full p-1.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Sellers Grid */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mb-2">
                Trending Now
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Top Trade Picks</h2>
            </div>
            <Link
              href="/catalogue"
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:underline"
            >
              Full Catalogue <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {loading
              ? [...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                ))
              : bestSellers.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-blue-500/10 hover:border-blue-200 transition-all overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-[0.15em] shadow">
                        Hub Direct
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        {p.unit}
                      </div>
                      <div className="font-bold text-sm leading-snug line-clamp-2 text-slate-900 group-hover:text-blue-600 transition-colors flex-1 mb-3">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-blue-500 text-blue-500" />
                        ))}
                        <span className="text-[9px] font-bold text-slate-400 ml-1">1.2k+</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">
                          {p.stock > 100 ? "In Stock" : `${p.stock} left`}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, p.id, p.name)}
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 mb-3">
              Simple & Transparent
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              <SparklesText
                text="How It Works"
                className="text-3xl md:text-5xl text-white"
                as="span"
              />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <HowStep
              num="01"
              icon={<Package className="w-6 h-6 text-blue-400" />}
              title="Browse & Discover"
              desc="Search 500+ products across 6 trade categories. Filter by vendor, MOQ, lead time, and more."
              cta="Browse Catalogue"
              href="/catalogue"
            />
            <HowStep
              num="02"
              icon={<CheckCircle className="w-6 h-6 text-blue-400" />}
              title="Request a Quote"
              desc="Submit your quantity and requirements. Our trade desk responds within 1.6 hours on average."
              cta="Create Account"
              href="/login"
            />
            <HowStep
              num="03"
              icon={<Truck className="w-6 h-6 text-blue-400" />}
              title="Fast Fulfilment"
              desc="Orders dispatched from our London hub. Track your delivery in real-time, 98.6% on-time rate."
              cta="Learn More"
              href="/catalogue"
            />
          </div>
        </section>

        {/* Featured New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mb-2">
                Just Arrived
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">New Acquisitions</h2>
            </div>
            <Link
              href="/catalogue"
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:underline"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)
              : featured.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group relative rounded-2xl overflow-hidden block aspect-[3/4]"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg">
                        Enterprise Deal
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-white font-black text-base leading-snug mb-1 line-clamp-2">
                        {p.name}
                      </div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                        {p.unit}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                            Hub Ready
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, p.id, p.name)}
                          className="bg-white/15 hover:bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 border border-white/20 hover:border-transparent"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </section>

        {/* Browse by Sector — circles */}
        <section className="mela-card p-8 md:p-12 glass">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter">
              <SparklesText text="Browse by Sector" className="text-2xl md:text-3xl" as="span" />
            </h2>
            <Link
              href="/catalogue"
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-600 hover:underline"
            >
              Full Directory <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalogue?cat=${c.slug}`}
                className="flex flex-col items-center group"
              >
                <div className="w-full aspect-square rounded-full overflow-hidden mb-4 border-2 border-slate-100 group-hover:border-blue-500 transition-all p-1.5 bg-white shadow-lg group-hover:shadow-blue-500/20">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight">
                    {c.name}
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {c.subs.length} segments
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why MELA strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WhyCard
            num="01"
            title="Verified Partners Only"
            desc="Every vendor is identity-checked and quality-audited before listing. No grey-market stock."
          />
          <WhyCard
            num="02"
            title="London Hub Logistics"
            desc="Dispatch from Park Royal warehouse. Same-day and next-day slots available for trade accounts."
          />
          <WhyCard
            num="03"
            title="Dedicated Trade Desk"
            desc="Real humans. Respond in under 2 hours on quotes, contracts, and custom pricing."
          />
        </section>

        {/* Vendors Marquee */}
        <section className="mela-card p-8 md:p-12 glass overflow-hidden">
          <h2 className="text-xl md:text-2xl font-black mb-10 text-center tracking-tighter uppercase italic">
            Strategic Supply Partners
          </h2>
          <Marquee pauseOnHover className="[--duration:30s]">
            {vendors.map((v) => (
              <Link
                key={v.id}
                href={`/catalogue?vendor=${v.id}`}
                className="flex flex-col items-center justify-center text-center group cursor-pointer mx-8"
              >
                <div className="w-20 h-20 rounded-2xl mb-4 border border-slate-200 p-2 bg-white shadow-sm group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all flex items-center justify-center">
                  <img
                    src={v.logo}
                    alt={v.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">
                  {v.name.split(" ")[0]}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-2.5 h-2.5 fill-blue-500 text-blue-500" />
                  <span className="text-[8px] font-bold text-slate-400">{v.rating}</span>
                </div>
              </Link>
            ))}
          </Marquee>
        </section>

        {/* Bottom CTA */}
        <section className="relative rounded-3xl overflow-hidden bg-blue-600 px-8 md:px-16 py-14 md:py-20 text-white text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200 mb-4">
            Join 2,487 Trade Businesses
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.1]">
            Ready to source
            <br />
            smarter?
          </h2>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get access to wholesale pricing, priority fulfilment, and a dedicated trade desk — all
            in one hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Create Trade Account
            </Link>
            <Link
              href="/catalogue"
              className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 border border-blue-400/50 flex items-center gap-2 justify-center"
            >
              Browse Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300 border-b-4 border-blue-500 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}

function StatCell({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center md:items-start gap-1 md:px-8 text-center md:text-left">
      <div className="flex items-center gap-2 mb-0.5">
        {icon}
        <span className="text-2xl md:text-3xl font-black tracking-tighter">{value}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

function HowStep({
  num,
  icon,
  title,
  desc,
  cta,
  href,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center text-center relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-5 relative">
        {icon}
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center">
          {num}
        </span>
      </div>
      <h3 className="text-lg font-black mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
      <Link
        href={href}
        className="text-blue-400 hover:text-blue-300 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
      >
        {cta} <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function WhyCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="mela-card p-7 glass border-t-4 border-blue-600 group hover:border-blue-500 transition-all">
      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black mb-5 shadow-lg group-hover:scale-110 transition-transform">
        {num}
      </div>
      <h3 className="font-black text-base mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
