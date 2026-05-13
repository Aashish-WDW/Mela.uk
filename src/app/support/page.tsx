"use client";
import Link from "next/link";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { staff } from "@/lib/seed";
import {
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Building2,
} from "lucide-react";

export default function Page() {
  return (
    <CustomerShell>
      <SupportTeam />
    </CustomerShell>
  );
}

function SupportTeam() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      {/* Hero */}
      <div className="bg-amazon-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Trade Desk · London HQ
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
            Your Support Team
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Real people. Deep trade expertise. Every enquiry is handled by a named specialist, not a
            ticket queue.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
            <StatPill value="&lt; 2h" label="Response time" />
            <StatPill value="98.6%" label="Resolution rate" />
            <StatPill value="24/7" label="Emergency line" />
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 -mt-6 relative z-10">
        {/* Team cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {staff.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all overflow-hidden group"
            >
              {/* Coloured top strip */}
              <div className="h-2 bg-gradient-to-r from-amazon-dark to-blue-600" />

              <div className="p-7">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        s.status === "Active"
                          ? "bg-emerald-500"
                          : s.status === "Away"
                            ? "bg-orange-400"
                            : "bg-blue-400"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-lg text-amazon-dark leading-tight group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </h3>
                    <div className="text-[10px] font-black text-amazon-orange uppercase tracking-[0.15em] mt-0.5">
                      {s.role}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {s.dept} · {s.status}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {getDeptTags(s.dept).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium group/link"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 group-hover/link:text-blue-600" />
                  <span className="truncate">{s.email}</span>
                </a>
              </div>

              <div className="border-t border-gray-100 px-7 py-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 group/cta"
                >
                  Send Enquiry
                  <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Channels section */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <ChannelCard
            icon={<Phone className="w-6 h-6 text-amazon-orange" />}
            title="Priority Trade Line"
            value="+44 (0) 20 4538 0100"
            sub="Mon–Fri · 8am – 7pm GMT"
            badge="Fastest Response"
          />
          <ChannelCard
            icon={<Mail className="w-6 h-6 text-amazon-orange" />}
            title="Trade Enquiries"
            value="trade@mela.london"
            sub="Verified buyers only"
            badge="< 2h Reply"
          />
          <ChannelCard
            icon={<MessageSquare className="w-6 h-6 text-amazon-orange" />}
            title="Submit Enquiry Form"
            value="Online Form"
            sub="Structured requests handled faster"
            badge="Recommended"
            href="/contact"
          />
        </div>

        {/* Why us strip */}
        <div className="bg-amazon-dark text-white rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 mb-14">
          <WhyItem
            icon={<Shield className="w-5 h-5 text-blue-400" />}
            title="Named Accountability"
            desc="Every enquiry is owned by a real person. No bots, no anonymous queues."
          />
          <WhyItem
            icon={<Clock className="w-5 h-5 text-blue-400" />}
            title="Sub-2hr Guarantee"
            desc="We commit to a substantive response — not an auto-acknowledgement — within 2 working hours."
          />
          <WhyItem
            icon={<Building2 className="w-5 h-5 text-blue-400" />}
            title="London HQ"
            desc="Our trade desk operates from MELA-01 Park Royal — the same hub that ships your orders."
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-6 font-medium">
            Ready to send your first trade enquiry?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-amazon-dark hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Submit Trade Enquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function getDeptTags(dept: string): string[] {
  const map: Record<string, string[]> = {
    Operations: ["Logistics", "Fulfilment", "Planning"],
    Sales: ["Quotes", "Bulk Orders", "Pricing"],
    Warehouse: ["Stock", "Dispatch", "Returns"],
    Partnerships: ["Vendors", "Onboarding", "Contracts"],
    Finance: ["Invoicing", "Credit", "Settlement"],
  };
  return map[dept] ?? ["Trade Support"];
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-black tracking-tighter">{value}</div>
      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function ChannelCard({
  icon,
  title,
  value,
  sub,
  badge,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  badge?: string;
  href?: string;
}) {
  const inner = (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        {badge && (
          <span className="text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100">
            {badge}
          </span>
        )}
      </div>
      <div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
          {title}
        </div>
        <div className="font-black text-amazon-dark text-lg tracking-tight">{value}</div>
        <div className="text-[11px] text-gray-400 font-medium mt-1">{sub}</div>
      </div>
      {href && (
        <div className="mt-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
          Open Form <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>;
}

function WhyItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-black text-base mb-2">{title}</div>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
