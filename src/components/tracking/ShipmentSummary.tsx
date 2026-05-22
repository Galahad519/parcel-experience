import { Link } from 'react-router-dom';

import StatusBadge from '@/components/tracking/StatusBadge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getHumanReadableMessage } from '@/lib/fakeTracking';
import { getStatusProgress } from '@/lib/status';
import type { Shipment } from '@/types/tracking';

type ShipmentSummaryProps = {
  shipment: Shipment;
  formatDate: (value: string | null) => string;
};

export default function ShipmentSummary({ shipment, formatDate }: ShipmentSummaryProps) {
  const summaryRows = [
    { label: 'Carrier', value: shipment.carrier },
    { label: 'Estimated delivery', value: formatDate(shipment.estimated_delivery) },
    { label: 'Order number', value: shipment.order_number || 'Not provided' },
    { label: 'Customer name', value: shipment.customer_name || 'Not provided' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardDescription>Tracking number</CardDescription>
        <CardTitle className="break-all font-mono text-xl">{shipment.tracking_number}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={shipment.status} />
          <span className="text-sm text-muted-foreground">{getStatusProgress(shipment.status)}% complete</span>
        </div>

        <Progress value={getStatusProgress(shipment.status)} />

        <Separator />

        <dl className="grid gap-4 sm:grid-cols-2">
          {summaryRows.map((row) => (
            <div className="grid gap-1" key={row.label}>
              <dt className="text-xs font-medium uppercase tracking-normal text-muted-foreground">{row.label}</dt>
              <dd className="text-sm font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Alert>
          <AlertDescription>{getHumanReadableMessage(shipment.status, shipment.scenario)}</AlertDescription>
        </Alert>

        <Button className="w-fit" render={<Link to="/generator" />}>
          Generate another shipment
        </Button>
      </CardContent>
    </Card>
  );
}
