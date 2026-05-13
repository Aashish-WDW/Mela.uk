"use client";
import { useState } from "react";
import Link from "next/link";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { staff } from "@/lib/seed";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Info,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Users,
  LucideIcon,
} from "lucide-react";

export default function Page() {
  return (
    <CustomerShell>
      <Contact />
    </CustomerShell>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [ref] = useState(() => `MEL-${Math.floor(24900 + Math.random() * 99)}`);
  const assignee = staff.find((s) => s.role === "Senior Trade Desk") ?? staff[0];

  if (sent) {
    return <EnquirySent refNum={ref} assignee={assignee} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <div className="max-w-[1100px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-amazon-dark tracking-tight leading-tight mb-4">
              Trade Desk <br className="hidden md:block" /> Support
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our procurement experts are standing by. We aim to respond to all trade enquiries
              within 2 London business hours.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <ContactBlock
              icon={Phone}
              label="Priority Trade Line"
              value="+44 (0) 20 4538 0100"
              sub="Mon–Fri · 8am – 7pm GMT"
            />
            <ContactBlock
              icon={Mail}
              label="Official Enquiries"
              value="trade@mela.london"
              sub="Priority response for verified buyers"
            />
            <ContactBlock
              icon={MapPin}
              label="Distribution Hub"
              value="MELA-01 Park Royal"
              sub="155 Acton Lane, London NW10 7NH"
            />
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg flex gap-4">
            <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
            <div>
              <div className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-1">
                Secure Procurement
              </div>
              <p className="text-blue-800 text-xs leading-relaxed font-medium">
                All trade data is encrypted. We handle corporate credentials with the highest level
                of security and compliance.
              </p>
            </div>
          </div>

          <Link
            href="/support"
            className="flex items-center gap-3 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 hover:shadow-blue-500/10 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-amazon-dark text-sm group-hover:text-blue-600 transition-colors">
                Meet the Support Team
              </div>
              <div className="text-[11px] text-gray-400 font-medium mt-0.5">
                5 trade specialists ready to assist
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amazon-orange" />
            <span className="font-bold text-amazon-dark text-sm uppercase tracking-widest">
              Trade Enquiry Form
            </span>
          </div>

          <div className="p-6 md:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <input required className="amazon-input" placeholder="Sarah Chen" />
                </Field>
                <Field label="Business Email">
                  <input
                    required
                    type="email"
                    className="amazon-input"
                    placeholder="sarah@hawksmoor.com"
                  />
                </Field>
              </div>
              <Field label="Registered Company Name">
                <input required className="amazon-input" placeholder="Hawksmoor Group Ltd" />
              </Field>
              <Field label="Nature of Enquiry">
                <select className="amazon-input appearance-none">
                  <option>Open a New Trade Account</option>
                  <option>Bulk Quote Request</option>
                  <option>Supply Chain Partnership</option>
                  <option>Logistics & Delivery Query</option>
                  <option>General Support</option>
                </select>
              </Field>
              <Field label="Detailed Requirements">
                <textarea
                  required
                  rows={5}
                  className="amazon-input resize-none"
                  placeholder="Please specify SKU numbers, quantities, or specific project timelines…"
                />
              </Field>
              <div className="pt-2">
                <button type="submit" className="amazon-button-primary w-full">
                  Submit Enquiry
                </button>
              </div>
              <div className="flex gap-2 items-start mt-4 bg-gray-50 p-3 rounded border border-gray-100">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-normal">
                  By submitting this form, you agree to our{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    B2B Privacy Policy
                  </span>
                  . We may contact you via your provided business credentials.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquirySent({
  refNum,
  assignee,
}: {
  refNum: string;
  assignee: { name: string; role: string; image: string; email: string };
}) {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top success banner */}
      <div className="bg-emerald-600 text-white py-3 text-center text-[11px] font-black uppercase tracking-[0.2em]">
        Enquiry Submitted — Reference {refNum}
      </div>

      <div className="max-w-[760px] mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-8 shadow-lg">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-amazon-dark tracking-tight mb-4">
          Enquiry Received
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
          Your trade enquiry has been logged and assigned. Our desk will respond to your business
          email within 2 working hours.
        </p>

        {/* Ref & ETA cards */}
        <div className="w-full grid sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-left shadow-sm">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Reference Number
            </div>
            <div className="text-2xl font-black text-amazon-dark tracking-tight">{refNum}</div>
            <div className="text-[11px] text-gray-400 mt-2 font-medium">
              Quote this in all correspondence
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-left shadow-sm">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Expected Response
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amazon-orange" />
              <span className="text-2xl font-black text-amazon-dark tracking-tight">
                Within 2 hrs
              </span>
            </div>
            <div className="text-[11px] text-gray-400 mt-2 font-medium">
              Mon–Fri · London business hours
            </div>
          </div>
        </div>

        {/* Assigned agent */}
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5">
            Assigned to Your Enquiry
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg shrink-0">
              <img
                src={assignee.image}
                alt={assignee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-bold text-lg text-amazon-dark">{assignee.name}</div>
              <div className="text-[11px] font-black text-amazon-orange uppercase tracking-widest mt-0.5">
                {assignee.role}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1">{assignee.email}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/support"
            className="flex-1 bg-amazon-dark hover:bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Users className="w-4 h-4" /> View Support Team
          </Link>
          <Link
            href="/"
            className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-amazon-dark py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
          >
            Back to Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-blue-600 hover:underline text-sm font-bold uppercase tracking-wider"
        >
          Submit Another Enquiry
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wider">
        {label}
      </div>
      {children}
    </label>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm shrink-0">
        <Icon className="w-6 h-6 text-amazon-orange" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </div>
        <div className="text-xl font-bold text-amazon-dark tracking-tight">{value}</div>
        {sub && <div className="text-[11px] text-gray-500 font-medium mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}
