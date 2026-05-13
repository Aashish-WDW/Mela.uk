import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "customer" | "vendor" | "admin";
type User = { name: string; email: string; org: string; role: Role };
type AuthCtx = {
  user: User | null;
  login: (email: string, opts?: { name?: string; role?: Role; org?: string }) => void;
  logout: () => void;
  ready: boolean;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "mela.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login: AuthCtx["login"] = (email, opts) => {
    const role = opts?.role ?? "customer";
    const orgDefaults: Record<Role, string> = {
      customer: "Hawksmoor Group",
      vendor: "Borough Provisions Co.",
      admin: "MELA Operations",
    };
    const u: User = {
      email,
      name:
        opts?.name ||
        email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      org: opts?.org || orgDefaults[role],
      role,
    };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout, ready }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}

// Cart
type CartItem = { id: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
};
const CartC = createContext<CartCtx | null>(null);
const CKEY = "mela.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CKEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(CKEY, JSON.stringify(items));
  }, [items]);

  const add = (id: string, qty = 1) =>
    setItems((p) => {
      const ex = p.find((i) => i.id === id);
      return ex ? p.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...p, { id, qty }];
    });
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const update = (id: string, qty: number) => setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <CartC.Provider value={{ items, add, remove, update, clear, count }}>{children}</CartC.Provider>;
}

export function useCart() {
  const c = useContext(CartC);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
