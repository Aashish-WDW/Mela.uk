// Seeded MELA data for the entire frontend demo.

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  subs: string[];
  image: string;
};

export const categories: Category[] = [
  { slug: "food-beverage", name: "Food & Beverage", blurb: "Dry goods, fresh produce, dairy, beverages.", subs: ["Dry Goods", "Fresh Produce", "Dairy", "Confectionery", "Beverages", "Condiments"], image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" },
  { slug: "packaging", name: "Packaging & Disposables", blurb: "Eco kraft, takeaway, branded boxes.", subs: ["Takeaway", "Cups", "Cutlery", "Bags", "Branded"], image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&q=80&w=800" },
  { slug: "kitchen", name: "Kitchen & Catering", blurb: "Smallwares, equipment, prep tools.", subs: ["Smallwares", "Equipment", "Prep", "Tableware"], image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
  { slug: "office", name: "Office & Tech", blurb: "Stationery, peripherals, breakroom.", subs: ["Stationery", "Peripherals", "Breakroom"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { slug: "beauty", name: "Beauty & Wellness", blurb: "Salon, clinic, PPE, consumables.", subs: ["Salon", "Clinic", "PPE"], image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800" },
  { slug: "trade", name: "Trade & Construction", blurb: "Tools, materials, safety wear.", subs: ["Tools", "Materials", "Safety"], image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" },
];

export type Vendor = {
  id: string;
  name: string;
  city: string;
  rating: number;
  since: number;
  verified: boolean;
  blurb: string;
  logo?: string;
};

export const vendors: Vendor[] = [
  { id: "v-borough", name: "Borough Provisions Co.", city: "London SE1", rating: 4.9, since: 2014, verified: true, blurb: "Heritage produce hauliers serving central London kitchens.", logo: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=100" },
  { id: "v-thames", name: "Thames Pack & Print", city: "London E14", rating: 4.7, since: 2018, verified: true, blurb: "Compostable packaging and on-demand branded print.", logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100" },
  { id: "v-shoreditch", name: "Shoreditch Coffee Works", city: "London E2", rating: 4.8, since: 2016, verified: true, blurb: "Specialty roasters supplying cafés across Greater London.", logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=100" },
  { id: "v-camden", name: "Camden Tool & Trade", city: "London NW1", rating: 4.6, since: 2011, verified: true, blurb: "Tradesperson-grade tools, PPE and site consumables.", logo: "https://images.unsplash.com/photo-1504148455328-497c5efdf13d?auto=format&fit=crop&q=80&w=100" },
  { id: "v-kensington", name: "Kensington Beauty Supply", city: "London SW7", rating: 4.7, since: 2019, verified: true, blurb: "Salon-grade beauty products, professional only.", logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=100" },
  { id: "v-mayfair", name: "Mayfair Fine Wines", city: "London W1", rating: 4.9, since: 2009, verified: true, blurb: "Curated wholesale wine for hospitality groups.", logo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=100" },
];

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  vendor: string;
  unit: string;
  moq: number;
  stock: number;
  leadTime: string;
  hue: string; // for visual swatch
  origin: string;
  tags: string[];
  image: string;
};

const h = (i: number) => ["#C97B4A", "#3F5B3A", "#1B1B1B", "#D9B26A", "#7C2D2D", "#264653", "#A07E55", "#5B6F4A"][i % 8];

export const products: Product[] = [
  { id: "p-001", sku: "BPC-OL-500", name: "Cold-Pressed Sicilian Olive Oil", category: "food-beverage", vendor: "v-borough", unit: "case of 12 × 500ml", moq: 2, stock: 480, leadTime: "48h", hue: h(0), origin: "Sicily, IT", tags: ["organic", "estate"], image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800" },
  { id: "p-002", sku: "BPC-FL-25", name: "Stoneground Heritage Flour", category: "food-beverage", vendor: "v-borough", unit: "25kg sack", moq: 4, stock: 220, leadTime: "72h", hue: h(3), origin: "Kent, UK", tags: ["heritage"], image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" },
  { id: "p-003", sku: "SCW-ESP-1K", name: "House Espresso Blend", category: "food-beverage", vendor: "v-shoreditch", unit: "1kg bag", moq: 6, stock: 1200, leadTime: "24h", hue: h(2), origin: "Roasted E2", tags: ["specialty", "fair-trade"], image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800" },
  { id: "p-004", sku: "SCW-OAT-12", name: "Barista Oat Milk", category: "food-beverage", vendor: "v-shoreditch", unit: "case of 12 × 1L", moq: 3, stock: 860, leadTime: "24h", hue: h(6), origin: "UK", tags: ["plant-based"], image: "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?auto=format&fit=crop&q=80&w=800" },
  { id: "p-005", sku: "TPP-CUP-8OZ", name: "Compostable Kraft Cup 8oz", category: "packaging", vendor: "v-thames", unit: "sleeve of 1,000", moq: 1, stock: 320, leadTime: "48h", hue: h(0), origin: "UK", tags: ["compostable"], image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800" },
  { id: "p-006", sku: "TPP-BAG-M", name: "Branded Kraft Carrier (M)", category: "packaging", vendor: "v-thames", unit: "carton of 500", moq: 2, stock: 140, leadTime: "5d", hue: h(7), origin: "UK", tags: ["custom-print"], image: "/assets/kraft_carrier.png" },
  { id: "p-007", sku: "MFW-BRGND", name: "Burgundy Pinot Noir 2021", category: "food-beverage", vendor: "v-mayfair", unit: "case of 6", moq: 1, stock: 96, leadTime: "72h", hue: h(4), origin: "Burgundy, FR", tags: ["allocation"], image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800" },
  { id: "p-008", sku: "CTT-DRILL-18V", name: "18V Brushless Combi Drill", category: "trade", vendor: "v-camden", unit: "single unit", moq: 5, stock: 48, leadTime: "48h", hue: h(5), origin: "DE", tags: ["pro"], image: "/assets/brushless_drill.png" },
  { id: "p-009", sku: "CTT-PPE-HIVIS", name: "Hi-Vis Class 2 Vest", category: "trade", vendor: "v-camden", unit: "pack of 25", moq: 2, stock: 410, leadTime: "24h", hue: h(3), origin: "UK", tags: ["EN ISO 20471"], image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=800" },
  { id: "p-010", sku: "KBS-KER-1L", name: "Keratin Treatment Pro", category: "beauty", vendor: "v-kensington", unit: "1L bottle", moq: 6, stock: 180, leadTime: "48h", hue: h(0), origin: "FR", tags: ["pro-only"], image: "/assets/keratin_pro.png" },
  { id: "p-011", sku: "KBS-NIT-100", name: "Nitrile Exam Glove (M)", category: "beauty", vendor: "v-kensington", unit: "case of 10×100", moq: 1, stock: 220, leadTime: "24h", hue: h(6), origin: "MY", tags: ["medical"], image: "/assets/nitrile_gloves.png" },
  { id: "p-012", sku: "TPP-TAKE-BIO", name: "Bagasse Takeaway Container", category: "packaging", vendor: "v-thames", unit: "carton of 500", moq: 2, stock: 540, leadTime: "48h", hue: h(7), origin: "UK", tags: ["compostable"], image: "https://images.unsplash.com/photo-1595131838595-3154b9f4450b?auto=format&fit=crop&q=80&w=800" },
];

export type Enquiry = {
  id: string;
  ref: string;
  date: string;
  buyer: string;
  buyerCompany: string;
  product: string;
  qty: number;
  vendor: string;
  status: "New" | "Quoted" | "Negotiating" | "Won" | "Lost";
  assignee: string;
};

export const enquiries: Enquiry[] = [
  { id: "e-1001", ref: "MEL-24871", date: "2026-05-04", buyer: "Sarah Chen", buyerCompany: "Hawksmoor Group", product: "p-001", qty: 24, vendor: "v-borough", status: "Quoted", assignee: "Priya S." },
  { id: "e-1002", ref: "MEL-24872", date: "2026-05-05", buyer: "Marco Bianchi", buyerCompany: "Bianchi Caffè", product: "p-003", qty: 60, vendor: "v-shoreditch", status: "Negotiating", assignee: "Tom R." },
  { id: "e-1003", ref: "MEL-24873", date: "2026-05-05", buyer: "Aisha Patel", buyerCompany: "Lumen Salons", product: "p-010", qty: 12, vendor: "v-kensington", status: "New", assignee: "—" },
  { id: "e-1004", ref: "MEL-24874", date: "2026-05-06", buyer: "James Okafor", buyerCompany: "BuildRight Ltd", product: "p-008", qty: 20, vendor: "v-camden", status: "Won", assignee: "Priya S." },
  { id: "e-1005", ref: "MEL-24875", date: "2026-05-06", buyer: "Helena Park", buyerCompany: "Park Hospitality", product: "p-007", qty: 8, vendor: "v-mayfair", status: "Quoted", assignee: "Tom R." },
  { id: "e-1006", ref: "MEL-24876", date: "2026-05-07", buyer: "Sarah Chen", buyerCompany: "Hawksmoor Group", product: "p-005", qty: 40, vendor: "v-thames", status: "New", assignee: "—" },
];

export type Order = {
  id: string;
  ref: string;
  date: string;
  buyerCompany: string;
  items: number;
  status: "Confirmed" | "Picking" | "Dispatched" | "Delivered";
  eta: string;
  warehouse: string;
};

export const orders: Order[] = [
  { id: "o-9001", ref: "ORD-58231", date: "2026-05-01", buyerCompany: "Hawksmoor Group", items: 14, status: "Delivered", eta: "2026-05-03", warehouse: "MELA-01 Park Royal" },
  { id: "o-9002", ref: "ORD-58232", date: "2026-05-03", buyerCompany: "Bianchi Caffè", items: 6, status: "Dispatched", eta: "2026-05-08", warehouse: "MELA-01 Park Royal" },
  { id: "o-9003", ref: "ORD-58233", date: "2026-05-04", buyerCompany: "BuildRight Ltd", items: 22, status: "Picking", eta: "2026-05-09", warehouse: "MELA-01 Park Royal" },
  { id: "o-9004", ref: "ORD-58234", date: "2026-05-06", buyerCompany: "Park Hospitality", items: 9, status: "Confirmed", eta: "2026-05-10", warehouse: "MELA-01 Park Royal" },
];

export type Buyer = {
  id: string;
  name: string;
  contact: string;
  segment: string;
  since: string;
  orders: number;
  status: "Verified" | "Pending";
  image: string;
};

export const buyers: Buyer[] = [
  { id: "b-01", name: "Hawksmoor Group", contact: "Sarah Chen", segment: "Hospitality", since: "2024", orders: 38, status: "Verified", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" },
  { id: "b-02", name: "Bianchi Caffè", contact: "Marco Bianchi", segment: "Hospitality", since: "2025", orders: 12, status: "Verified", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" },
  { id: "b-03", name: "Lumen Salons", contact: "Aisha Patel", segment: "Beauty", since: "2025", orders: 4, status: "Pending", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=400" },
  { id: "b-04", name: "BuildRight Ltd", contact: "James Okafor", segment: "Trade", since: "2023", orders: 71, status: "Verified", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400" },
  { id: "b-05", name: "Park Hospitality", contact: "Helena Park", segment: "Hospitality", since: "2024", orders: 22, status: "Verified", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
  { id: "b-06", name: "Northwood Pharmacy", contact: "Daniel Wu", segment: "Healthcare", since: "2026", orders: 1, status: "Pending", image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=400" },
];

export const stats = {
  buyers: 2487,
  vendors: 54,
  enquiriesMonth: 1142,
  fulfilment: 98.6,
  responseHrs: 1.6,
  warehouseUse: 71,
};

export const trend = [
  42, 48, 55, 51, 60, 67, 72, 70, 78, 84, 90, 96, 102, 110,
];

export type Staff = {
  id: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  status: "Active" | "Invited" | "Away";
  image: string;
};

export const staff: Staff[] = [
  { id: "s1", name: "Priya Sharma", role: "Operations Manager", dept: "Operations", email: "priya@mela.london", status: "Active", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { id: "s2", name: "Tom Reilly", role: "Senior Trade Desk", dept: "Sales", email: "tom@mela.london", status: "Active", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { id: "s3", name: "Amara Diallo", role: "Warehouse Lead", dept: "Warehouse", email: "amara@mela.london", status: "Away", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200" },
  { id: "s4", name: "Noah Bennett", role: "Vendor Success", dept: "Partnerships", email: "noah@mela.london", status: "Active", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { id: "s5", name: "Ines Moreau", role: "Accounts", dept: "Finance", email: "ines@mela.london", status: "Active", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);
export const findVendor = (id: string) => vendors.find((v) => v.id === id);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
