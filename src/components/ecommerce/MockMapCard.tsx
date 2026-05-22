import { MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFrenchTrackingBadge } from '@/lib/status';
import type { Shipment } from '@/types/tracking';

type MockMapCardProps = {
  shipment: Shipment;
};

export default function MockMapCard({ shipment }: MockMapCardProps) {
  return (
    <Card className="rounded-2xl border-violet-100 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Suivi en temps réel</CardTitle>
            <CardDescription>Votre colis n’a pas encore quitté notre entrepôt.</CardDescription>
          </div>
          <Badge className="bg-violet-50 text-violet-700" variant="secondary">
            {getFrenchTrackingBadge(shipment.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-slate-600">
          Dès que le transporteur scannera votre colis, sa position estimée apparaîtra ici. Les données ci-dessous sont une prévisualisation.
        </p>
        <div className="relative h-64 overflow-hidden rounded-2xl border border-violet-100 bg-[linear-gradient(135deg,#f5f3ff_0%,#ffffff_42%,#ede9fe_100%)]">
          <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#ddd6fe_1px,transparent_1px),linear-gradient(90deg,#ddd6fe_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="absolute left-6 top-10 h-20 w-44 rounded-full border border-violet-200" />
          <div className="absolute bottom-8 right-5 h-24 w-52 rounded-full border border-violet-200" />
          <div className="absolute left-10 right-8 top-1/2 h-1 -rotate-6 rounded-full bg-violet-200" />
          <div className="absolute left-[48%] top-[42%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid place-items-center">
              <span className="absolute size-12 rounded-full bg-violet-500/15" />
              <span className="grid size-9 place-items-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-300">
                <MapPin className="size-5" />
              </span>
            </div>
          </div>
          <div className="absolute left-[calc(48%+1.5rem)] top-[calc(42%-0.75rem)] rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-md">
            Entrepôt de Lyon
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
