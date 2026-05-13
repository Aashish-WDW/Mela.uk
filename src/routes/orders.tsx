import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/mela/CustomerShell";
import { useAuth } from "@/lib/auth";
import { orders } from "@/lib/seed";
import { Box, Truck, CheckCircle, Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Your Orders — MELA Trade" }] }),
  component: () => <CustomerShell><Orders /></CustomerShell>,
});

const getStatusColor = (s: string) => {
  switch (s) {
    case "Delivered": return "text-green-700 bg-green-50 border-green-100";
    case "Dispatched": return "text-blue-700 bg-blue-50 border-blue-100";
    case "Picking": return "text-orange-700 bg-orange-50 border-orange-100";
    default: return "text-gray-700 bg-gray-50 border-gray-100";
  }
};

const getProgressWidth = (s: string) => {
  switch (s) {
    case "Confirmed": return "25%";
    case "Picking": return "50%";
    case "Dispatched": return "75%";
    case "Delivered": return "100%";
    default: return "0%";
  }
};

function Orders() {
  const { user } = useAuth();
  if (!user) return <SignInPrompt page="orders" />;

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-amazon-dark tracking-tight">Your Trade Orders</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium uppercase tracking-widest">Tracking shipments from MELA-01 Park Royal</p>
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
             <button className="text-amazon-orange border-b-2 border-amazon-orange pb-1">Active</button>
             <button className="hover:text-amazon-dark transition-colors pb-1">Past 3 Months</button>
             <button className="hover:text-amazon-dark transition-colors pb-1">Archived</button>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden group hover:border-gray-300 transition-colors">
              {/* Card Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                 <div>
                    <div className="mb-1">Order Placed</div>
                    <div className="text-amazon-dark">{o.date}</div>
                 </div>
                 <div className="hidden md:block">
                    <div className="mb-1">Line Items</div>
                    <div className="text-amazon-dark">{o.items} Units</div>
                 </div>
                 <div className="hidden md:block text-right md:text-left">
                    <div className="mb-1">Ship To</div>
                    <div className="text-amazon-dark truncate">{o.buyerCompany}</div>
                 </div>
                 <div className="text-right">
                    <div className="mb-1">Order # {o.ref}</div>
                    <div className="text-blue-600 hover:underline cursor-pointer">View Details</div>
                 </div>
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
                 <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8 text-gray-400" />
                 </div>
                 
                 <div className="flex-1 space-y-4 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                       <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusColor(o.status)}`}>
                             {o.status}
                          </span>
                          <span className="text-sm font-bold text-amazon-dark">
                             {o.status === "Delivered" ? `Arrived ${o.eta}` : `Expected Arrival: ${o.eta}`}
                          </span>
                       </div>
                       <button className="bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark text-[11px] font-bold px-4 py-2 rounded-md shadow-sm transition-all active:scale-95">
                          Track Shipment
                       </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                             className="h-full bg-amazon-orange transition-all duration-1000 ease-out" 
                             style={{ width: getProgressWidth(o.status) }} 
                          />
                       </div>
                       <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">
                          <div className={o.status === "Confirmed" ? "text-amazon-orange" : ""}>Confirmed</div>
                          <div className={o.status === "Picking" ? "text-amazon-orange" : ""}>Picking</div>
                          <div className={o.status === "Dispatched" ? "text-amazon-orange" : ""}>In Transit</div>
                          <div className={o.status === "Delivered" ? "text-amazon-orange" : ""}>Delivered</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center gap-2">
                 <Box className="w-3 h-3 text-gray-400" />
                 <span className="text-[10px] text-gray-500 font-medium">Originating Facility: <span className="font-bold">{o.warehouse}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SignInPrompt({ page }: { page: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
      <div className="max-w-[400px] bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-amazon-dark mb-4 tracking-tight">Sign-In Required</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
           To access your <span className="font-bold">{page}</span> and manage your trade account, please authenticate using your registered business credentials.
        </p>
        <Link to="/login" className="block w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark py-3 rounded-md text-sm font-bold shadow-md transition-all active:scale-95">
           Sign In to Trade Account
        </Link>
        <div className="mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
           New to MELA? <Link to="/login" className="text-blue-600 hover:underline">Start here.</Link>
        </div>
      </div>
    </div>
  );
}
