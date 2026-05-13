"use client";
import Link from "next/link";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { useAuth } from "@/lib/auth";

export default function Page() {
  return (
    <CustomerShell>
      <Notifications />
    </CustomerShell>
  );
}

const items = [
  {
    id: "n1",
    title: "Quote ready · MEL-24871",
    body: "Borough Provisions Co. responded with pricing for 24 cases of Cold-Pressed Sicilian Olive Oil.",
    time: "12 min ago",
    unread: true,
    tag: "Quote",
  },
  {
    id: "n2",
    title: "Dispatched · ORD-58232",
    body: "Your order for Bianchi Caffè has left MELA-01 Park Royal.",
    time: "2 hours ago",
    unread: true,
    tag: "Dispatch",
  },
  {
    id: "n3",
    title: "Callback scheduled",
    body: "Tom Reilly will call you tomorrow at 10:30am about your espresso order.",
    time: "Yesterday",
    unread: false,
    tag: "Callback",
  },
  {
    id: "n4",
    title: "Restocked · House Espresso Blend",
    body: "Your saved item is back in stock — 1,200 units available.",
    time: "Yesterday",
    unread: false,
    tag: "Stock",
  },
  {
    id: "n5",
    title: "Delivered · ORD-58231",
    body: "Hawksmoor Group order delivered. Goods Received Note attached.",
    time: "3 days ago",
    unread: false,
    tag: "Delivery",
  },
  {
    id: "n6",
    title: "New vendor onboarded",
    body: "Mayfair Fine Wines is now live in your catalogue.",
    time: "1 week ago",
    unread: false,
    tag: "Platform",
  },
];

function Notifications() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="max-w-md mx-auto py-32 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
          Sign in required
        </div>
        <h1 className="font-display text-4xl">Sign in for notifications.</h1>
        <Link
          href="/login"
          className="inline-block mt-6 px-5 py-3 rounded-full bg-foreground text-background text-sm"
        >
          Sign in →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Inbox</div>
          <h1 className="font-display text-5xl">Notifications</h1>
        </div>
        <button className="text-sm underline underline-offset-4 text-muted-foreground">
          Mark all read
        </button>
      </div>

      <ul className="rounded-3xl border border-border bg-card divide-y divide-border overflow-hidden">
        {items.map((n) => (
          <li
            key={n.id}
            className={`p-5 flex items-start gap-4 hover:bg-muted/40 transition-colors ${n.unread ? "" : "opacity-70"}`}
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${n.unread ? "bg-[color:var(--saffron)]" : "bg-border"}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-lg leading-tight">{n.title}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] bg-muted px-2 py-0.5 rounded-full">
                  {n.tag}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{n.body}</p>
              <div className="text-xs text-muted-foreground mt-2">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
