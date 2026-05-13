import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { findProduct, findVendor, findCategory, products } from "@/lib/seed";
import { useCart } from "@/lib/auth";
import { Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Info, MapPin, User, Leaf } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Mela.uk` },
      { name: "description", content: loaderData?.product.name ?? "" },
    ],
  }),
  component: () => <CustomerShell><ProductPage /></CustomerShell>,
  notFoundComponent: () => (
    <CustomerShell>
      <div className="max-w-xl mx-auto py-32 text-center">
        <h1 className="text-4xl font-bold">Product not found</h1>
        <Link to="/catalogue" className="text-blue-600 hover:underline mt-4 inline-block">Back to catalogue</Link>
      </div>
    </CustomerShell>
  ),
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const v = findVendor(p.vendor)!;
  const cat = findCategory(p.category);
  const [qty, setQty] = useState(p.moq);
  const { add } = useCart();
  const nav = useNavigate();
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6);

  const handleAdd = () => {
    add(p.id, qty);
    nav({ to: "/cart" });
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4 md:py-8 font-sans">
      {/* Breadcrumbs - Hidden on very small screens */}
      <nav className="hidden md:flex text-[11px] text-gray-500 mb-6 items-center gap-1.5 overflow-hidden whitespace-nowrap">
        <Link to="/catalogue" className="hover:underline hover:text-orange-700">Catalogue</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/catalogue" className="hover:underline hover:text-orange-700">{cat?.name}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 truncate">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left: Image (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-4">
          <div 
            className="aspect-square rounded-md relative overflow-hidden border border-gray-200 bg-white shadow-sm flex items-center justify-center"
          >
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                {p.tags.map(t => (
                    <span key={t} className="bg-white/90 backdrop-blur text-[10px] font-bold border border-gray-200 px-2 py-1 rounded-sm shadow-sm uppercase">{t}</span>
                ))}
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500 hidden md:block">
             Roll over image to zoom in
          </div>
        </div>

        {/* Middle: Details (5 cols) */}
        <div className="lg:col-span-5">
          <Link to="/vendor" className="text-blue-600 hover:underline text-xs md:text-sm font-medium">Visit the {v.name} Store</Link>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mt-1 leading-tight">{p.name}</h1>
          
          <div className="flex items-center mt-2 gap-3 flex-wrap">
             <div className="flex items-center">
                <div className="flex text-amazon-orange text-sm">
                   {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                   <Star className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-blue-600 text-xs md:text-sm ml-2 hover:underline hover:text-orange-700 cursor-pointer">1,452 ratings</span>
             </div>
             <span className="text-gray-300 hidden md:inline">|</span>
             <span className="text-blue-600 text-xs md:text-sm hover:underline hover:text-orange-700 cursor-pointer">50+ answered questions</span>
          </div>

          <div className="flex items-center gap-2 mt-3 bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
              <Leaf className="w-3.5 h-3.5 text-green-700 fill-green-700" />
              <span className="text-[11px] font-bold text-green-800 uppercase tracking-tight">Climate Pledge Friendly</span>
          </div>

          <div className="h-px bg-gray-200 my-4" />

          <div className="space-y-4">
             <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Price for Business:</span>
                <span className="text-xl font-bold text-orange-800">Login for Trade Price</span>
             </div>

             <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Unit:</span>
                <span className="text-sm md:text-base font-bold">{p.unit}</span>
             </div>
             
             <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-md">
                <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-blue-900 mb-1">Mela Trade Insights</p>
                        <p className="text-xs text-blue-800 leading-relaxed">
                            This product is currently trending in <span className="font-bold">London Hospitality</span>. 
                            Estimated pallet savings of 12% for orders over 50 units.
                        </p>
                    </div>
                </div>
             </div>

             <div className="mt-6">
                <h3 className="font-bold text-sm mb-3">Product Description</h3>
                <ul className="list-disc pl-5 text-xs md:text-sm space-y-2 text-gray-800">
                    <li>Sourced directly from <span className="font-bold text-blue-600">{v.name}</span> in {v.city}.</li>
                    <li>Guaranteed fresh stock with high turnover via Mela London warehouse.</li>
                    <li>Professional trade grade quality - tested and vetted by Mela.</li>
                    <li>Origin: {p.origin}</li>
                    <li>Lead time: {p.leadTime} for wholesale orders.</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Right: Buy Box (3 cols) */}
        <div className="lg:col-span-3 border border-gray-300 rounded-lg p-5 bg-white shadow-sm lg:sticky lg:top-4">
           <div className="text-xl md:text-2xl font-medium mb-1">Pricing on Request</div>
           <div className="text-xs text-blue-600 mb-4 hover:underline cursor-pointer flex items-center gap-1 font-medium">
             <MapPin className="w-3 h-3" /> Deliver to London NW10
           </div>

           <div className="text-green-700 font-bold text-lg mb-4">In Stock.</div>

           <div className="space-y-4">
              <div>
                 <label className="text-xs font-bold block mb-1.5">Quantity:</label>
                 <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-amazon-orange shadow-sm cursor-pointer"
                 >
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={p.moq + i}>{p.moq + i} {i === 0 ? '(MOQ)' : ''}</option>
                    ))}
                 </select>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={handleAdd}
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  Add to Cart
                </button>

                <button className="w-full bg-[#ffa41c] hover:bg-[#ff8f00] text-amazon-dark py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm">
                  Request Official Quote
                </button>
              </div>

              <div className="text-[11px] space-y-2.5 pt-3 border-t border-gray-100">
                 <div className="flex items-center justify-between">
                    <span className="text-gray-500">Ships from</span>
                    <span className="text-gray-900 font-medium">Mela.uk Warehouse</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-gray-500">Sold by</span>
                    <span className="text-blue-600 hover:underline font-medium">{v.name}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-gray-500">Returns</span>
                    <span className="text-blue-600 hover:underline font-medium">Trade Eligible</span>
                 </div>
              </div>

              <div className="h-px bg-gray-100" />

              <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-md text-xs transition-colors text-left px-4 font-medium flex items-center justify-between">
                <span>Add to Trade Wishlist</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
           </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-12 md:mt-16 bg-white border border-gray-200 rounded-sm p-4 md:p-6 shadow-sm overflow-hidden">
          <h2 className="text-lg md:text-xl font-bold mb-6">Frequently bought together</h2>
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x">
            {related.map((r) => (
              <Link key={r.id} to="/product/$id" params={{ id: r.id }} className="min-w-[140px] md:min-w-0 group snap-start">
                <div className="aspect-square relative rounded-sm overflow-hidden bg-gray-50 mb-3 flex items-center justify-center border border-gray-100">
                   <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="text-xs md:text-sm font-medium text-blue-600 group-hover:text-orange-700 group-hover:underline line-clamp-2 leading-snug h-8 md:h-10">{r.name}</div>
                <div className="flex items-center mt-1">
                    <div className="flex text-amazon-orange text-[10px]">
                        {[...Array(5)].map((_, i) => <Star key={i} className="fill-current" />)}
                    </div>
                    <span className="text-[10px] text-blue-600 ml-1">45</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-gray-200 pt-12">
          <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
              <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amazon-orange">
                    {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    <Star className="w-5 h-5 text-gray-300" />
                  </div>
                  <span className="font-bold">4.2 out of 5</span>
              </div>
              <div className="text-sm text-gray-500 mb-6">1,452 global ratings</div>
              
              <div className="space-y-2">
                  <RatingRow star={5} percent={65} />
                  <RatingRow star={4} percent={15} />
                  <RatingRow star={3} percent={10} />
                  <RatingRow star={2} percent={5} />
                  <RatingRow star={1} percent={5} />
              </div>

              <div className="h-px bg-gray-200 my-8" />
              
              <h3 className="font-bold text-base mb-1">Review this product</h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">Share your verified trade experience with other business owners</p>
              <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-md text-sm font-medium shadow-sm transition-colors bg-white">
                  Write a customer review
              </button>
          </div>

          <div className="lg:col-span-9 space-y-10">
              <h3 className="text-xl font-bold border-b border-gray-100 pb-4">Top reviews from the United Kingdom</h3>
              <Review 
                user="Chef Marco" 
                title="Consistent quality for my kitchen" 
                date="22 March 2026" 
                rating={5} 
                content="I've been sourcing this through Mela for 6 months now. The quality is always consistent which is critical for my recipes. Delivery is reliable." 
              />
              <Review 
                user="Sarah - Bakery Owner" 
                title="Great for bulk orders" 
                date="15 April 2026" 
                rating={4} 
                content="MoQ is reasonable for trade. The packaging was a bit bulky this time but the product itself was perfect. Will order again." 
              />
          </div>
      </section>
    </div>
  );
}

function RatingRow({ star, percent }: { star: number; percent: number }) {
    return (
        <div className="flex items-center gap-3 text-xs md:text-sm text-blue-600 hover:underline cursor-pointer group">
            <span className="w-10 whitespace-nowrap">{star} star</span>
            <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                <div className="h-full bg-amazon-orange" style={{ width: `${percent}%` }} />
            </div>
            <span className="w-10 text-gray-500 text-right group-hover:no-underline">{percent}%</span>
        </div>
    );
}

function Review({ user, title, date, rating, content }: { user: string; title: string; date: string; rating: number; content: string }) {
    return (
        <div className="border-b border-gray-100 pb-8 last:border-0">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <User className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amazon-orange text-sm">
                    {[...Array(rating)].map((_, i) => <Star key={i} className="fill-current" />)}
                    {[...Array(5 - rating)].map((_, i) => <Star key={i} className="text-gray-300" />)}
                </div>
                <span className="font-bold text-sm text-gray-900">{title}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2 tracking-tight">Reviewed in the United Kingdom on {date}</div>
            <div className="text-xs text-orange-700 font-bold mb-3 uppercase tracking-tighter">Verified Purchase</div>
            <p className="text-sm text-gray-800 leading-relaxed mb-4">{content}</p>
            <div className="flex items-center gap-4 text-xs font-medium">
                <button className="border border-gray-300 px-8 py-1.5 rounded-md hover:bg-gray-50 shadow-sm transition-colors bg-white">Helpful</button>
                <span className="text-gray-300">|</span>
                <button className="text-gray-500 hover:underline">Report abuse</button>
            </div>
        </div>
    );
}
