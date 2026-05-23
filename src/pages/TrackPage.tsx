import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import TrackingAssistant from '@/components/chat/TrackingAssistant';
import AccountSidebar from '@/components/ecommerce/AccountSidebar';
import CompleteParcelUpsell from '@/components/ecommerce/CompleteParcelUpsell';
import EcommerceHeader from '@/components/ecommerce/EcommerceHeader';
import MockMapCard from '@/components/ecommerce/MockMapCard';
import OrderedProducts from '@/components/ecommerce/OrderedProducts';
import OrderHero from '@/components/ecommerce/OrderHero';
import RecommendedProducts from '@/components/ecommerce/RecommendedProducts';
import ShipmentStatusCard from '@/components/ecommerce/ShipmentStatusCard';
import TrackingDetails from '@/components/ecommerce/TrackingDetails';
import TrustStrip from '@/components/ecommerce/TrustStrip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase, supabaseConfigError } from '@/lib/supabase';
import type { Shipment, TrackingEvent } from '@/types/tracking';

function formatDate(value: string | null) {
  if (!value) {
    return 'Aucune estimation';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function TrackPage() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrackingDetails() {
      if (!trackingNumber) {
        setError('Numéro de suivi manquant.');
        setIsLoading(false);
        return;
      }

      if (!supabase) {
        setError(supabaseConfigError ?? 'Supabase n’est pas disponible.');
        setIsLoading(false);
        return;
      }

      try {
        const { data: shipmentData, error: shipmentError } = await supabase
          .from('shipments')
          .select()
          .eq('tracking_number', trackingNumber)
          .single();

        if (shipmentError || !shipmentData) {
          setError(shipmentError?.message ?? 'Colis introuvable.');
          setIsLoading(false);
          return;
        }

        const shipment = shipmentData as Shipment;
        const { data: eventData, error: eventsError } = await supabase
          .from('tracking_events')
          .select()
          .eq('shipment_id', shipment.id)
          .order('event_date', { ascending: true });

        if (eventsError) {
          setError(eventsError.message);
          setIsLoading(false);
          return;
        }

        setShipment(shipment);
        setEvents((eventData ?? []) as TrackingEvent[]);
        setIsLoading(false);
      } catch {
        setError('Impossible de se connecter à Supabase. Vérifiez vos variables d’environnement et les paramètres du projet.');
        setIsLoading(false);
      }
    }

    fetchTrackingDetails();
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <EcommerceHeader />
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <AccountSidebar />
          <main className="grid min-w-0 flex-1 gap-5">
            <Skeleton className="h-24 rounded-3xl" />
            <Skeleton className="h-72 rounded-3xl" />
            <div className="grid gap-5 xl:grid-cols-2">
              <Skeleton className="h-96 rounded-3xl" />
              <Skeleton className="h-96 rounded-3xl" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen bg-slate-50">
        <EcommerceHeader />
        <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="rounded-3xl border-violet-100 bg-white shadow-sm">
            <CardContent className="grid gap-4 p-6">
              <Alert variant="destructive">
                <AlertTitle>Commande introuvable</AlertTitle>
                <AlertDescription>{error ?? 'Aucune commande ne correspond à ce numéro de suivi.'}</AlertDescription>
              </Alert>
              {supabaseConfigError ? (
                <Alert className="border-amber-200 bg-amber-50 text-amber-900">
                  <AlertTitle>Configuration Supabase requise</AlertTitle>
                  <AlertDescription className="text-amber-800">{supabaseConfigError}</AlertDescription>
                </Alert>
              ) : null}
              <Button className="w-fit rounded-full bg-violet-600 text-white hover:bg-violet-700" render={<Link to="/generator" />}>
                Générer une autre commande
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <EcommerceHeader />
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <AccountSidebar />
        <main className="grid min-w-0 flex-1 gap-6">
          <OrderHero formatDate={formatDate} shipment={shipment} />
          <ShipmentStatusCard shipment={shipment} />
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <TrackingDetails events={events} formatDate={formatDate} />
            <div className="grid gap-6">
              <MockMapCard shipment={shipment} />
              <Card className="rounded-2xl border-violet-100 bg-white shadow-sm">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700">
                      <MessageCircle className="size-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-slate-950">Besoin d’aide ?</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        L’assistant peut expliquer le statut de votre colis et les options disponibles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          <OrderedProducts />
          <CompleteParcelUpsell />
          <RecommendedProducts />
          <TrustStrip />
        </main>
      </div>
      <TrackingAssistant events={events} shipment={shipment} />
    </div>
  );
}
