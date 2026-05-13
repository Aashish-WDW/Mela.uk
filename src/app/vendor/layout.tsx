"use client";
import { type ReactNode } from "react";
import { PortalShell } from "@/components/mela/PortalShell";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
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
    >
      {children}
    </PortalShell>
  );
}
