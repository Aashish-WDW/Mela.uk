"use client";
import { PageHeader, StatCard } from "@/components/mela/PortalShell";
import { products, orders, buyers } from "@/lib/seed";
import { Map, Truck, Activity, ArrowUpRight, BarChart3 } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Logistics Hub: MELA-01"
        title="Warehouse Operations"
        sub="Park Royal Central Distribution. Unified vendor-linked inventory, real-time GRN tracking, and outbound dispatch monitoring."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Net Capacity" value="71%" hint="13,064 / 18,400 sqft" />
        <StatCard label="Inbound Flow" value="4 GRN" hint="Awaiting Scan" />
        <StatCard label="Outbound Load" value="11" hint="Scheduled Dispatches" />
        <StatCard label="Sync Integrity" value="99.6%" hint="RFID Validated" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-amazon-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">
                Thermal Bin Occupancy
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Zone A (Food & Bev)
            </span>
          </div>
          <div className="p-8 grid grid-cols-8 md:grid-cols-12 lg:grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, i) => {
              const fill = Math.random();
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm border border-gray-100 transition-all hover:scale-110 hover:shadow-md cursor-crosshair group relative"
                  style={{
                    background: fill > 0.8 ? "#e77600" : fill > 0.4 ? "#37475a" : "#f3f3f3",
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amazon-dark text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Bin A-{i + 100}: {Math.round(fill * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-auto px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-[#e77600]" /> High
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-[#37475a]" /> Med
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-[#f3f3f3]" /> Empty
              </div>
            </div>
            <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
              Full 3D Map
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amazon-orange" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">
              Active Outbound Manifest
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {orders.map((o) => {
                const b = buyers.find((buy) => buy.name === o.buyerCompany);
                return (
                  <div
                    key={o.id}
                    className="p-5 hover:bg-gray-50 transition-colors group cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded border border-gray-100 p-0.5 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <img
                          src={b?.image}
                          alt={o.buyerCompany}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-amazon-dark group-hover:text-blue-600 transition-colors">
                          {o.buyerCompany}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          {o.ref} · {o.items} Units
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-amazon-dark uppercase tracking-widest">
                        ETA {o.eta}
                      </div>
                      <div className="text-[10px] text-green-600 font-bold uppercase tracking-tight mt-0.5">
                        Dispatched
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="w-full py-4 text-[10px] font-black text-blue-600 hover:bg-gray-50 transition-colors uppercase tracking-widest border-t border-gray-100 flex items-center justify-center gap-2">
            Print Batch Labels
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amazon-orange" />
          <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">
            Real-time Stock Velocity
          </span>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          {products.slice(0, 8).map((p) => {
            const pct = Math.min(100, Math.round((p.stock / 1200) * 100));
            return (
              <div key={p.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm shrink-0 p-1">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-amazon-dark group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </span>
                  </div>
                  <div className="text-[10px] font-black text-amazon-dark uppercase tracking-widest">
                    {p.stock} <span className="text-gray-400 font-bold ml-1">Allocated</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden shadow-inner border border-gray-200">
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ width: `${pct}%`, background: p.hue }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            Stock levels refreshed 42s ago
          </div>
        </div>
      </div>
    </div>
  );
}
