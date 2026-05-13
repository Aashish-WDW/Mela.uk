"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CustomerShell } from "@/components/mela/CustomerShell";
import {
  findProduct,
  findVendor,
  findCategory,
  products,
  packSizesMap,
  productImagesMap,
} from "@/lib/seed";
import { useCart, useAuth } from "@/lib/auth";
import {
  Star,
  ChevronRight,
  ChevronLeft,
  Info,
  MapPin,
  Leaf,
  Phone,
  MessageSquare,
  FileText,
  Lock,
  Shield,
  Truck,
  Clock,
  Award,
  X,
  ArrowRight,
  CheckCircle,
  Building2,
  Package,
  Send,
  User,
  Layers,
  Minus,
  Plus,
  Heart,
  ThumbsUp,
  Flag,
  Store,
} from "lucide-react";

export default function Page() {
  return (
    <CustomerShell>
      <ProductPage />
    </CustomerShell>
  );
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const p = findProduct(id);
  if (!p) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
        <p className="text-gray-500 mb-6">
          This SKU may have been removed or is no longer available.
        </p>
        <Link
          href="/catalogue"
          className="bg-amazon-orange text-amazon-dark px-6 py-2.5 rounded-full text-sm font-bold hover:bg-amazon-orange-hover transition-colors"
        >
          Back to catalogue
        </Link>
      </div>
    );
  }
  return <ProductDetail productId={id} />;
}

type GatedAction = "quote" | "contact" | "call";

function ProductDetail({ productId }: { productId: string }) {
  const p = findProduct(productId)!;
  const v = findVendor(p.vendor)!;
  const cat = findCategory(p.category);
  const packs = packSizesMap[p.id] ?? [{ label: p.unit, qty: 1 }];
  const images = productImagesMap[p.id] ?? [p.image];

  const [selectedPackIdx, setSelectedPackIdx] = useState(0);
  const [qty, setQty] = useState(p.moq);
  const [wishlisted, setWishlisted] = useState(false);
  const [toast, setToast] = useState("");
  const [showReview, setShowReview] = useState(false);

  const { add } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6);

  const [gateAction, setGateAction] = useState<GatedAction | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const gate = (action: GatedAction) => {
    if (user) {
      if (action === "contact") setShowContact(true);
      else if (action === "quote") setShowQuote(true);
      else if (action === "call") setPhoneRevealed(true);
    } else {
      setGateAction(action);
    }
  };

  const onAuthSuccess = () => {
    const action = gateAction;
    setGateAction(null);
    if (action === "contact") setShowContact(true);
    else if (action === "quote") setShowQuote(true);
    else if (action === "call") setPhoneRevealed(true);
  };

  const selectPack = (i: number) => {
    setSelectedPackIdx(i);
    setQty(packs[i].qty);
  };

  const stepQty = (delta: number) => {
    const step = packs[selectedPackIdx].qty;
    setQty((prev) => Math.max(packs[0].qty, prev + delta * step));
  };

  const handleAdd = () => {
    add(p.id, qty);
    showToast(`${qty} × ${p.unit} added to cart`);
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    showToast(wishlisted ? "Removed from trade wishlist" : "Added to trade wishlist");
  };

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4 md:py-8">
      {/* Breadcrumb */}
      <nav className="hidden md:flex text-[11px] text-gray-500 mb-6 items-center gap-1.5 overflow-hidden whitespace-nowrap">
        <Link href="/catalogue" className="hover:underline hover:text-orange-700">
          Catalogue
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/catalogue?cat=${p.category}`}
          className="hover:underline hover:text-orange-700"
        >
          {cat?.name}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 truncate">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* ── Left: Image Gallery + Vendor Card ── */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4 order-1">
          <ImageGallery
            images={images}
            productName={p.name}
            tags={p.tags}
            showSignIn={!user}
            onSignIn={() => setGateAction("contact")}
          />

          {/* Vendor card */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg border border-gray-100 bg-white flex items-center justify-center overflow-hidden shadow-sm shrink-0 p-1">
                <img src={v.logo} alt={v.name} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{v.name}</div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                  <MapPin className="w-3 h-3" /> {v.city}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 shrink-0">
                <Award className="w-3 h-3 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amazon-orange text-amazon-orange" />
                <span className="font-bold text-gray-700">{v.rating}</span>
              </div>
              <span className="text-gray-300">·</span>
              <span>Est. {v.since}</span>
              <span className="text-gray-300">·</span>
              <Link
                href={`/catalogue?vendor=${v.id}`}
                className="text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                <Store className="w-3 h-3" /> View store
              </Link>
            </div>
            <p className="text-[11px] text-gray-500 italic mt-3 leading-relaxed border-t border-gray-50 pt-3">
              "{v.blurb}"
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Shield, label: "Trade Verified" },
              { icon: Truck, label: "Next Day Hub" },
              { icon: Award, label: "MELA Assured" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100 text-center"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle: Product Info ── */}
        <div className="lg:col-span-5 order-3 lg:order-2">
          <Link
            href={`/catalogue?vendor=${v.id}`}
            className="text-blue-600 hover:underline text-xs font-medium flex items-center gap-1 w-fit"
          >
            <Store className="w-3 h-3" /> Visit the {v.name} Store
          </Link>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mt-1 leading-tight">
            {p.name}
          </h1>

          <div className="flex items-center mt-2 gap-3 flex-wrap">
            <button
              onClick={scrollToReviews}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="flex text-amazon-orange text-sm">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <Star className="w-4 h-4 fill-current text-gray-300" />
              </div>
              <span className="text-blue-600 text-xs ml-2 hover:underline hover:text-orange-700">
                1,452 ratings
              </span>
            </button>
            <span className="text-gray-300 hidden md:inline">|</span>
            <button
              onClick={scrollToReviews}
              className="text-blue-600 text-xs hover:underline hover:text-orange-700"
            >
              50+ answered questions
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <Leaf className="w-3.5 h-3.5 text-green-700 fill-green-700" />
              <span className="text-[11px] font-bold text-green-800 uppercase tracking-tight">
                Climate Pledge Friendly
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-tight">
                MELA Assured
              </span>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-5" />

          {/* Price reveal */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-sm text-gray-500 pt-0.5 shrink-0">Trade Price:</span>
              {user ? (
                <div>
                  <span className="text-2xl font-bold text-orange-800">£24.50</span>
                  <span className="text-sm text-gray-500 ml-1">/ unit</span>
                  <div className="text-xs text-emerald-600 font-bold mt-0.5">
                    You save 12% vs. retail
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setGateAction("quote")}
                  className="group flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 hover:bg-amber-100 transition-colors"
                >
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="text-left">
                    <div className="text-sm font-bold text-amber-800 blur-sm select-none">
                      £24.50 / unit
                    </div>
                    <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wide">
                      Sign in to unlock trade price
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </button>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">Unit:</span>
              <span className="text-sm font-bold text-gray-900">{p.unit}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">Origin:</span>
              <span className="text-sm font-bold text-gray-900">{p.origin}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">Lead time:</span>
              <span className="text-sm font-bold text-gray-900">{p.leadTime}</span>
            </div>
          </div>

          {/* Pack Configuration */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <Layers className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-black text-gray-700 uppercase tracking-widest">
                Master Pack / Ordering Tiers
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {packs.map((ps, i) => (
                <button
                  key={ps.label}
                  onClick={() => selectPack(i)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors group ${
                    selectedPackIdx === i
                      ? "bg-blue-50 border-l-[3px] border-blue-500"
                      : "hover:bg-gray-50 border-l-[3px] border-transparent"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedPackIdx === i ? "border-blue-500" : "border-gray-300 group-hover:border-gray-400"}`}
                  >
                    {selectedPackIdx === i && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900">{ps.label}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {ps.qty === 1 ? "1 × " : `${ps.qty} × `}
                      {p.unit}
                    </div>
                  </div>
                  {ps.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide shrink-0 ${
                        ps.badge === "Best Value"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {ps.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border-t border-amber-100">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <span className="font-bold">Selected: {packs[selectedPackIdx].label}</span>
                {" — "}
                {packs[selectedPackIdx].qty} × {p.unit}. Synced with buy box.
              </p>
            </div>
          </div>

          {/* Trade insights */}
          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl mb-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-900 mb-1">Mela Trade Insights</p>
                <p className="text-xs text-blue-800 leading-relaxed">
                  This product is currently trending in{" "}
                  <span className="font-bold">London Hospitality</span>. Estimated pallet savings of
                  12% for orders over 50 units. 8 buyers viewed this in the last 24h.
                </p>
              </div>
            </div>
          </div>

          {/* Product description */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-900">Product Description</h3>
            <ul className="space-y-2">
              {[
                `Sourced directly from ${v.name} in ${v.city}.`,
                "Guaranteed fresh stock with high turnover via Mela London warehouse.",
                "Professional trade grade quality — tested and vetted by Mela.",
                `SKU: ${p.sku} · MOQ: ${p.moq} units`,
                `Lead time: ${p.leadTime} for wholesale orders.`,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA banner */}
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">
                Direct Trade Line
              </div>
              <h3 className="text-lg font-black tracking-tight italic mb-2">
                Speak to this vendor directly
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5 font-medium">
                Negotiate volume pricing, check lead times, and get a custom trade quote from{" "}
                {v.name}.
              </p>
              <div className="flex flex-col min-[400px]:flex-row flex-wrap gap-3">
                <button
                  onClick={() => gate("contact")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Now
                </button>
                <button
                  onClick={() => gate("call")}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10 hover:border-white/20"
                >
                  <Phone className="w-4 h-4" />
                  {phoneRevealed ? "+44 20 7946 0123" : "Call Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Buy Box ── */}
        <div className="lg:col-span-3 space-y-3 lg:sticky lg:top-4 order-2 lg:order-3">
          <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-md">
            {user ? (
              <div className="mb-4">
                <div className="text-2xl font-bold text-orange-800">
                  £24.50 <span className="text-sm font-normal text-gray-400">/ unit</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                  <MapPin className="w-3 h-3" /> Deliver to London NW10
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="text-sm font-bold text-gray-900 mb-1">Pricing on Request</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin className="w-3 h-3" /> Deliver to London NW10
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 font-bold text-sm">In Stock</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
              <Clock className="w-3 h-3" /> Order before 2pm for same-day dispatch
            </div>

            {/* Pack size + qty */}
            <div className="mb-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
                  Pack Size
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {packs.map((ps, i) => (
                    <button
                      key={ps.label}
                      onClick={() => selectPack(i)}
                      className={`py-2 px-1 rounded-lg text-center border transition-all leading-none ${
                        selectedPackIdx === i
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-[10px] font-black truncate">{ps.label}</div>
                      <div className="text-[9px] mt-0.5 font-medium text-gray-400">×{ps.qty}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => stepQty(-1)}
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm font-bold text-center text-gray-900 select-none">
                    {qty}
                  </div>
                  <button
                    onClick={() => stepQty(1)}
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
                  <span>
                    {qty} × {p.unit}
                  </span>
                  {qty < p.moq && <span className="text-red-500 font-bold">MOQ: {p.moq}</span>}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <button
                onClick={handleAdd}
                className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm"
              >
                Add to Cart
              </button>

              <button
                onClick={() => gate("quote")}
                className="w-full bg-[#ffa41c] hover:bg-[#ff8f00] text-amazon-dark py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm flex items-center justify-center gap-2"
              >
                {!user && <Lock className="w-3.5 h-3.5" />}
                <FileText className="w-3.5 h-3.5" />
                Request Official Quote
              </button>

              <button
                onClick={() => gate("contact")}
                className="w-full border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
              >
                {!user && <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />}
                <MessageSquare className="w-3.5 h-3.5" />
                Contact Now
              </button>

              <button
                onClick={() => gate("call")}
                className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                {!user && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                {phoneRevealed ? (
                  <span className="font-bold text-blue-600">+44 20 7946 0123</span>
                ) : (
                  "Call Vendor"
                )}
              </button>
            </div>

            {/* Meta */}
            <div className="text-[11px] space-y-2.5 pt-4 mt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Ships from</span>
                <span className="text-gray-700 font-medium">Mela.uk Warehouse</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sold by</span>
                <Link
                  href={`/catalogue?vendor=${v.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {v.name}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Returns</span>
                <span className="text-blue-600 font-medium">Trade Eligible</span>
              </div>
            </div>
          </div>

          {/* Add to wishlist */}
          <button
            onClick={handleWishlist}
            className={`w-full border py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              wishlisted
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                : "border-gray-200 hover:bg-gray-50 text-gray-500 bg-white"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
            {wishlisted ? "Saved to Trade Wishlist" : "Add to Trade Wishlist"}
          </button>

          {/* MELA guarantee */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-black text-blue-900 uppercase tracking-widest">
                Mela Trade Guarantee
              </span>
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
              All MELA-listed vendors are verified. Disputes resolved within 48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-14 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Frequently bought together</h2>
            <Link href="/catalogue" className="text-blue-600 text-xs font-bold hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/product/${r.id}`} className="group">
                <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-100 group-hover:border-blue-200 transition-colors">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs font-medium text-blue-600 group-hover:text-orange-700 line-clamp-2 leading-snug">
                  {r.name}
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amazon-orange text-amazon-orange" />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">45</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section
        id="reviews"
        className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 border-t border-gray-200 pt-10 lg:pt-12"
      >
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex text-amazon-orange">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <Star className="w-5 h-5 fill-current text-gray-300" />
            </div>
            <span className="font-bold">4.2 out of 5</span>
          </div>
          <div className="text-sm text-gray-500 mb-6">1,452 global ratings</div>
          <div className="space-y-2">
            {[
              [5, 65],
              [4, 15],
              [3, 10],
              [2, 5],
              [1, 5],
            ].map(([star, pct]) => (
              <RatingRow key={star} star={star} percent={pct} onFilter={() => {}} />
            ))}
          </div>
          <div className="h-px bg-gray-200 my-8" />
          <h3 className="font-bold text-base mb-1">Review this product</h3>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Share your verified trade experience
          </p>
          <button
            onClick={() => (user ? setShowReview(true) : setGateAction("contact"))}
            className="w-full border border-gray-300 hover:bg-gray-50 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors bg-white flex items-center justify-center gap-2"
          >
            {!user && <Lock className="w-3.5 h-3.5 text-gray-400" />}
            Write a review
          </button>
        </div>
        <div className="lg:col-span-9 space-y-10">
          <h3 className="text-xl font-bold border-b border-gray-100 pb-4">
            Top reviews from the United Kingdom
          </h3>
          <Review
            username="Chef Marco"
            title="Consistent quality for my kitchen"
            date="22 March 2026"
            rating={5}
            content="I've been sourcing this through Mela for 6 months now. Quality is always consistent which is critical for my recipes. Delivery is reliable."
          />
          <Review
            username="Sarah - Bakery Owner"
            title="Great for bulk orders"
            date="15 April 2026"
            rating={4}
            content="MOQ is reasonable for trade. The packaging was a bit bulky this time but the product itself was perfect. Will order again."
          />
        </div>
      </section>

      {/* Modals */}
      {gateAction && (
        <SignInGate
          action={gateAction}
          productName={p.name}
          onSuccess={onAuthSuccess}
          onClose={() => setGateAction(null)}
        />
      )}
      {showContact && (
        <ContactModal
          vendorName={v.name}
          productName={p.name}
          onClose={() => setShowContact(false)}
        />
      )}
      {showQuote && (
        <QuoteModal
          productName={p.name}
          sku={p.sku}
          moq={p.moq}
          onClose={() => setShowQuote(false)}
        />
      )}
      {showReview && <ReviewModal productName={p.name} onClose={() => setShowReview(false)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 border-b-4 border-blue-500 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({
  images,
  productName,
  tags,
  showSignIn,
  onSignIn,
}: {
  images: string[];
  productName: string;
  tags: string[];
  showSignIn: boolean;
  onSignIn: () => void;
}) {
  const [active, setActive] = useState(0);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="space-y-2.5">
      <div className="aspect-square rounded-xl relative overflow-hidden border border-gray-200 bg-white shadow-md group cursor-zoom-in">
        <img
          src={images[active]}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-black/70 backdrop-blur text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg uppercase tracking-widest"
            >
              {t}
            </span>
          ))}
        </div>
        {/* Arrow nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {active + 1} / {images.length}
            </div>
          </>
        )}
        {/* Sign-in hover overlay */}
        {showSignIn && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onSignIn}
              className="w-full bg-white text-gray-900 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amazon-orange transition-colors"
            >
              Sign In for Trade Access
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                active === i ? "border-blue-500 shadow-sm" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sign-in Gate Modal ──────────────────────────────────────────────────────

const actionLabels: Record<GatedAction, { title: string; sub: string; icon: any }> = {
  quote: {
    title: "Sign in to Request a Quote",
    sub: "Trade pricing is available to verified business accounts.",
    icon: FileText,
  },
  contact: {
    title: "Sign in to Contact Vendor",
    sub: "Direct vendor communication requires a verified trade account.",
    icon: MessageSquare,
  },
  call: {
    title: "Sign in to Reveal Contact",
    sub: "Vendor phone numbers are exclusively available to trade members.",
    icon: Phone,
  },
};

function SignInGate({
  action,
  productName,
  onSuccess,
  onClose,
}: {
  action: GatedAction;
  productName: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const meta = actionLabels[action];
  const Icon = meta.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      login(email);
      setSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 sm:px-8 pt-6 sm:pt-8 pb-10 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-black tracking-tight italic mb-2">{meta.title}</h2>
          <p className="text-slate-400 text-xs font-medium leading-relaxed">{meta.sub}</p>
        </div>
        <div className="px-6 sm:px-8 -mt-4 relative z-10">
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
            <Package className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Accessing trade data for
              </div>
              <div className="text-sm font-bold text-gray-900 line-clamp-1">{productName}</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-4">
          <div>
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
              Business Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.co.uk"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-inner bg-gray-50"
                autoFocus
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Access Trade Platform <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <p className="text-center text-xs text-gray-500">
            New to MELA?{" "}
            <Link
              href="/login"
              onClick={onClose}
              className="text-blue-600 font-bold hover:underline"
            >
              Create a trade account
            </Link>
          </p>
        </form>
        <div className="px-6 sm:px-8 pb-6 flex items-center gap-2 justify-center">
          <Shield className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[10px] text-gray-400 font-medium">
            Secure · MELA verified accounts only
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Contact Vendor Modal ────────────────────────────────────────────────────

function ContactModal({
  vendorName,
  productName,
  onClose,
}: {
  vendorName: string;
  productName: string;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [qty, setQty] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 pt-5 sm:pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 tracking-tight">Contact {vendorName}</h2>
              <p className="text-[11px] text-gray-400 font-medium">Direct trade enquiry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {sent ? (
          <div className="px-6 sm:px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-black text-lg text-gray-900 mb-2">Message Sent</h3>
            <p className="text-sm text-gray-500 mb-6">
              {vendorName} will respond to{" "}
              <span className="font-bold text-gray-700">{user?.email}</span> within 2 hours.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="px-6 sm:px-8 py-6 space-y-4"
          >
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 flex items-center gap-2.5 border border-gray-100">
              <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                Enquiry regarding: <span className="font-bold text-gray-800">{productName}</span>
              </span>
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Quantity of Interest
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="e.g. 100 units"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-gray-50 transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${vendorName}, I'm interested in bulk pricing for...`}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-gray-50 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Quote Request Modal ─────────────────────────────────────────────────────

function QuoteModal({
  productName,
  sku,
  moq,
  onClose,
}: {
  productName: string;
  sku: string;
  moq: number;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [qtyReq, setQtyReq] = useState(String(moq));
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 pt-5 sm:pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 tracking-tight">Request Official Quote</h2>
              <p className="text-[11px] text-gray-400 font-medium">
                Respond within 2 business hours
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {sent ? (
          <div className="px-6 sm:px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="font-black text-lg text-gray-900 mb-2">Quote Requested</h3>
            <p className="text-sm text-gray-500 mb-1">
              Your official quote for <span className="font-bold text-gray-800">{productName}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              will be sent to <span className="font-bold text-gray-700">{user?.email}</span> within
              2 hours.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="px-6 sm:px-8 py-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs">
              <div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                  Product
                </div>
                <div className="font-bold text-gray-800 line-clamp-1">{productName}</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                  SKU
                </div>
                <div className="font-bold text-gray-800">{sku}</div>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Required Quantity
              </label>
              <input
                required
                type="number"
                min={moq}
                value={qtyReq}
                onChange={(e) => setQtyReq(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 bg-gray-50 transition-all"
              />
              <p className="text-[10px] text-gray-400 mt-1">Minimum order: {moq} units</p>
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Delivery requirements, special packaging, urgency..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 bg-gray-50 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#ffa41c] hover:bg-[#ff8f00] text-amazon-dark py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4" /> Submit Quote
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Review Modal ────────────────────────────────────────────────────────────

function ReviewModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 pt-5 sm:pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 tracking-tight">Write a Review</h2>
              <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{productName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {submitted ? (
          <div className="px-6 sm:px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-black text-lg text-gray-900 mb-2">Review Submitted</h3>
            <p className="text-sm text-gray-500 mb-6">
              Thank you for your verified trade review. It'll appear after moderation.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="px-6 sm:px-8 py-6 space-y-4"
          >
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-3">
                Overall Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${n <= rating ? "fill-amazon-orange text-amazon-orange" : "fill-current text-gray-200"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Review Title
              </label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarise your experience"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-gray-50 transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What did you like or dislike about this product?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-gray-50 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" /> Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function RatingRow({
  star,
  percent,
  onFilter,
}: {
  star: number;
  percent: number;
  onFilter: () => void;
}) {
  return (
    <button
      onClick={onFilter}
      className="w-full flex items-center gap-3 text-xs text-blue-600 hover:opacity-80 transition-opacity group"
    >
      <span className="w-10 whitespace-nowrap text-left">{star} star</span>
      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
        <div
          className="h-full bg-amazon-orange rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-gray-400 text-right">{percent}%</span>
    </button>
  );
}

function Review({
  username,
  title,
  date,
  rating,
  content,
}: {
  username: string;
  title: string;
  date: string;
  rating: number;
  content: string;
}) {
  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-8 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm font-medium text-gray-700">{username}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="flex text-amazon-orange text-sm">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="fill-current w-4 h-4" />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <Star key={i} className="fill-current text-gray-300 w-4 h-4" />
          ))}
        </div>
        <span className="font-bold text-sm text-gray-900">{title}</span>
      </div>
      <div className="text-xs text-gray-500 mb-2">Reviewed in the United Kingdom on {date}</div>
      <div className="text-xs text-orange-700 font-bold mb-3 uppercase tracking-tighter">
        Verified Purchase
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{content}</p>
      <div className="flex items-center gap-4 text-xs font-medium">
        <button
          onClick={() => setHelpful((h) => !h)}
          className={`flex items-center gap-1.5 border px-5 py-1.5 rounded-xl shadow-sm transition-all ${helpful ? "border-blue-400 bg-blue-50 text-blue-600" : "border-gray-300 hover:bg-gray-50 bg-white text-gray-600"}`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${helpful ? "fill-blue-500" : ""}`} />
          Helpful {helpful ? "(1)" : ""}
        </button>
        <span className="text-gray-200">|</span>
        {reported ? (
          <span className="text-gray-400 text-xs">Reported</span>
        ) : (
          <button
            onClick={() => setReported(true)}
            className="text-gray-400 hover:text-red-500 hover:underline transition-colors flex items-center gap-1"
          >
            <Flag className="w-3 h-3" /> Report abuse
          </button>
        )}
      </div>
    </div>
  );
}
