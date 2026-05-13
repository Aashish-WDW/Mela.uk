"use client";
import { PageHeader } from "@/components/mela/PortalShell";
import { User, Shield, MapPin, Bell, Building2, Mail, Phone, Briefcase } from "lucide-react";
import { type ReactNode } from "react";

export default function Page() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        eyebrow="Account Management"
        title="Hawksmoor Group"
        sub="Verified Member · Tier 2 Strategic Account · Member since Q3 2024"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Primary Representative" icon={<User className="w-5 h-5 text-blue-500" />}>
            <div className="grid md:grid-cols-2 gap-6 p-2">
              <Row k="Representative Name" v="Sarah Chen" icon={<User className="w-4 h-4" />} />
              <Row
                k="Corporate Role"
                v="Procurement Manager"
                icon={<Briefcase className="w-4 h-4" />}
              />
              <Row
                k="Direct Email"
                v="sarah@hawksmoor.example"
                icon={<Mail className="w-4 h-4" />}
              />
              <Row k="Phone Link" v="+44 20 7946 0123" icon={<Phone className="w-4 h-4" />} />
            </div>
          </Section>

          <Section
            title="Logistics & Delivery Hubs"
            icon={<MapPin className="w-5 h-5 text-blue-500" />}
          >
            <div className="space-y-4 p-2">
              <AddressRow
                label="Corporate HQ"
                address="155 Commercial St, London E1 6BJ"
                type="Headquarters"
              />
              <AddressRow
                label="Spitalfields Hub"
                address="32 Brushfield St, London E1 6AT"
                type="Distribution"
              />
              <AddressRow
                label="Borough Market"
                address="49 Park St, London SE1 9EE"
                type="Retail Outlet"
              />
            </div>
          </Section>
        </div>

        <div className="space-y-8">
          <Section title="Trade Credentials" icon={<Shield className="w-5 h-5 text-blue-500" />}>
            <div className="space-y-4 p-2">
              <CompactRow k="VAT ID" v="GB 432 8841 22" />
              <CompactRow k="Co. House" v="11293841" />
              <CompactRow k="Credit Terms" v="Net 30 Days" />
              <CompactRow k="Hub Default" v="MELA-01 Park Royal" />
            </div>
          </Section>

          <Section title="Direct Notifications" icon={<Bell className="w-5 h-5 text-blue-500" />}>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Channel</span>
                <span>Frequency</span>
              </div>
              <Row k="Email Alerts" v="Real-time" />
              <Row k="SMS Dispatch" v="Critical only" />
              <Row k="Slack Matrix" v="Connected" />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mela-card p-6 md:p-8 glass overflow-hidden border-t-4 border-blue-600">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/10 shadow-inner">
          {icon}
        </div>
        <h3 className="font-black text-lg tracking-tight uppercase italic">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ k, v, icon }: { k: string; v: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-2 group">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
        {k}
      </span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-300">{icon}</span>}
        <span className="font-bold text-slate-700">{v}</span>
      </div>
    </div>
  );
}

function CompactRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 group">
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
        {k}
      </span>
      <span className="font-black text-sm text-slate-900">{v}</span>
    </div>
  );
}

function AddressRow({ label, address, type }: { label: string; address: string; type: string }) {
  return (
    <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-500/30 hover:bg-blue-50 transition-all group">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {label}
          </div>
          <div className="text-xs font-bold text-slate-500 mt-1">{address}</div>
        </div>
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-200 rounded group-hover:bg-blue-500 group-hover:text-white transition-all">
        {type}
      </div>
    </div>
  );
}
