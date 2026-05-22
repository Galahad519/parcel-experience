import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Shipment } from '@/types/tracking';

type OrderHeroProps = {
  shipment: Shipment;
  formatDate: (value: string | null) => string;
};

export default function OrderHero({ shipment, formatDate }: OrderHeroProps) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-medium text-violet-700">Suivi de commande</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">
          Ma commande #{shipment.order_number || shipment.tracking_number}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Commande passée le {formatDate(shipment.created_at)}</p>
      </div>
      <Button className="w-fit rounded-full border-violet-200 text-violet-700 hover:bg-violet-50" variant="outline">
        <FileText className="size-4" />
        Voir la facture
      </Button>
    </section>
  );
}
