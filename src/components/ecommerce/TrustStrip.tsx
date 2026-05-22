import { CreditCard, Headphones, PackageCheck, RotateCcw } from 'lucide-react';

const items = [
  { label: 'Livraison offerte', icon: PackageCheck },
  { label: 'Retours sous 30 jours', icon: RotateCcw },
  { label: 'Paiement sécurisé', icon: CreditCard },
  { label: 'Service client 7j/7', icon: Headphones },
];

export default function TrustStrip() {
  return (
    <section className="grid gap-3 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, icon: Icon }) => (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="grid size-9 place-items-center rounded-full bg-violet-100 text-violet-700">
            <Icon className="size-4" />
          </span>
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>
      ))}
    </section>
  );
}
