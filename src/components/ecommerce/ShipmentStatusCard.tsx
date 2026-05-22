import { Gift } from 'lucide-react';

import OrderProgress from '@/components/ecommerce/OrderProgress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFrenchDeliveryEstimate, getFrenchShipmentSubtitle, getFrenchShipmentTitle, getOrderStepIndex } from '@/lib/status';
import type { Shipment } from '@/types/tracking';

type ShipmentStatusCardProps = {
  shipment: Shipment;
};

export default function ShipmentStatusCard({ shipment }: ShipmentStatusCardProps) {
  return (
    <Card className="rounded-3xl border-violet-100 bg-white shadow-sm shadow-violet-100/60">
      <CardHeader className="gap-3">
        <div>
          <CardTitle className="text-2xl text-slate-950">{getFrenchShipmentTitle(shipment.status, shipment.scenario)}</CardTitle>
          <CardDescription className="mt-2 text-base">{getFrenchShipmentSubtitle(shipment.status, shipment.scenario)}</CardDescription>
        </div>
        <div className="w-fit rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">{getFrenchDeliveryEstimate(shipment.status)}</div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <OrderProgress currentStep={getOrderStepIndex(shipment.status)} />
        <Alert className="border-violet-200 bg-violet-50 text-violet-950">
          <Gift className="size-4" />
          <AlertTitle>Bon à savoir : vous pouvez encore ajouter des articles à votre colis</AlertTitle>
          <AlertDescription className="text-violet-800">
            Tant que votre commande n’a pas été expédiée, ajoutez des produits sans frais de livraison supplémentaires.
          </AlertDescription>
          <div className="mt-3">
            <Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700" size="sm">
              Compléter mon colis
            </Button>
          </div>
        </Alert>
      </CardContent>
    </Card>
  );
}
