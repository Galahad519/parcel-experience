import {
  BarChart3,
  Bot,
  Boxes,
  CircleDollarSign,
  Clock3,
  Headphones,
  Map,
  PackageCheck,
  Route,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';

export const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const problemCards = [
  {
    icon: Truck,
    title: 'Customers leave your brand',
    description: 'Carrier links send shoppers to generic tracking pages right after checkout, when attention is still high.',
  },
  {
    icon: Map,
    title: 'Delivery updates feel unclear',
    description: 'Raw logistics events are often technical, inconsistent, and difficult for customers to interpret.',
  },
  {
    icon: Headphones,
    title: 'Support absorbs the anxiety',
    description: 'When tracking is confusing, customers ask your team the same “Where is my order?” questions.',
  },
  {
    icon: CircleDollarSign,
    title: 'A high-intent moment is wasted',
    description: 'The waiting period can drive trust, education, and add-ons, but most brands hand it away.',
  },
];

export const solutionPoints = [
  'Branded tracking pages hosted inside the merchant website',
  'Human-readable shipment statuses and delivery timelines',
  'Map-style progress views that make delivery feel tangible',
  'Support assistant actions for common post-purchase questions',
  'Contextual upsells while the parcel is still editable',
];

export const features = [
  {
    icon: Store,
    title: 'Branded tracking pages',
    description: 'Replace external carrier pages with a polished experience that looks and feels like your store.',
  },
  {
    icon: Clock3,
    title: 'Human-readable delivery updates',
    description: 'Translate logistics events into clear customer-facing statuses, timelines, and next steps.',
  },
  {
    icon: Route,
    title: 'Embedded order timeline',
    description: 'Show shipment progress from preparation to delivery in a structured, reassuring flow.',
  },
  {
    icon: ShoppingBag,
    title: '“Complete your parcel” upsells',
    description: 'Let customers add complementary products before the parcel leaves the warehouse.',
  },
  {
    icon: Bot,
    title: 'AI post-purchase assistant',
    description: 'Answer delivery questions in context with shipment details, order status, and support actions.',
  },
  {
    icon: ShieldCheck,
    title: 'Support ticket reduction',
    description: 'Deflect repetitive WISMO questions with clear tracking, proactive messages, and guided help.',
  },
  {
    icon: BarChart3,
    title: 'Carrier performance insights',
    description: 'Understand delivery friction, late shipments, and customer impact across carrier flows.',
  },
  {
    icon: Boxes,
    title: 'Shopify-ready architecture',
    description: 'Designed for e-commerce stacks where order, shipment, and customer moments need to connect.',
  },
];

export const upsellProducts = [
  { name: 'Socks', price: '$12', icon: Sparkles },
  { name: 'Cleaning kit', price: '$18', icon: PackageCheck },
  { name: 'Premium laces', price: '$9', icon: Route },
  { name: 'Comfort insoles', price: '$24', icon: ShieldCheck },
];

export const steps = [
  {
    label: 'Step 1',
    title: 'Connect your store',
    description: 'Orders and shipment data are synced from the merchant’s e-commerce stack.',
  },
  {
    label: 'Step 2',
    title: 'Replace carrier tracking links',
    description: 'Customers track their order inside the branded website experience.',
  },
  {
    label: 'Step 3',
    title: 'Engage before delivery',
    description: 'Show smart updates, support actions, and contextual upsells before shipment.',
  },
];

export const metrics = [
  {
    value: '-30%',
    label: 'support tickets',
    description: 'Reduce repetitive delivery questions with clearer self-serve tracking.',
  },
  {
    value: '+12%',
    label: 'post-purchase revenue',
    description: 'Create a new surface for contextual add-ons before shipment.',
  },
  {
    value: 'Higher',
    label: 'customer trust',
    description: 'Keep customers informed in a branded, predictable post-purchase flow.',
  },
  {
    value: 'Better',
    label: 'carrier visibility',
    description: 'Spot delays and friction before they become support escalations.',
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    description: 'For teams validating branded tracking.',
    price: 'Coming soon',
    features: ['Branded tracking page', 'Basic shipment timeline', 'Manual setup'],
  },
  {
    name: 'Growth',
    description: 'For brands turning post-purchase into a channel.',
    price: 'Coming soon',
    featured: true,
    features: ['Smart upsells', 'Support assistant', 'Analytics'],
  },
  {
    name: 'Pro',
    description: 'For mature operations with multiple markets.',
    price: 'Coming soon',
    features: ['Multi-carrier insights', 'Advanced customization', 'Priority support'],
  },
];

export const faqs = [
  {
    question: 'Does this replace carrier tracking?',
    answer:
      'It replaces the customer-facing carrier tracking link with a branded page on the merchant website. Carrier data can still power the experience behind the scenes.',
  },
  {
    question: 'Can it work with Shopify?',
    answer:
      'The product is designed around e-commerce order and shipment flows, including Shopify-ready architecture. A real Shopify integration is not implemented in this PoC yet.',
  },
  {
    question: 'Do customers stay on my website?',
    answer:
      'Yes. The core idea is to keep the tracking journey inside the merchant website after checkout instead of sending customers to external carrier pages.',
  },
  {
    question: 'Can customers add products before shipment?',
    answer:
      'Yes. The “Complete your parcel” flow demonstrates how customers could add relevant products before the warehouse hands the parcel to a carrier.',
  },
  {
    question: 'Do I need real carrier APIs for the demo?',
    answer:
      'No. The current demo uses generated parcel scenarios, mock tracking events, and a branded tracking page to show the product experience.',
  },
  {
    question: 'Is the AI assistant required?',
    answer:
      'No. The assistant is an optional post-purchase support layer. The branded tracking page and delivery timeline remain useful on their own.',
  },
];
