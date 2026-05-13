import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import olive from "@/assets/deal-olive.jpg";
import coffee from "@/assets/deal-coffee.jpg";
import packaging from "@/assets/deal-packaging.jpg";
import wine from "@/assets/deal-wine.jpg";
import tools from "@/assets/deal-tools.jpg";

const slides = [
  { img: olive, eyebrow: "Limited Time Deal", title: "Premium Cold-pressed Sicilian Olive Oil", note: "Case of 12 × 500ml · Up to 12% off for trade", tag: "Deal of the Day" },
  { img: coffee, eyebrow: "New Allocation", title: "Freshly Roasted Shoreditch Coffee Beans", note: "1kg bags · Specialty grade · Next day dispatch", tag: "Amazon Choice" },
  { img: packaging, eyebrow: "Bulk Savings", title: "Eco-Friendly Compostable Kraft Cups", note: "Sleeves of 1,000 · Wholesale pricing", tag: "Bulk Discount" },
  { img: wine, eyebrow: "Exclusive Fine Wine", title: "2021 Burgundy Pinot Noir Reserve", note: "Highly rated vintage · limited stock", tag: "Premium" },
  { img: tools, eyebrow: "Trade Essentials", title: "Professional 18V Brushless Combi Drill", note: "Rugged design · 2-year warranty included", tag: "Bestseller" },
];

export function DealsCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section 
      className="relative w-full h-full group bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === i ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"}`}
          >
            <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" loading={idx === 0 ? "eager" : "lazy"} />
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="relative h-full flex flex-col justify-center px-8 md:px-24 text-white max-w-4xl">
              <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left-4 duration-500">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  {s.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-400/80">{s.eyebrow}</span>
              </div>
              
              <h3 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tighter italic animate-in slide-in-from-left-8 duration-700 delay-100">
                {s.title}
              </h3>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-medium animate-in slide-in-from-left-12 duration-700 delay-200">
                {s.note}
              </p>
              
              <Link 
                to="/catalogue" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest w-fit transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] animate-in slide-in-from-left-16 duration-700 delay-300"
              >
                Secure Allocation
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Glassmorphic */}
      <button
        onClick={() => setI((x) => (x - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center glass rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
      </button>
      
      <button
        onClick={() => setI((x) => (x + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center glass rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" strokeWidth={3} />
      </button>

      {/* Modern Progress Dots */}
      <div className="absolute bottom-12 left-8 md:left-24 flex gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${idx === i ? "w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "w-4 bg-white/20 hover:bg-white/40"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
