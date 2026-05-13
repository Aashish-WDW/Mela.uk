import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const max = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={cn(
        "relative w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200",
        max
      )}>
        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
           <div className="min-w-0 pr-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tighter truncate italic uppercase">{title}</h3>
              {description && <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 truncate">{description}</p>}
           </div>
           <button 
             onClick={onClose} 
             aria-label="Close" 
             className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
           >
             <X className="w-5 h-5" />
           </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-4 sm:p-8 max-h-[85vh] overflow-y-auto font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block mb-4">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 leading-none">{label}</div>
      {children}
    </label>
  );
}
