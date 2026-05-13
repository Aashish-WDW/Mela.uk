"use client";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { enquiries, findProduct, staff } from "@/lib/seed";
import {
  MessageSquare,
  Search,
  Filter,
  User,
  MoreHorizontal,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function Page() {
  const [editing, setEditing] = useState<(typeof enquiries)[number] | null>(null);
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("Quoted");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  const open = (e: (typeof enquiries)[number]) => {
    setEditing(e);
    setAssignee(e.assignee);
    setStatus(e.status);
    setNote("");
  };

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Trade Operations"
        title="Institutional Enquiries"
        sub="Monitor inbound procurement requests, manage account executive assignments, and track deal conversion velocity."
      />

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search enquiries by reference or company..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-amazon-orange outline-none transition-all shadow-inner"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-gray-300 px-4 py-2.5 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
              <Filter className="w-3.5 h-3.5" /> Pipeline Status
            </button>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 hidden md:block">
              {enquiries.length} Active Deals
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1000px]">
            <thead>
              <tr className="text-left bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Trade Ref
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Buyer Entity
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Product SKU
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                  Volume
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Inbound Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Assignment
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Pipeline
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map((e) => {
                const p = findProduct(e.product);
                return (
                  <tr key={e.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-[11px] font-black text-amazon-dark bg-gray-100 px-2 py-0.5 rounded tracking-tighter">
                        {e.ref}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-amazon-dark group-hover:text-blue-600 transition-colors">
                        {e.buyerCompany}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                        Verified Trade Buyer
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-medium text-gray-600 line-clamp-1 max-w-[200px]">
                        {p?.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
                        {p?.sku}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-amazon-dark">{e.qty}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {e.date}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0 shadow-sm bg-gray-50 flex items-center justify-center">
                          {(() => {
                            const s = staff.find((st) =>
                              e.assignee.startsWith(st.name.split(" ")[0]),
                            );
                            return s ? (
                              <img
                                src={s.image}
                                alt={s.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-4 h-4 text-gray-300" />
                            );
                          })()}
                        </div>
                        <span className="text-xs font-bold text-amazon-dark">{e.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Pill
                        tone={e.status === "Won" ? "good" : e.status === "New" ? "info" : "warn"}
                      >
                        {e.status}
                      </Pill>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => open(e)}
                        className="p-2 rounded-md hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Operational Assignment"
        description={`Manage Procurement Desk for ${editing?.ref ?? ""}`}
        size="lg"
      >
        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amazon-dark rounded flex items-center justify-center text-white font-bold text-xl">
            {editing?.buyerCompany.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-black text-amazon-dark">{editing?.buyerCompany}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Inbound Request: {editing?.date}
            </div>
          </div>
        </div>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            flash(`${editing?.ref} assigned to ${assignee}`);
            setEditing(null);
          }}
          className="space-y-6"
        >
          <Field label="Trade Executive Assignment">
            <select
              className="amazon-input"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="—">Unassigned Desk</option>
              <option>Priya S.</option>
              <option>Tom R.</option>
              <option>Noah B.</option>
              <option>Ines M.</option>
            </select>
          </Field>
          <Field label="Deal Pipeline Status">
            <select
              className="amazon-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>New</option>
              <option>Quoted</option>
              <option>Negotiating</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </Field>
          <Field label="Internal Operational Notes">
            <textarea
              rows={4}
              className="amazon-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Log negotiation updates or specific fulfillment requirements..."
            />
          </Field>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abort
            </button>
            <button type="submit" className="amazon-button-primary px-8 flex items-center gap-2">
              Commit Updates
              <ArrowRight className="w-4 h-4" />
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
