// Homepage copy and illustrative sample data. Components take these as props; copy edits happen here only.
// Every visible sentence is mapped to a claim in docs/home-lab/CLAIM_MAP.md. HOLD items are not in this file.
import { siteConfig } from "./site";

const { email, company, foundingYear, country } = siteConfig;

export const meta = {
  title: "HELIX: White-label logistics software for couriers and 3PLs",
  description:
    "HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio in India. Run your own branded shipping platform for parcels and freight.",
};

export const nav = {
  wordmarkSub: `by ${company}`,
  links: [
    { label: "White-label", href: "#white-label" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Who it is for", href: "#who-its-for" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Request a demo", href: "#request-demo" },
  menuLabel: "Menu",
};

// Sample operator brands. Made-up names, colours kept far from the HELIX blue.
export const tenants = [
  { id: "tavrin", name: "Tavrin Couriers", mark: "T", color: "#C2410C", tint: "#FBEDE5", ink: "#7C2D12", kind: "Regional courier" },
  { id: "monvara", name: "Monvara Freight", mark: "M", color: "#0F766E", tint: "#E3F2EF", ink: "#134E4A", kind: "Freight broker" },
  { id: "ondrel", name: "Ondrel Cargo", mark: "O", color: "#86198F", tint: "#F5E6F5", ink: "#581C5C", kind: "3PL" },
];

export const sampleCaption = "Illustrative interface. Sample data.";

// One console view, shared by the hero and the re-skin section.
export const consoleView = {
  product: "Operator console",
  search: "Search AWB, merchant or pincode",
  user: "RK",
  navItems: ["Shipments", "Quotations", "Rate cards", "Contracts", "Carrier accounts", "Settlement"],
  title: "Shipments",
  tabs: ["All", "Parcel", "Freight"],
  columns: [
    { key: "awb", label: "AWB" },
    { key: "merchant", label: "Merchant" },
    { key: "type", label: "Type" },
    { key: "lane", label: "Lane" },
    { key: "cod", label: "COD", title: "Cash on delivery", numeric: true },
    { key: "status", label: "Status" },
  ],
  rows: [
    { awb: "418209337561", merchant: "Kanchi Loom House", type: "Parcel", lane: "560034 → 110037", cod: "₹1,249", status: "Booked", tone: "neutral" },
    { awb: "418209337578", merchant: "Nandi Home Store", type: "Parcel", lane: "400072 → 600040", cod: "Prepaid", status: "In transit", tone: "brand" },
    { awb: "418209337584", merchant: "Sahyadri Agro", type: "Freight · LTL", lane: "411019 → 380015", cod: "—", status: "Picked up", tone: "brand" },
    { awb: "418209337592", merchant: "Kanchi Loom House", type: "Parcel", lane: "560034 → 700091", cod: "₹2,180", status: "Out for delivery", tone: "brand" },
    { awb: "418209337605", merchant: "Kaveri Fittings", type: "Freight · LTL", lane: "600058 → 500032", cod: "—", status: "Booked", tone: "neutral" },
    { awb: "418209337613", merchant: "Nandi Home Store", type: "Parcel", lane: "400072 → 302017", cod: "₹649", status: "Delivered", tone: "success" },
  ],
};

export const hero = {
  eyebrow: "White-label logistics operating system",
  title: "Ship under your own name.",
  lead:
    "HELIX lets regional couriers, 3PLs, freight brokers, franchise networks and aggregators in India run their own branded shipping platform, for parcels and for freight. Your brand on every screen.",
  primary: { label: "Request a demo", href: "#request-demo" },
  secondary: { label: "See how white-label works", href: "#white-label" },
  trust: `Built by ${company}, a product engineering company in ${country}. Founded in ${foundingYear}.`,
  tenant: "tavrin",
  helyoAlt: "Helyo, the HELIX companion, holding out an open hand towards the console",
};

export const entityLine = `HELIX is a white-label, multi-tenant logistics operating system built by ${company}.`;

export const problem = {
  id: "problem",
  statement:
    "Every shipment you book on someone else’s platform teaches your merchants to trust that platform, not you.",
  points: [
    { title: "Your brand.", body: "Your merchants log in to a stranger’s portal." },
    { title: "Your margin.", body: "Rates, fees and rules belong to the platform. You keep what is left after them." },
    { title: "Your merchants.", body: "Whoever owns the screen owns the relationship." },
  ],
  close: "HELIX is built so you keep all three.",
  helyoAlt: "Helyo with a concerned expression",
};

export const whiteLabel = {
  id: "white-label",
  title: "Same engine. Your name on it.",
  body:
    "Each operator runs HELIX under its own logo and colours. Switch the sample brand below and watch the whole console become theirs.",
  switchLabel: "Sample brand",
  constantNote: "HELIX stays the same underneath.",
};

export const journey = {
  id: "how-it-works",
  title: "One route, from quote to settlement.",
  intro: "Follow one sample freight shipment, sent LTL (less than truckload), through the console.",
  shipment: { merchant: "Sahyadri Agro", lane: "Pune 411019 → Ahmedabad 380015", load: "LTL · 4 pallets · 640 kg" },
  steps: [
    {
      id: "quote",
      name: "Quote",
      body: "Rate cards, slabs, zones and surcharges set by you, with pricing per tenant and per seller.",
      pose: "inspect",
      card: {
        title: "Quotation QT-2026-0418",
        rows: [
          ["Rate card", "West LTL · valid to 31 Dec 2026"],
          ["Slab", "500–1,000 kg at ₹68/kg"],
          ["Freight", "₹43,520.00"],
          ["Fuel surcharge 12%", "₹5,222.40"],
          ["Docket", "₹150.00"],
        ],
        total: ["Quoted", "₹48,892.40"],
      },
    },
    {
      id: "book",
      name: "Book",
      body: "Parcels and heavy freight booked through one flow across your carrier accounts.",
      pose: "parcel",
      card: {
        title: "Booking",
        rows: [
          ["AWB (air waybill)", "418209337584"],
          ["Carrier account", "Regional LTL · account 2"],
          ["Pickup", "9 Oct, 10:00–13:00"],
          ["Pieces", "4 pallets"],
        ],
        total: ["Status", "Booked"],
      },
    },
    {
      id: "run",
      name: "Run",
      body: "Operator and admin controls, contracts and quotations in one console.",
      pose: "guide",
      card: {
        title: "Contract CT-0042",
        rows: [
          ["Merchant", "Sahyadri Agro"],
          ["Term", "1 Apr 2026 – 31 Mar 2027"],
          ["Seller pricing", "West LTL, 4% below card"],
          ["Changes", "Pricing admin approval"],
        ],
        total: ["Status", "Active"],
      },
    },
    {
      id: "settle",
      name: "Settle",
      body: "Settlement and reconciliation built in, so the money trail matches the shipment trail.",
      pose: "reassure",
      card: {
        title: "Invoice INV-2026-0912",
        rows: [
          ["Shipment", "418209337584"],
          ["Billed to merchant", "₹48,892.40"],
          ["Carrier bill", "₹41,310.00"],
          ["Difference", "Matched to contract"],
        ],
        total: ["Reconciliation", "Matched"],
      },
    },
  ],
  helyoAlt: {
    inspect: "Helyo looking at a parcel on the floor",
    parcel: "Helyo holding a parcel with both hands",
    guide: "Helyo pointing ahead",
    reassure: "Helyo with an open, reassuring hand",
  },
};

export const capabilities = {
  id: "capabilities",
  title: "Built for how freight and parcels really run.",
  items: [
    { id: "ratecards", title: "Rate cards that model slabs, zones, surcharges and validity" },
    { id: "modes", title: "Parcels and heavy freight on one platform" },
    { id: "carriers", title: "Multi-carrier booking" },
    { id: "pricing", title: "Tenant- and seller-specific pricing" },
    { id: "quotes", title: "Quotations and contracts" },
    { id: "settlement", title: "Settlement and reconciliation" },
  ],
  rateCard: {
    name: "Parcel standard · valid 1 Oct – 31 Dec 2026",
    head: ["Slab", "Zone A", "Zone B", "Zone C", "Zone D"],
    rows: [
      ["0–0.5 kg", "₹32", "₹38", "₹46", "₹58"],
      ["0.5–1 kg", "₹54", "₹63", "₹77", "₹96"],
      ["Each extra 0.5 kg", "₹21", "₹25", "₹31", "₹39"],
    ],
    note: "Surcharges: fuel 12%, out-of-delivery-area ₹35",
  },
  modes: [
    { type: "Parcel", detail: "0.8 kg · 560034 → 110037", awb: "418209337561" },
    { type: "Freight · LTL", detail: "640 kg · 4 pallets · 411019 → 380015", awb: "418209337584" },
  ],
  carrierAccounts: [
    { name: "Surface · account 1", service: "Parcel", selected: false },
    { name: "Regional LTL · account 2", service: "Freight", selected: true },
    { name: "Air · account 3", service: "Parcel", selected: false },
  ],
  pricing: [
    ["Tenant card", "Parcel standard"],
    ["Seller", "Kanchi Loom House"],
    ["Seller rate", "Zone B 0.5–1 kg at ₹58"],
  ],
  quotes: [
    { id: "QT-2026-0418", who: "Sahyadri Agro", amount: "₹48,892.40", status: "Accepted" },
    { id: "QT-2026-0421", who: "Kaveri Fittings", amount: "₹1,12,640.00", status: "Sent" },
    { id: "CT-0042", who: "Sahyadri Agro", amount: "Contract", status: "Active" },
  ],
  settlement: [
    { id: "INV-2026-0912", amount: "₹48,892.40", status: "Matched" },
    { id: "INV-2026-0913", amount: "₹1,24,500.00", status: "Matched" },
    { id: "INV-2026-0914", amount: "₹8,215.00", status: "Review" },
  ],
};

export const operators = {
  id: "who-its-for",
  title: "Made for the people who run the network.",
  items: [
    { name: "Regional couriers", body: "Take your network online under your own brand." },
    { name: "3PLs", note: "Third-party logistics providers", body: "Give every merchant a portal that carries your name." },
    { name: "Freight brokers", body: "Quote, book and settle freight from one console." },
    { name: "Franchise networks", body: "One platform, one brand across every branch." },
    { name: "Aggregators", body: "Offer carrier choice to your merchants, on your terms." },
  ],
};

export const builtBy = {
  id: "built-by",
  title: `Built by ${company}.`,
  body: `${company} is a product engineering company based in ${country}, founded in ${foundingYear}. We build HELIX, license it to logistics operators, and provide the engineering services around it.`,
  facts: [
    { label: "Founded", value: String(foundingYear) },
    { label: "Based in", value: country },
    { label: "Email", value: email, href: `mailto:${email}` },
  ],
  helyo: "Meet Helyo, the HELIX companion.",
  helyoAlt: "Helyo presenting with both hands open",
};

export const faq = {
  id: "faq",
  title: "Questions operators ask",
  items: [
    { q: "What is HELIX?", a: `HELIX is a white-label, multi-tenant logistics operating system built by ${company}. Operators run it as their own branded shipping platform.` },
    { q: "Who is HELIX for?", a: `Regional couriers, 3PLs, freight brokers, franchise networks and aggregators in ${country}.` },
    { q: "What does white-label mean here?", a: "The platform carries your brand, not ours. Each operator runs its own tenant with its own look and its own pricing." },
    { q: "Does HELIX handle parcels and freight?", a: "Yes: B2C parcels and B2B heavy freight and LTL." },
    { q: "Who builds HELIX?", a: `${company}, a product engineering company in ${country}, founded in ${foundingYear}.` },
    { q: "How is HELIX licensed?", a: "As a SaaS platform, with engineering services around it. Talk to us and we will scope it for your network." },
    { q: "How do I see it?", a: `Request a demo below and we will reply from ${email}.` },
  ],
};

export const demo = {
  id: "request-demo",
  title: "See HELIX under your own name.",
  lead: `Tell us what you ship and who you ship for. We reply from ${email}.`,
  fields: {
    name: { label: "Name", autoComplete: "name" },
    email: { label: "Work email", autoComplete: "email" },
    company: { label: "Company", autoComplete: "organization" },
    type: {
      label: "Company type",
      placeholder: "Choose one",
      options: ["Regional courier", "3PL", "Freight broker", "Franchise network", "Aggregator", "Other"],
    },
    message: { label: "Message", optional: "Optional", hint: "What you ship, and roughly where." },
  },
  submit: "Request a demo",
  sending: "Sending…",
  privacy: "We use your details only to reply to this request.",
  success: "Request received. We will reply to the email you gave us.",
  errors: {
    required: "Please fill this in.",
    email: "Enter a work email address, for example with your company domain.",
    type: "Choose the closest match.",
    failed: "We could not send this just now.",
    rate: "Too many requests from this connection. Please try again in a few minutes.",
  },
  fallback: { lead: "Email us directly:", label: `Email ${email}`, href: `mailto:${email}?subject=HELIX%20demo%20request` },
  helyoAlt: "Helyo with an open, reassuring hand",
};

export const footer = {
  line: `HELIX is a product of ${company}, a product engineering company based in ${country}. Founded in ${foundingYear}.`,
  email,
  copyright: `© ${new Date().getFullYear()} ${company}`,
  helyoAlt: "Helyo quietly celebrating at the end of the route",
};

export const helyoIntroAlt = "Helyo";
