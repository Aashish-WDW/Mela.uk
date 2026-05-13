"use client";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { staff as seedStaff, type Staff } from "@/lib/seed";
import { UserPlus, Search, Filter, Mail, Building, MoreVertical, Shield } from "lucide-react";

export default function Page() {
  const [staff, setStaff] = useState<Staff[]>(seedStaff);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Trade Desk");
  const [dept, setDept] = useState("Sales");
  const [note, setNote] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setRole("Trade Desk");
    setDept("Sales");
    setNote("");
  };
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const newStaff: Staff = {
      id: `s${Date.now()}`,
      name,
      email,
      role,
      dept,
      status: "Invited",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    };
    setStaff((p) => [newStaff, ...p]);
    setOpen(false);
    reset();
    flash(`Invitation dispatched to ${email}`);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Human Capital"
        title="Institutional Team"
        sub="Manage access control, departmental assignments, and internal operational permissions for the MELA global trade network."
        action={
          <button
            onClick={() => setOpen(true)}
            className="bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark px-6 py-2.5 rounded-md text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Provision Teammate
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Filter by name, role or department..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-amazon-orange outline-none transition-all shadow-inner"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-gray-300 px-4 py-2 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" /> Dept
          </button>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 hidden md:block">
            {staff.length} Active Profiles
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg border-2 border-white shrink-0">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-amazon-dark truncate group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      <Shield className="w-3 h-3 text-amazon-orange" /> {s.role}
                    </div>
                  </div>
                </div>
                <button className="p-1.5 rounded hover:bg-gray-50 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="font-medium uppercase tracking-tight">{s.dept} Operations</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${s.status === "Active" ? "bg-green-500" : s.status === "Away" ? "bg-orange-500" : "bg-blue-500"} animate-pulse`}
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {s.status}
                  </span>
                </div>
                <Pill
                  tone={
                    s.status === "Active" ? "good" : s.status === "Invited" ? "info" : "default"
                  }
                >
                  {s.status}
                </Pill>
              </div>
            </div>

            <button className="w-full bg-gray-50 border-t border-gray-100 py-3 text-[10px] font-black text-blue-600 hover:bg-gray-100 uppercase tracking-widest transition-colors">
              Access Audit & Logs
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Teammate Provisioning"
        description="New staff will receive an encrypted MELA network invitation."
        size="lg"
      >
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
          <Field label="Full Legal Name">
            <input
              required
              className="amazon-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
            />
          </Field>
          <Field label="Work Identity (Email)">
            <input
              required
              type="email"
              className="amazon-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mela.london"
            />
          </Field>
          <Field label="Operational Role">
            <select className="amazon-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Trade Desk</option>
              <option>Operations Manager</option>
              <option>Warehouse Lead</option>
              <option>Vendor Success</option>
              <option>Accounts</option>
              <option>Network Admin</option>
            </select>
          </Field>
          <Field label="Departmental Assignment">
            <select className="amazon-input" value={dept} onChange={(e) => setDept(e.target.value)}>
              <option>Sales & Growth</option>
              <option>Core Operations</option>
              <option>Warehouse Logistics</option>
              <option>Partnerships</option>
              <option>Institutional Finance</option>
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Security Onboarding Note">
              <textarea
                rows={3}
                className="amazon-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Briefly describe initial access requirements or welcome message..."
              />
            </Field>
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abort
            </button>
            <button type="submit" className="amazon-button-primary px-8">
              Dispatch Invitation
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
