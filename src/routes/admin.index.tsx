import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, Pill } from "@/components/mela/PortalShell";
import { stats, enquiries, vendors, trend } from "@/lib/seed";
import { TrendingUp, Users, ShoppingBag, Truck, Clock, Warehouse, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <div className="space-y-10">
      <PageHeader 
        eyebrow="Operations Control" 
        title="Platform Intelligence" 
        sub="Centralized monitoring of London procurement cycles, inventory velocity, and trade relationships." 
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total Buyers" value={stats.buyers.toLocaleString()} hint="+12% MoM" />
        <StatCard label="Active Vendors" value={stats.vendors} hint="5 Pending" />
        <StatCard label="Monthly Enquiries" value={stats.enquiriesMonth.toLocaleString()} hint="High Volume" />
        <StatCard label="Fulfilment Rate" value={`${stats.fulfilment}%`} hint="Target: 99%" />
        <StatCard label="Response SLA" value={`${stats.responseHrs}h`} hint="Real-time" />
        <StatCard label="Hub Capacity" value={`${stats.warehouseUse}%`} hint="Park Royal" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amazon-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">Marketplace Velocity</span>
             </div>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 14 Trading Days</span>
          </div>
          <div className="p-8">
            <div className="flex items-end gap-1.5 h-56">
              {trend.map((v, i) => (
                <div 
                  key={i} 
                  className="flex-1 rounded-t-sm transition-all hover:opacity-80 cursor-help group relative" 
                  style={{ height: `${v * 0.8}%`, background: i === trend.length - 1 ? '#e77600' : '#232f3e' }} 
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amazon-dark text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {v}
                   </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2">
               <span>D-14</span>
               <span>Trading Activity Index</span>
               <span>Today</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
             <Users className="w-4 h-4 text-amazon-orange" />
             <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">Vendor Leaderboard</span>
          </div>
          <div className="p-2">
            <div className="divide-y divide-gray-100">
              {vendors.slice(0, 5).map((v) => (
                <div key={v.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-gray-100 bg-white flex items-center justify-center p-1 overflow-hidden">
                       <img src={v.logo} alt={v.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-amazon-dark group-hover:text-blue-600 truncate max-w-[120px]">{v.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{v.city}</div>
                    </div>
                  </div>
                  <Pill tone="good">★ {v.rating}</Pill>
                </div>
              ))}
            </div>
            <button className="w-full py-3 text-[10px] font-bold text-blue-600 hover:bg-gray-50 transition-colors uppercase tracking-widest border-t border-gray-100">
               Manage Network Network
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amazon-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amazon-dark">Operational Pipeline</span>
           </div>
           <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">ID Ref</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Trading Entity</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Operations lead</th>
                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-bold text-[11px] text-amazon-dark">{e.ref}</td>
                  <td className="px-6 py-4">
                     <div className="text-sm font-bold text-amazon-dark">{e.buyerCompany}</div>
                     <div className="text-[10px] text-gray-400 font-medium">B2B Trade Route</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium text-xs flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                        {e.assignee === "—" ? "?" : e.assignee[0]}
                     </div>
                     {e.assignee}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Pill tone={e.status === "Won" ? "good" : e.status === "New" ? "info" : "warn"}>{e.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-3">
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              Operational data refreshed at {new Date().toLocaleTimeString()}
           </div>
        </div>
      </div>
    </div>
  );
}
