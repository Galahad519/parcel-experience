import StatusBadge from '@/components/tracking/StatusBadge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TrackingEvent } from '@/types/tracking';

type TrackingTimelineProps = {
  events: TrackingEvent[];
  formatDate: (value: string | null) => string;
};

export default function TrackingTimeline({ events, formatDate }: TrackingTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking events</CardTitle>
        <CardDescription>Carrier scans generated for this shipment.</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <Alert>
            <AlertTitle>No tracking events</AlertTitle>
            <AlertDescription>No tracking events have been created for this shipment yet.</AlertDescription>
          </Alert>
        ) : (
          <ol className="grid gap-0">
            {events.map((event, index) => (
              <li className="grid grid-cols-[1rem_1fr] gap-3" key={event.id}>
                <div className="flex flex-col items-center pt-1">
                  <span className="size-2.5 rounded-full bg-primary" />
                  {index < events.length - 1 ? <span className="mt-2 w-px flex-1 bg-border" /> : null}
                </div>
                <div className="pb-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      {event.description ? <p className="mt-1 text-sm text-muted-foreground">{event.description}</p> : null}
                    </div>
                    <StatusBadge className="shrink-0" status={event.status} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {event.location || 'Unknown location'} · {formatDate(event.event_date)}
                  </p>
                  {index < events.length - 1 ? <Separator className="mt-4" /> : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
