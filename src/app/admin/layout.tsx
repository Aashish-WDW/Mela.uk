"use client";
import { type ReactNode } from "react";
import { PortalShell } from "@/components/mela/PortalShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
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
    >
      {children}
    </PortalShell>
  );
}
