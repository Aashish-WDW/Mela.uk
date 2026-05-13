"use client";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { buyers } from "@/lib/seed";
import { User, Briefcase, Calendar, ShoppingBag, Plus, Search, Filter, Mail } from "lucide-react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState("Restaurant Group");

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Relationship Management"
        title="Procurement Partners"
        sub="Monitor verified business accounts, track trade segments, and manage institutional buying power."
        action={
          <button
            onClick={() => setOpen(true)}
            className="bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark px-6 py-2.5 rounded-md text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Onboard New Entity
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Filter procurement partners..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-amazon-orange outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-gray-300 px-4 py-2 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" /> Segment
          </button>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 hidden md:block">
            {buyers.length} Entities Tracked
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buyers.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded border border-gray-100 p-0.5 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-amazon-dark truncate group-hover:text-blue-600 transition-colors">
                      {b.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      <Briefcase className="w-3 h-3" /> {b.segment}
                    </div>
                  </div>
                </div>
                <Pill tone={b.status === "Verified" ? "good" : "warn"}>{b.status}</Pill>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{b.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium truncate">
                    {b.contact.toLowerCase().replace(" ", ".")}@business.uk
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-50 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> Partner Since
                  </div>
                  <div className="text-sm font-black text-amazon-dark">{b.since}</div>
                </div>
                <div className="flex flex-col gap-1 border-l border-gray-50 pl-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <ShoppingBag className="w-3 h-3" /> Trade Volume
                  </div>
                  <div className="text-sm font-black text-amazon-dark">{b.orders} Orders</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-gray-50 border-t border-gray-100 py-3 text-[10px] font-black text-blue-600 hover:bg-gray-100 uppercase tracking-widest transition-colors">
              Full Account Audit
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Buyer Entity Onboarding"
        description="Provision a verified institutional trade account."
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            flash(`${name} successfully dispatched to onboarding queue`);
            setOpen(false);
            setName("");
            setContact("");
            setEmail("");
          }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Field label="Legal Entity Name">
            <input
              required
              className="amazon-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full business name"
            />
          </Field>
          <Field label="Primary Operations Contact">
            <input
              required
              className="amazon-input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Full name of lead buyer"
            />
          </Field>
          <Field label="Corporate Email Address">
            <input
              required
              type="email"
              className="amazon-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="procurement@company.uk"
            />
          </Field>
          <Field label="Industry Segment">
            <select
              className="amazon-input"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
            >
              <option>Restaurant Group</option>
              <option>Hotel & Hospitality</option>
              <option>Café & Bakery</option>
              <option>Wholesale Retail</option>
              <option>Institutional Office</option>
            </select>
          </Field>
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abort
            </button>
            <button type="submit" className="amazon-button-primary px-8">
              Confirm Entity Provisioning
            </button>
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
