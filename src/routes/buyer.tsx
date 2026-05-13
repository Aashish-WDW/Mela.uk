import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/mela/PortalShell";

export const Route = createFileRoute("/buyer")({
  head: () => ({ meta: [{ title: "MELA Buyer Portal" }] }),
  component: () => (
    <PortalShell
      portal="Buyer"
      role="customer"
      accent="bg-[color:var(--saffron)]"
      nav={[
        { to: "/buyer", label: "Dashboard" },
        { to: "/buyer/catalogue", label: "Catalogue" },
        { to: "/buyer/enquiries", label: "Enquiries" },
        { to: "/buyer/orders", label: "Orders" },
        { to: "/buyer/account", label: "Account" },
      ]}
      right={<div className="text-xs text-muted-foreground">Verified buyer · Tier 2</div>}
    />
  ),
});
