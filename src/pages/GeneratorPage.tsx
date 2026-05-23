import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShipmentGeneratorForm from '@/components/generator/ShipmentGeneratorForm';
import {
  generateTrackingEvents,
  generateTrackingNumber,
  getEstimatedDeliveryDate,
  getShipmentStatusFromScenario,
} from '../lib/fakeTracking';
import { supabase, supabaseConfigError } from '../lib/supabase';
import type { Carrier, Scenario, Shipment } from '../types/tracking';

const carriers: Carrier[] = ['Colissimo', 'Chronopost', 'Mondial Relay', 'DHL', 'UPS'];
const scenarios: Scenario[] = ['normal', 'delayed', 'blocked', 'delivered', 'failed'];

export default function GeneratorPage() {
  const navigate = useNavigate();
  const [carrier, setCarrier] = useState<Carrier>('Colissimo');
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [customerName, setCustomerName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase n’est pas disponible.');
      setIsSubmitting(false);
      return;
    }

    const trackingNumber = generateTrackingNumber(carrier);
    const status = getShipmentStatusFromScenario(scenario);

    try {
      const { data: shipment, error: shipmentError } = await supabase
        .from('shipments')
        .insert({
          tracking_number: trackingNumber,
          carrier,
          customer_name: customerName.trim() || null,
          order_number: orderNumber.trim() || null,
          status,
          scenario,
          estimated_delivery: getEstimatedDeliveryDate(scenario),
        })
        .select()
        .single();

      if (shipmentError || !shipment) {
        setError(shipmentError?.message ?? 'Impossible de créer le colis.');
        setIsSubmitting(false);
        return;
      }

      const createdShipment = shipment as Shipment;
      const trackingEvents = generateTrackingEvents(scenario, carrier).map((trackingEvent) => ({
        ...trackingEvent,
        shipment_id: createdShipment.id,
      }));

      const { error: eventsError } = await supabase.from('tracking_events').insert(trackingEvents);

      if (eventsError) {
        setError(eventsError.message);
        await supabase.from('shipments').delete().eq('id', createdShipment.id);
        setIsSubmitting(false);
        return;
      }

      navigate(`/track/${trackingNumber}`);
    } catch {
      setError('Impossible de se connecter à Supabase. Vérifiez vos variables d’environnement et les paramètres du projet.');
      setIsSubmitting(false);
    }
  }

  return (
    <ShipmentGeneratorForm
      carrier={carrier}
      carriers={carriers}
      customerName={customerName}
      error={error}
      isSubmitting={isSubmitting}
      onCarrierChange={setCarrier}
      onCustomerNameChange={setCustomerName}
      onOrderNumberChange={setOrderNumber}
      onScenarioChange={setScenario}
      onSubmit={handleSubmit}
      orderNumber={orderNumber}
      scenario={scenario}
      scenarios={scenarios}
      setupError={supabaseConfigError}
    />
  );
}
