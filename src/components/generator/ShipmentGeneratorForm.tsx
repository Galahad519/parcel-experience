import { FormEvent } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { scenarioLabels } from '@/lib/status';
import type { Carrier, Scenario } from '@/types/tracking';

type ShipmentGeneratorFormProps = {
  carriers: Carrier[];
  scenarios: Scenario[];
  carrier: Carrier;
  scenario: Scenario;
  customerName: string;
  orderNumber: string;
  isSubmitting: boolean;
  error: string | null;
  setupError?: string | null;
  onCarrierChange: (carrier: Carrier) => void;
  onScenarioChange: (scenario: Scenario) => void;
  onCustomerNameChange: (value: string) => void;
  onOrderNumberChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ShipmentGeneratorForm({
  carriers,
  scenarios,
  carrier,
  scenario,
  customerName,
  orderNumber,
  isSubmitting,
  error,
  setupError,
  onCarrierChange,
  onScenarioChange,
  onCustomerNameChange,
  onOrderNumberChange,
  onSubmit,
}: ShipmentGeneratorFormProps) {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Créer un colis de démonstration</CardTitle>
        <CardDescription>Générez un numéro de suivi de test et une timeline transporteur dans Supabase.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="carrier">Transporteur</Label>
            <Select value={carrier} onValueChange={(value) => onCarrierChange(value as Carrier)}>
              <SelectTrigger className="w-full" id="carrier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {carriers.map((carrierOption) => (
                  <SelectItem key={carrierOption} value={carrierOption}>
                    {carrierOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="scenario">Scénario</Label>
            <Select value={scenario} onValueChange={(value) => onScenarioChange(value as Scenario)}>
              <SelectTrigger className="w-full" id="scenario">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((scenarioOption) => (
                  <SelectItem key={scenarioOption} value={scenarioOption}>
                    {scenarioLabels[scenarioOption]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="customerName">Nom du client</Label>
            <Input
              id="customerName"
              onChange={(event) => onCustomerNameChange(event.target.value)}
              placeholder="Jane Doe"
              type="text"
              value={customerName}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="orderNumber">Numéro de commande</Label>
            <Input
              id="orderNumber"
              onChange={(event) => onOrderNumberChange(event.target.value)}
              placeholder="ORDER-1001"
              type="text"
              value={orderNumber}
            />
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Impossible de générer le colis</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {setupError ? (
            <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
              <AlertTitle>Configuration Supabase requise</AlertTitle>
              <AlertDescription className="text-amber-800 dark:text-amber-200">{setupError}</AlertDescription>
            </Alert>
          ) : null}

          {isSubmitting ? (
            <div className="grid gap-2" aria-hidden="true">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : null}

          <Button className="w-fit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Génération en cours…' : 'Générer un colis'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
