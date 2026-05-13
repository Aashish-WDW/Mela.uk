import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field, inputCls } from "@/components/mela/Modal";
import { vendors, type Vendor } from "@/lib/seed";
import { Mail, Globe, MapPin, Star, Plus, Search, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/vendors")({
  component: AdminVendors,
});

function AdminVendors() {
  const [contact, setContact] = useState<Vendor | null>(null);
  const [invite, setInvite] = useState(false);
  const [toast, setToast] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [vName, setVName] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vCity, setVCity] = useState("London");

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Supply Chain Network"
        title="Verified Vendors"
        sub="Manage trade relationships, quality ratings, and logistics partnerships across the MELA ecosystem."
        action={
          <button onClick={() => setInvite(true)} className="bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark px-6 py-2.5 rounded-md text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Provision New Vendor
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input placeholder="Search vendor network..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-amazon-orange outline-none transition-all" />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-gray-300 px-4 py-2 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
               <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 hidden md:block">
               {vendors.length} Total Partners
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vendors.map((v) => (
          <div key={v.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded border border-gray-100 p-1 bg-white flex items-center justify-center overflow-hidden shrink-0">
                      <img src={v.logo} alt={v.name} className="w-full h-full object-contain" />
                   </div>
                   <div className="min-w-0">
                      <h3 className="font-bold text-lg text-amazon-dark truncate group-hover:text-blue-600 transition-colors">{v.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                         <MapPin className="w-3 h-3" /> {v.city} · Est. {v.since}
                      </div>
                   </div>
                </div>
                <Pill tone="good">
                   <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {v.rating}
                   </div>
                </Pill>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 italic mb-6">"{v.blurb}"</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mt-auto">
                 <div className="text-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SKU Count</div>
                    <div className="text-sm font-black text-amazon-dark">{(v.id.length * 12) + 5}</div>
                 </div>
                 <div className="text-center border-l border-gray-50">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</div>
                    <div className="text-[10px] font-black text-green-700 uppercase tracking-tighter">Active Trade</div>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between gap-3">
               <button onClick={() => flash(`Viewing ${v.name} Inventory`)} className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                  Inventory
               </button>
               <button onClick={() => { setContact(v); setSubject(""); setBody(""); }} className="text-[10px] font-black text-amazon-dark hover:text-amazon-orange uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  Direct Contact
               </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!contact} onClose={() => setContact(null)} title={`Vendor Enquiry: ${contact?.name ?? ""}`} description="Communications are monitored for quality assurance." size="lg">
        <form
          onSubmit={(e) => { e.preventDefault(); flash(`Message dispatched to ${contact?.name}`); setContact(null); }}
          className="space-y-6"
        >
          <Field label="Transmission Subject"><input required className="amazon-input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Inventory Audit NW10" /></Field>
          <Field label="Communication Body"><textarea required rows={5} className="amazon-input" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter detailed message for vendor operations lead..." /></Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setContact(null)} className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="amazon-button-primary px-8">Dispatch Message</button>
          </div>
        </form>
      </Modal>

      <Modal open={invite} onClose={() => setInvite(false)} title="Vendor Onboarding Request" description="Initiate the verification process for a new supply partner." size="lg">
        <form
          onSubmit={(e) => { e.preventDefault(); flash(`Invitation dispatched to ${vEmail}`); setInvite(false); setVName(""); setVEmail(""); }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Field label="Legal Entity Name"><input required className="amazon-input" value={vName} onChange={(e) => setVName(e.target.value)} placeholder="Full business name" /></Field>
          <Field label="Verification Email"><input required type="email" className="amazon-input" value={vEmail} onChange={(e) => setVEmail(e.target.value)} placeholder="operations@company.com" /></Field>
          <Field label="Operational Hub City"><input required className="amazon-input" value={vCity} onChange={(e) => setVCity(e.target.value)} placeholder="e.g. London" /></Field>
          <Field label="Primary Industry Sector">
            <select className="amazon-input" defaultValue="food-beverage">
              <option value="food-beverage">Food & Beverage</option>
              <option value="packaging">Packaging</option>
              <option value="kitchen">Kitchen</option>
              <option value="trade">Trade</option>
              <option value="beauty">Beauty</option>
            </select>
          </Field>
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button type="button" onClick={() => setInvite(false)} className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Abort</button>
            <button type="submit" className="amazon-button-primary px-8">Send Provisioning Invite</button>
          </div>
        </form>
      </Modal>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-amazon-dark text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-md shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300 border-b-4 border-amazon-orange">
          {toast}
        </div>
      )}
    </div>
  );
}
