import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { useAuth, useCart } from "@/lib/auth";
import { findProduct, findVendor, products } from "@/lib/seed";
import { Star, CheckCircle, Info, Trash2, Bookmark, Heart, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Basket — Mela.uk" }] }),
  component: () => <CustomerShell><CartPage /></CustomerShell>,
});

function CartPage() {
  const { items, update, remove, clear } = useCart();
  const { user } = useAuth();
  const totalUnits = items.reduce((s, i) => s + i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="bg-amazon-bg min-h-[calc(100vh-160px)] py-6 md:py-10 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 md:p-10 shadow-sm rounded-sm">
                <h1 className="text-2xl md:text-3xl font-medium mb-4 text-gray-900">Your Mela Basket is empty.</h1>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
                    Your shopping basket lives to serve. Give it purpose — fill it with wholesale goods, 
                    verified fresh produce, and premium trade essentials from London's top suppliers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/catalogue" className="bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark px-8 py-2.5 rounded-md text-sm font-bold shadow-sm transition-colors text-center">
                        Continue shopping
                    </Link>
                    {!user && (
                        <Link to="/login" className="border border-gray-300 hover:bg-gray-50 px-8 py-2.5 rounded-md text-sm font-bold shadow-sm transition-colors text-center bg-white">
                            Sign in to your account
                        </Link>
                    )}
                </div>
            </div>
            <div className="w-full lg:w-80 space-y-4">
                <div className="bg-white p-5 shadow-sm rounded-sm border-t-2 border-amazon-orange">
                    <h3 className="font-bold text-sm mb-4 uppercase tracking-tighter text-gray-800">Trade Intelligence</h3>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                        "Markets move fast. We recommend reviewing your inventory levels every 48 hours for optimal fulfilment."
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amazon-bg min-h-screen py-4 md:py-8">
      <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Basket Items */}
        <div className="lg:col-span-3 bg-white p-4 md:p-8 shadow-sm rounded-sm">
          <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900">Shopping Basket</h1>
            <span className="text-sm text-gray-500 hidden md:block font-medium">Trade Unit Price</span>
          </div>

          <div className="space-y-8">
            {items.map((it) => {
              const p = findProduct(it.id);
              if (!p) return null;
              const v = findVendor(p.vendor);
              return (
                <div key={it.id} className="flex flex-col md:flex-row gap-4 md:gap-6 border-b border-gray-100 pb-8 last:border-0">
                  {/* Image */}
                  <Link to="/product/$id" params={{ id: p.id }} className="w-full md:w-48 aspect-square shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex items-center justify-center group relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-orange-800 uppercase tracking-tighter">Prime</div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                            <Link to="/product/$id" params={{ id: p.id }} className="text-[17px] md:text-xl font-medium text-gray-900 hover:text-blue-600 hover:underline line-clamp-2 leading-tight">
                                {p.name}
                            </Link>
                            <div className="text-xs text-green-700 font-bold mt-1.5 flex items-center gap-1.5">
                                <CheckCircle className="w-3 h-3" /> In Stock & Ready to Ship
                            </div>
                            <div className="text-xs text-gray-600 mt-2">Sold by: <Link to="/vendor" className="text-blue-600 hover:underline font-bold">{v?.name}</Link></div>
                            
                            <div className="flex items-center mt-2 gap-2">
                                <div className="flex text-amazon-orange text-[10px]">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="fill-current" />)}
                                </div>
                                <span className="text-[11px] text-blue-600 hover:underline">1,200 verified reviews</span>
                            </div>
                        </div>
                        <div className="w-full md:w-auto md:text-right flex justify-between md:block items-baseline">
                            <span className="text-sm md:hidden text-gray-500">Price:</span>
                            <div>
                                <span className="font-bold text-lg md:text-xl text-gray-900">Trade Enquiry</span>
                                <div className="text-[10px] text-gray-500 mt-1 italic font-medium">Login for Volume Pricing</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-5 mt-6 flex-wrap">
                      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-sm h-9">
                        <button onClick={() => update(it.id, Math.max(p.moq, it.qty - 1))} className="px-3.5 h-full hover:bg-gray-200 text-xl font-medium transition-colors border-r border-gray-300">−</button>
                        <span className="min-w-[40px] px-2 text-center text-sm font-bold h-full flex items-center justify-center bg-white">{it.qty}</span>
                        <button onClick={() => update(it.id, it.qty + 1)} className="px-3.5 h-full hover:bg-gray-200 text-xl font-medium transition-colors border-l border-gray-300">+</button>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <button onClick={() => remove(it.id)} className="flex items-center gap-1.5 text-blue-600 hover:underline border-l md:border-l-0 pl-3 md:pl-0 border-gray-300">
                           <Trash2 className="w-3.5 h-3.5 md:hidden" /> Delete
                        </button>
                        <span className="text-gray-200 hidden md:block">|</span>
                        <button className="text-blue-600 hover:underline flex items-center gap-1.5">
                           <Bookmark className="w-3.5 h-3.5 md:hidden" /> Save for later
                        </button>
                        <span className="text-gray-200 hidden md:block">|</span>
                        <button className="text-blue-600 hover:underline flex items-center gap-1.5">
                           <Heart className="w-3.5 h-3.5 md:hidden" /> Compare with similar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
              <button onClick={clear} className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1.5">
                 <Trash2 className="w-3.5 h-3.5" /> Clear All Items
              </button>
              <div className="text-lg md:text-xl font-medium">
                 Subtotal ({totalUnits} {totalUnits === 1 ? 'item' : 'items'}): <span className="font-bold ml-1 text-gray-900">TBD</span>
              </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="space-y-5">
          <div className="bg-white p-6 shadow-sm rounded-sm border border-gray-100">
            <div className="flex items-start gap-3 mb-5 p-3 bg-green-50/50 rounded-md border border-green-100">
                <ShieldCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                    <div className="text-[11px] text-green-800 font-bold uppercase tracking-tight">Trade Shipping Guarantee</div>
                    <div className="text-[10px] text-gray-600 mt-0.5 leading-tight">Your order qualifies for <span className="font-bold">Next-Day Hub Fulfilment</span>.</div>
                </div>
            </div>

            <div className="text-xl mb-6 flex items-baseline gap-2">
                <span className="text-gray-600 text-sm">Subtotal:</span>
                <span className="font-bold text-gray-900 text-xl tracking-tight">Quote Pending</span>
            </div>
            
            <div className="flex items-center gap-3 mb-8">
                <input type="checkbox" id="sample" className="w-4 h-4 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange shadow-sm cursor-pointer" />
                <label htmlFor="sample" className="text-[11px] text-gray-700 font-medium cursor-pointer">This enquiry includes a commercial sample request</label>
            </div>

            {user ? (
                <Link to="/catalogue" className="block w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark text-center py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform active:scale-95 mb-4">
                    Submit Trade Enquiry
                </Link>
            ) : (
                <Link to="/login" className="block w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark text-center py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform active:scale-95 mb-4">
                    Sign in to Continue
                </Link>
            )}

            <div className="mt-6 bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                <div className="flex gap-2 items-center text-[11px] font-bold mb-2 text-gray-900 uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 text-blue-600" /> Professional Trade Terms
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                    Enquiry pricing is dynamic and reflects current warehouse stock. A Mela account manager will contact you within 2 business hours to finalize terms.
                </p>
            </div>
          </div>

          {/* Recommendations - Hidden on Mobile */}
          <div className="bg-white p-6 shadow-sm rounded-sm border border-gray-100 hidden lg:block">
             <h3 className="font-bold text-xs mb-5 uppercase tracking-wider text-gray-900 border-b border-gray-50 pb-2">Business Favorites</h3>
             <div className="space-y-5">
                {products.slice(10, 13).map(p => (
                    <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex gap-4 group">
                        <div className="w-16 h-16 bg-gray-50 shrink-0 flex items-center justify-center overflow-hidden rounded border border-gray-100 group-hover:shadow-sm transition-all">
                             <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-[11px] font-bold text-blue-600 group-hover:text-orange-700 group-hover:underline line-clamp-2 leading-tight">{p.name}</div>
                            <div className="flex text-amazon-orange mt-1 gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1.5 font-bold uppercase tracking-tighter">MOQ: {p.moq} {p.unit.split(' ')[0]}</div>
                        </div>
                    </Link>
                ))}
             </div>
             <Link to="/catalogue" className="text-[11px] font-bold text-blue-600 hover:underline mt-6 block text-center py-2 border-t border-gray-50">Explore Full Catalogue</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
