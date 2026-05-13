import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ChevronRight, Info, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Mela Sign-In" }] }),
  component: () => <Login />,
});

function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("sarah@hawksmoor.example");
  const [password, setPassword] = useState("demo");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center pt-10 md:pt-16 px-4 font-sans">
        <Logo />
        <div className="w-full max-w-[350px] mt-6 border border-gray-300 rounded-lg p-6 md:p-8 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-medium mb-4 text-gray-900">Signed In</h1>
            <p className="text-sm text-gray-700 mb-8 leading-relaxed">Welcome back, <span className="font-bold">{user.name}</span>. You are currently managing your trade account.</p>
            <Link to="/catalogue" className="block w-full bg-amazon-orange hover:bg-amazon-orange-hover text-amazon-dark text-center py-2 rounded-full text-sm font-bold shadow-md transition-all active:scale-95">
                Continue to Catalogue
            </Link>
        </div>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email);
    nav({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 md:pt-12 px-4 font-sans pb-20 overflow-x-hidden">
      <Logo />

      {/* Main Login Card */}
      <div className="w-full max-w-[350px] mt-4 border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
        <h1 className="text-[28px] md:text-[32px] font-medium mb-5 text-gray-950">{mode === "signin" ? "Sign-In" : "Create Account"}</h1>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1.5 text-gray-900">Email or mobile phone number</label>
            <input 
              required 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amazon-orange shadow-inner transition-shadow focus:shadow-md" 
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
                <label className="text-xs font-bold block text-gray-900">Password</label>
                <button type="button" className="text-[11px] text-blue-600 hover:underline hover:text-orange-700 font-medium">Forgot your password?</button>
            </div>
            <input 
              required 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amazon-orange shadow-inner transition-shadow focus:shadow-md" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#f0c14b] border border-[#a88734] hover:bg-[#f4d078] text-amazon-dark py-2 rounded-md text-sm font-bold shadow-sm transition-all transform active:scale-[0.98] mt-2"
          >
            {mode === "signin" ? "Sign-In" : "Continue"}
          </button>
        </form>

        <div className="mt-5 text-[11px] text-gray-700 leading-relaxed">
          By continuing, you agree to Mela's <span className="text-blue-600 hover:underline cursor-pointer font-medium">Trade Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer font-medium">Privacy Notice</span>.
        </div>

        <div className="mt-6 flex items-center gap-1.5 group cursor-pointer border-t border-gray-50 pt-5">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
            <span className="text-[11px] text-blue-600 hover:underline hover:text-orange-700 font-bold uppercase tracking-wider">Need trade help?</span>
        </div>
      </div>

      {/* Divider for Signup */}
      <div className="w-full max-w-[350px] mt-8 flex items-center gap-3">
          <div className="h-[1px] bg-gray-200 flex-1" />
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{mode === "signin" ? "New to Mela?" : "Already Registered?"}</span>
          <div className="h-[1px] bg-gray-200 flex-1" />
      </div>

      <button 
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="w-full max-w-[350px] mt-6 border border-gray-300 bg-gray-50 hover:bg-gray-100 py-2 rounded-md text-sm font-bold shadow-sm transition-all active:scale-[0.98]"
      >
        {mode === "signin" ? "Create your Mela account" : "Sign-In to Trade"}
      </button>

      {/* Demo Notice */}
      <div className="w-full max-w-[350px] mt-10 p-4 bg-blue-50/50 border border-blue-100 rounded-lg flex gap-3 group hover:bg-blue-50 transition-colors">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-[10px] text-blue-800 leading-relaxed font-medium">
             <span className="font-bold uppercase tracking-tighter block mb-0.5">Sandbox Environment</span>
             Any trade credentials will work. This interface is optimized for procurement evaluation and wholesale logistics testing.
          </div>
      </div>

      {/* Footer */}
      <div className="mt-16 w-full max-w-[1500px] border-t border-gray-100 pt-10 flex flex-col items-center">
          <div className="flex gap-10 text-[11px] text-blue-600 mb-3 font-bold uppercase tracking-widest">
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Contact</span>
          </div>
          <div className="text-[10px] text-gray-400 font-medium">© 2024-2026, Mela.uk Global Trade, Inc. or its affiliates</div>
      </div>
    </div>
  );
}

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-0.5 mb-6 group">
            <span className="font-display text-4xl font-bold tracking-tighter text-amazon-dark group-hover:opacity-80 transition-opacity">mela</span>
            <span className="text-amazon-orange font-bold text-2xl mt-1.5">.uk</span>
        </Link>
    );
}
