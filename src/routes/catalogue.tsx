import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { products, categories, findVendor } from "@/lib/seed";
import { Star, ChevronDown, Filter, LayoutGrid, List, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/catalogue")({
  head: () => ({ meta: [{ title: "Mela Catalogue — Results" }, { name: "description", content: "Browse the full MELA wholesale catalogue." }] }),
  component: () => <CustomerShell><Catalogue /></CustomerShell>,
});

function Catalogue() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  
  const filtered = products.filter((p) => 
    (cat === "all" || p.category === cat) && 
    (p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Search Result Stats */}
      <div className="border-b border-gray-200 py-3 px-4 shadow-sm bg-white sticky top-[60px] md:top-[94px] z-20">
         <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-sm">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-gray-600">1-{filtered.length} of over {products.length} results for </span>
                    <span className="text-orange-700 font-bold">"{cat === 'all' ? 'All Departments' : cat}"</span>
                </div>
                <div className="md:hidden flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 bg-gray-50 text-xs font-bold">
                    <Filter className="w-3.5 h-3.5" /> Filters
                </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0">
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-100 p-0.5">
                    <button onClick={() => setView('grid')} className={`p-1 px-2 rounded-sm transition-all ${view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200 opacity-60'}`}><LayoutGrid className="w-4 h-4" /></button>
                    <button onClick={() => setView('list')} className={`p-1 px-2 rounded-sm transition-all ${view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200 opacity-60'}`}><List className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-1 cursor-pointer bg-gray-100 border border-gray-300 px-4 py-1.5 rounded-full text-[11px] font-bold hover:bg-gray-200 uppercase tracking-tighter">
                    Sort by: Featured <ChevronDown className="w-3 h-3" />
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 py-6">
        {/* Left Sidebar Filters */}
        <aside className="md:col-span-3 lg:col-span-2 space-y-8 hidden md:block">
           <section>
              <h3 className="font-bold text-[13px] mb-3 uppercase tracking-wider text-gray-900">Department</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                  <li 
                    onClick={() => setCat('all')} 
                    className={`cursor-pointer hover:text-orange-700 transition-colors ${cat === 'all' ? 'font-bold text-gray-950' : ''}`}
                  >
                    Any Category
                  </li>
                  {categories.map(c => (
                      <li 
                        key={c.slug} 
                        onClick={() => setCat(c.slug)}
                        className={`cursor-pointer hover:text-orange-700 transition-colors pl-3 border-l border-gray-100 ml-1 ${cat === c.slug ? 'font-bold text-gray-950 border-orange-700' : ''}`}
                      >
                        {c.name}
                      </li>
                  ))}
              </ul>
           </section>

           <section>
              <h3 className="font-bold text-[13px] mb-3 uppercase tracking-wider text-gray-900">Customer Reviews</h3>
              <div className="space-y-2">
                  {[4, 3, 2, 1].map(stars => (
                      <div key={stars} className="flex items-center gap-1.5 group cursor-pointer">
                          <div className="flex text-amazon-orange">
                              {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                              {[...Array(5 - stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-200" />)}
                          </div>
                          <span className="text-xs text-gray-600 group-hover:text-orange-700 font-medium">& Up</span>
                      </div>
                  ))}
              </div>
           </section>

           <section>
              <h3 className="font-bold text-[13px] mb-3 uppercase tracking-wider text-gray-900">Trade Availability</h3>
              <div className="space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange shadow-sm" />
                      <span className="text-sm text-gray-700 group-hover:text-orange-700 font-medium">In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange shadow-sm" />
                      <span className="text-sm text-gray-700 group-hover:text-orange-700 font-medium">Prime Trade Delivery</span>
                  </label>
              </div>
           </section>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-9 lg:col-span-10">
           <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10" : "space-y-6"}>
             {filtered.map((p) => {
               const v = findVendor(p.vendor);
               return (
                 <Link 
                    key={p.id} 
                    to="/product/$id" 
                    params={{ id: p.id }} 
                    className={`group ${view === 'grid' ? 'flex flex-col' : 'flex gap-4 md:gap-8 border-b border-gray-100 pb-8 last:border-0'}`}
                 >
                   <div className={`${view === 'grid' ? 'aspect-square mb-4' : 'w-32 h-32 md:w-56 md:h-56 shrink-0'} relative bg-gray-50 rounded-md overflow-hidden flex items-center justify-center border border-gray-100 group-hover:shadow-md transition-all`}>
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        {p.stock < 100 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold py-1 px-2 text-center uppercase tracking-tighter">
                                Limited Trade Stock: Only {p.stock} Available
                            </div>
                        )}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {p.tags.slice(0, 1).map(t => (
                                <span key={t} className="bg-white/90 backdrop-blur-sm text-[8px] font-bold border border-gray-200 px-1.5 py-0.5 rounded-sm shadow-sm uppercase">{t}</span>
                            ))}
                        </div>
                   </div>

                   <div className="flex-1 flex flex-col">
                     <h2 className="text-sm md:text-[15px] font-medium text-gray-900 group-hover:text-blue-600 group-hover:underline line-clamp-2 leading-snug mb-1.5">
                        {p.name}
                     </h2>
                     <div className="text-[11px] text-gray-500 mb-2 font-medium">Sold by: <span className="text-blue-600 hover:underline">{v?.name}</span></div>
                     
                     <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="flex text-amazon-orange text-sm">
                           {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                           <Star className="w-3.5 h-3.5 text-gray-200" />
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px] text-blue-600 hover:underline">{(p.stock % 50) + 20} verified reviews</span>
                     </div>

                     <div className="mt-auto space-y-1.5">
                        <div className="text-base md:text-lg font-bold text-gray-900">Trade Enquiry Only</div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-700 bg-gray-50 w-fit px-2 py-0.5 rounded-sm border border-gray-100">
                            <span className="font-bold text-orange-800 uppercase tracking-tighter">Prime</span>
                            <span className="opacity-40">|</span>
                            <span>{p.unit}</span>
                        </div>
                        <div className="text-[11px] text-gray-900 mt-2 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            Get it by <span className="font-bold">Wednesday, May 15</span>
                        </div>
                        <div className="text-[11px] text-gray-600">FREE Trade delivery for verified businesses</div>
                     </div>
                   </div>
                 </Link>
               );
             })}
           </div>

           {filtered.length === 0 && (
             <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300 mx-4 md:mx-0">
                <div className="text-lg font-bold text-gray-900 mb-1">No results for these filters</div>
                <p className="text-sm text-gray-600 mb-4">Try checking your spelling or use more general terms</p>
                <button onClick={() => {setCat('all'); setQ('')}} className="bg-white border border-gray-300 px-6 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">Clear all filters</button>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}
