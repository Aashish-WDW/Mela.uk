"use client";
import Link from "next/link";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { stats, vendors } from "@/lib/seed";
import { ShieldCheck, Truck, Clock, Handshake } from "lucide-react";

export default function Page() {
  return (
    <CustomerShell>
      <About />
    </CustomerShell>
  );
}

function About() {
  return (
    <div className="bg-white font-sans">
      <section className="bg-amazon-dark text-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            The Wholesale Desk <br className="hidden md:block" /> London Was Missing.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            MELA is a private B2B ecosystem for London's hospitality, retail, and trade
            professionals. We bridge the gap between vetted vendors and busy procurement teams
            through a single, central hub.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: stats.buyers.toLocaleString(), label: "Verified Buyers", icon: ShieldCheck },
            { value: stats.vendors, label: "Trusted Vendors", icon: Handshake },
            { value: `${stats.fulfilment}%`, label: "On-time Fulfilment", icon: Truck },
            { value: `${stats.responseHrs}h`, label: "Avg Response", icon: Clock },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="w-8 h-8 text-amazon-orange mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-amazon-dark">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="bg-amazon-orange/10 text-amazon-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
            Our Purpose
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-amazon-dark mb-6 leading-snug">
            Trade Relationships, <br /> Digitized for Speed.
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              Traditional wholesale relies on slow, fragmented communication. MELA brings the best
              of B2B procurement into a single digital interface, without losing the personal touch
              of trade negotiation.
            </p>
            <p>
              Our centralized logistics model in Park Royal allows for consolidated deliveries,
              reducing your environmental footprint while ensuring your stock levels never falter.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg aspect-video md:aspect-square relative overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
            alt="MELA Warehouse"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xs font-bold uppercase tracking-widest mb-1">Central Hub</div>
            <div className="text-xl font-bold">MELA-01 Park Royal</div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-28 border-y border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amazon-dark mb-4">
              Network of Excellence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We hand-select vendors who meet our stringent quality and reliability standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-gray-200 p-6 md:p-8 rounded-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-amazon-dark">{v.name}</h3>
                    <div className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter mt-0.5">
                      Verified Trade Partner
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 shrink-0">
                    ★ {v.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{v.blurb}</p>
                <div className="pt-5 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  <span>{v.city}</span>
                  <span>EST. {v.since}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-amazon-dark mb-8">
          Ready to Optimize Your Procurement?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark px-10 py-3 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
          >
            Register for Trade Account
          </Link>
          <Link
            href="/catalogue"
            className="w-full sm:w-auto bg-amazon-dark text-white hover:bg-gray-800 px-10 py-3 rounded-full text-sm font-bold transition-all active:scale-95"
          >
            View Catalogue
          </Link>
        </div>
        <p className="mt-8 text-xs text-gray-400 font-medium">
          Trade Desk Hours: Mon–Fri, 8am–7pm · Priority support for corporate partners.
        </p>
      </section>
    </div>
  );
}
