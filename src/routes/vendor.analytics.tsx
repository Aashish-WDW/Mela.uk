import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/mela/PortalShell";
import { trend } from "@/lib/seed";
import { BarChart, TrendingUp, AlertCircle, Info, Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/vendor/analytics")({
  component: VendorAnalytics,
});

function VendorAnalytics() {
  return (
    <div className="space-y-8">
      <PageHeader 
        eyebrow="Intelligence Center" 
        title="Performance Signals" 
        sub="Deep-dive into your wholesale velocity, stock turnover rates, and operational dispute resolution metrics."
        action={
           <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-2 uppercase tracking-widest">
              <Download className="w-4 h-4" />
              Export Data
           </button>
        }
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Conversion Index" value="62%" hint="Enquiries → Committed" />
        <StatCard label="Inventory Turn" value="4.2×" hint="Quartlery Velocity" />
        <StatCard label="Return Logic" value="0.4%" hint="Below Industry Avg" />
        <StatCard label="Active Disputes" value="2" hint="Action Required" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Outbound Trade Volume</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <Calendar className="w-3.5 h-3.5" /> Rolling 21 Days
              </div>
           </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-end gap-1.5 h-64">
            {trend.concat(trend.slice(0, 7)).map((v, i) => (
              <div 
                key={i} 
                className="flex-1 rounded-t-lg transition-all hover:bg-blue-500 cursor-help group relative" 
                style={{ height: `${v * 0.8}%`, background: i >= 14 ? '#2563eb' : '#f1f5f9' }} 
              >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    Day {i+1}: {v} Units
                 </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-6 pt-6 border-t border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 gap-4">
             <span>Cycle Commencement</span>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-slate-200" /> Historical Baseline</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Current Projection</div>
             </div>
             <span>Real-time Sync</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 rotate-12" />
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter italic">
               <TrendingUp className="w-5 h-5 text-blue-400" />
               Growth Insights
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed opacity-90 mb-8 font-medium">
               Your "Cold-Pressed Sicilian Olive Oil" SKU is trending 42% higher than similar products in the "Food & Beverage" category this week. Consider increasing stock allocation.
            </p>
            <button className="mela-button-primary px-8 py-2.5 rounded-xl text-[10px] uppercase tracking-widest">
               Review Supply Chain
            </button>
         </div>

         <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <div>
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter italic">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Operational Health
               </h3>
               <div className="space-y-6">
                  <div>
                     <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-500">Pick-to-Pack Efficiency</span>
                        <span className="font-black text-slate-900">94.2%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '94.2%' }} />
                     </div>
                  </div>
                  <div>
                     <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-500">Carrier Handover Sync</span>
                        <span className="font-black text-slate-900">88.7%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 rounded-full" style={{ width: '88.7%' }} />
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <Info className="w-4 h-4" />
               Based on rolling 30-day fulfillment logs
            </div>
         </div>
      </div>
    </div>
  );
}
