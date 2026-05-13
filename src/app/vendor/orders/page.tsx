"use client";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field, inputCls } from "@/components/mela/Modal";
import { orders } from "@/lib/seed";

export default function Page() {
  const [editing, setEditing] = useState<(typeof orders)[number] | null>(null);
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState("Dispatched");
  const [tracking, setTracking] = useState("");
  const [eta, setEta] = useState("");

  const open = (o: (typeof orders)[number]) => {
    setEditing(o);
    setStatus(o.status);
    setTracking("");
    setEta(o.eta);
  };

  return (
    <div>
      <PageHeader eyebrow="Fulfilment" title="Active orders" />
      <div className="space-y-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="font-mono text-xs">{o.ref}</div>
              <div className="font-medium mt-1">{o.buyerCompany}</div>
              <div className="text-xs text-muted-foreground">
                {o.items} items · ETA {o.eta}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Pill
                tone={
                  o.status === "Delivered" ? "good" : o.status === "Dispatched" ? "info" : "warn"
                }
              >
                {o.status}
              </Pill>
              <button onClick={() => open(o)} className="text-sm underline underline-offset-4">
                Update →
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={`Update ${editing?.ref ?? ""}`}
        description={editing?.buyerCompany}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setToast(`${editing?.ref} updated to ${status}`);
            setEditing(null);
            setTimeout(() => setToast(""), 2200);
          }}
          className="space-y-4"
        >
          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
              <option>Picking</option>
              <option>Packed</option>
              <option>Dispatched</option>
              <option>Delivered</option>
            </select>
          </Field>
          <Field label="ETA">
            <input
              className={inputCls}
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              placeholder="Tomorrow, 10:00"
            />
          </Field>
          <Field label="Tracking reference (optional)">
            <input
              className={inputCls}
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="DPD-1234567"
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2.5 rounded-full border border-border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm"
            >
              Save update
            </button>
          </div>
        </form>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-sm px-4 py-2 rounded-full shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
