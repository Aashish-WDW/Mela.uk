"use client";
import { type ReactNode } from "react";
import { PortalShell } from "@/components/mela/PortalShell";

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
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
    >
      {children}
    </PortalShell>
  );
}
