import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/mela/PortalShell";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "MELA Vendor Portal" }] }),
  component: () => (
    <PortalShell
      portal="Vendor"
      role="vendor"
      accent="bg-[color:var(--moss)]"
      nav={[
        { to: "/vendor", label: "Dashboard" },
        { to: "/vendor/products", label: "Products" },
        { to: "/vendor/orders", label: "Orders" },
        { to: "/vendor/inventory", label: "Inventory" },
        { to: "/vendor/analytics", label: "Analytics" },
      ]}
      right={<div className="text-xs text-muted-foreground">Vendor · synced 2m ago</div>}
    />
  ),
});
