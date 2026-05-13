import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { Phone, Mail, MapPin, MessageSquare, Info, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — MELA Trade" }, { name: "description", content: "Reach the MELA trade desk for wholesale enquiries." }] }),
  component: () => <CustomerShell><Contact /></CustomerShell>,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <div className="max-w-[1100px] mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        
        {/* Left Column: Info */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-amazon-dark tracking-tight leading-tight mb-4">
               Trade Desk <br className="hidden md:block" /> Support
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our procurement experts are standing by. We aim to respond to all trade enquiries within 2 London business hours.
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

          {/* Trust Badge */}
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg flex gap-4">
             <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
             <div>
                <div className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-1">Secure Procurement</div>
                <p className="text-blue-800 text-xs leading-relaxed font-medium">
                  All trade data is encrypted. We handle corporate credentials with the highest level of security and compliance.
                </p>
             </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
             <MessageSquare className="w-5 h-5 text-amazon-orange" />
             <span className="font-bold text-amazon-dark text-sm uppercase tracking-widest">Trade Enquiry Form</span>
          </div>
          
          <div className="p-6 md:p-8">
            {sent ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                   <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amazon-dark mb-2">Message Received</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A member of our trade desk has been assigned to your enquiry. You will receive a response at your registered business email shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setSent(false)} 
                  className="text-blue-600 hover:underline text-sm font-bold uppercase tracking-wider"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                   <Field label="Full Name">
                     <input required className="amazon-input" placeholder="Sarah Chen" />
                   </Field>
                   <Field label="Business Email">
                     <input required type="email" className="amazon-input" placeholder="sarah@hawksmoor.com" />
                   </Field>
                </div>
                
                <Field label="Registered Company Name">
                   <input required className="amazon-input" placeholder="Hawksmoor Group Ltd" />
                </Field>

                <Field label="Nature of Enquiry">
                  <select className="amazon-input appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]" style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')` }}>
                    <option>Open a New Trade Account</option>
                    <option>Bulk Quote Request</option>
                    <option>Supply Chain Partnership</option>
                    <option>Logistics & Delivery Query</option>
                    <option>General Support</option>
                  </select>
                </Field>

                <Field label="Detailed Requirements">
                  <textarea required rows={5} className="amazon-input resize-none" placeholder="Please specify SKU numbers, quantities, or specific project timelines…" />
                </Field>

                <div className="pt-2">
                   <button type="submit" className="amazon-button-primary w-full">
                     Send Trade Message
                   </button>
                </div>

                <div className="flex gap-2 items-start mt-4 bg-gray-50 p-3 rounded border border-gray-100">
                   <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] text-gray-500 leading-normal">
                      By submitting this form, you agree to our <span className="text-blue-600 hover:underline cursor-pointer">B2B Privacy Policy</span>. We may contact you via your provided business credentials.
                   </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wider">{label}</div>
      {children}
    </label>
  );
}

function ContactBlock({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm shrink-0">
         <Icon className="w-6 h-6 text-amazon-orange" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-xl font-bold text-amazon-dark tracking-tight">{value}</div>
        {sub && <div className="text-[11px] text-gray-500 font-medium mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}
