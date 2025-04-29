import { CodeIcon, ShoppingCartIcon, BookOpenIcon, RobotIcon, LayersIcon, GlobeIcon, ShieldCheckIcon, StarIcon } from "lucide-react";

// Desc: Contact Card Constants for the Contact Card Component
// Path: cyper/app/components/Constant/ContactCardConstant.jsx

export const SERVICES = [
  {
    id: "ecommerce",
    name: "Ecommerce",
    icon: ShoppingCartIcon,
    description: "Custom ecommerce solutions with seamless payment integration",
  },
  {
    id: "edtech",
    name: "EdTech",
    icon: BookOpenIcon,
    description: "Interactive learning platforms and educational technology",
  },
  {
    id: "ai",
    name: "AI Agents",
    icon: RobotIcon,
    description: "Intelligent automation and conversational AI solutions",
  },
  {
    id: "saas",
    name: "SaaS",
    icon: LayersIcon,
    description: "Scalable cloud-based software platforms",
  },
];

export const COMPANY_FEATURES = [
  { icon: GlobeIcon, text: "Delhi-based with global clients" },
  { icon: StarIcon, text: "5+ years of industry excellence" },
  { icon: ShieldCheckIcon, text: "Enterprise-grade security" },
  { icon: CodeIcon, text: "Modern tech stack expertise" },
];

export const FLOATING_LABELS = [
  { id: 1, text: "React", className: "tech-react" },
  { id: 2, text: "NodeJS", className: "tech-node" },
  { id: 3, text: "MongoDB", className: "tech-mongo" },
  { id: 4, text: "AWS", className: "tech-aws" },
  { id: 5, text: "Python", className: "tech-python" },
  { id: 6, text: "TensorFlow", className: "tech-tf" },
  { id: 7, text: "Next.js", className: "tech-next" },
  { id: 8, text: "GraphQL", className: "tech-graphql" },
  { id: 9, text: "TypeScript", className: "tech-ts" },
  { id: 10, text: "Tailwind", className: "tech-tailwind" },
];

export const budgetOptions = [
  { value: "5k-10k", label: "$5K - $10K" },
  { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" },
  { value: "50k+", label: "$50K+" },
  { value: "not-sure", label: "Not sure yet" },
];
