import StatusBadge from '@/components/tracking/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TrackingEvent } from '@/types/tracking';

type TrackingDetailsProps = {
  events: TrackingEvent[];
  formatDate: (value: string | null) => string;
};

export default function TrackingDetails({ events, formatDate }: TrackingDetailsProps) {
  const visibleEvents = events.slice().reverse().slice(0, 5);

  return (
    <Card className="rounded-2xl border-violet-100 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Suivi de livraison</CardTitle>
        <CardDescription>Les derniers événements remontés par le transporteur.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {visibleEvents.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Aucun événement de suivi n’est disponible pour le moment.</p>
        ) : (
          <ol className="grid gap-0">
            {visibleEvents.map((event, index) => (
              <li className="grid grid-cols-[1rem_1fr] gap-3" key={event.id}>
                <div className="flex flex-col items-center pt-1.5">
                  <span className="size-2.5 rounded-full bg-violet-600 ring-4 ring-violet-100" />
                  {index < visibleEvents.length - 1 ? <span className="mt-3 w-px flex-1 bg-violet-100" /> : null}
                </div>
                <div className="pb-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">{event.title}</h3>
                      {event.description ? <p className="mt-1 text-sm text-slate-600">{event.description}</p> : null}
                    </div>
                    <StatusBadge className="shrink-0" status={event.status} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {event.location || 'Localisation inconnue'} · {formatDate(event.event_date)}
                  </p>
                  {index < visibleEvents.length - 1 ? <Separator className="mt-4 bg-violet-50" /> : null}
                </div>
              </li>
            ))}
          </ol>
        )}
        <Button className="w-fit rounded-full border-violet-200 text-violet-700 hover:bg-violet-50" variant="outline">
          Voir tous les détails
        </Button>
      </CardContent>
    </Card>
  );
}
