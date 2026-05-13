import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/mela/PortalShell";
import { products, categories } from "@/lib/seed";
import { ProductCard } from "./buyer.index";

export const Route = createFileRoute("/buyer/catalogue")({
  component: Catalogue,
});

function Catalogue() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const filtered = products.filter((p) => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader eyebrow="The catalogue" title="Browse the warehouse." sub="Pricing is private. Tap any product to start a call to order." />
      <div className="flex flex-wrap gap-2 mb-6">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</Chip>
        ))}
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by product, SKU, origin…"
        className="w-full rounded-full border border-border bg-card px-5 py-3 mb-8 outline-none focus:ring-2 focus:ring-[color:var(--saffron)]"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => <ProductCard key={p.id} id={p.id} />)}
      </div>
      {filtered.length === 0 && <div className="text-center text-muted-foreground py-20">Nothing matches that filter.</div>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
        active ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
