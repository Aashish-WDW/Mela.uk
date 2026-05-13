import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/mela/PortalShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "MELA Admin Portal" }] }),
  component: () => (
    <PortalShell
      portal="Admin"
      role="admin"
      accent="bg-[color:var(--clay)]"
      nav={[
        { to: "/admin", label: "Overview" },
        { to: "/admin/products", label: "Products" },
        { to: "/admin/pricing", label: "Price History" },
        { to: "/admin/users", label: "Users" },
        { to: "/admin/enquiries", label: "Enquiries" },
        { to: "/admin/buyers", label: "Buyers" },
        { to: "/admin/vendors", label: "Vendors" },
        { to: "/admin/warehouse", label: "Warehouse" },
        { to: "/admin/staff", label: "Staff" },
      ]}
      right={<div className="text-xs text-muted-foreground">Admin · all systems nominal</div>}
    />
  ),
});
