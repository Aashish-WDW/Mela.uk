"use client";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { orders } from "@/lib/seed";

export default function Page() {
  const list = orders.filter(
    (o) => o.buyerCompany === "Hawksmoor Group" || o.buyerCompany === "Park Hospitality",
  );
  const tone = (s: string) => (s === "Delivered" ? "good" : s === "Dispatched" ? "info" : "warn");

  return (
    <div>
      <PageHeader eyebrow="Orders" title="Confirmed & in motion." />
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((o) => (
          <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs">{o.ref}</div>
              <Pill tone={tone(o.status)}>{o.status}</Pill>
            </div>
            <div className="font-display text-2xl mt-2">{o.buyerCompany}</div>
            <div className="text-sm text-muted-foreground">
              {o.items} line items · ETA {o.eta}
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-foreground"
                style={{
                  width:
                    o.status === "Confirmed"
                      ? "20%"
                      : o.status === "Picking"
                        ? "50%"
                        : o.status === "Dispatched"
                          ? "80%"
                          : "100%",
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-3">{o.warehouse}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
