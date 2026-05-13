import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { enquiries, findProduct, findVendor } from "@/lib/seed";

export const Route = createFileRoute("/buyer/enquiries")({
  component: BuyerEnquiries,
});

function BuyerEnquiries() {
  const list = enquiries.filter((e) => e.buyerCompany === "Hawksmoor Group");
  return (
    <div>
      <PageHeader eyebrow="Your enquiries" title="Live commercial conversations." />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <tr className="text-left">
              <th className="px-5 py-3">Ref</th>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Qty</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((e) => {
              const p = findProduct(e.product);
              const v = findVendor(e.vendor);
              return (
                <tr key={e.id} className="hover:bg-muted/50">
                  <td className="px-5 py-4 font-mono text-xs">{e.ref}</td>
                  <td className="px-5 py-4 font-medium">{p?.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{v?.name}</td>
                  <td className="px-5 py-4">{e.qty}</td>
                  <td className="px-5 py-4 text-muted-foreground">{e.date}</td>
                  <td className="px-5 py-4"><Pill tone={e.status === "Won" ? "good" : e.status === "New" ? "info" : "warn"}>{e.status}</Pill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
