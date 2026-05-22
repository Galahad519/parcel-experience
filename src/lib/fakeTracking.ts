import type { Carrier, NewTrackingEvent, Scenario, ShipmentStatus } from '../types/tracking';

const carrierPrefixes: Record<Carrier, string> = {
  Colissimo: 'COL',
  Chronopost: 'CHR',
  'Mondial Relay': 'MR',
  DHL: 'DHL',
  UPS: 'UPS',
};

const locationsByCarrier: Record<Carrier, string[]> = {
  Colissimo: ['Paris Hub', 'Orleans Sorting Center', 'Lyon Depot'],
  Chronopost: ['Roissy Hub', 'Tours Agency', 'Marseille Depot'],
  'Mondial Relay': ['Lille Hub', 'Nantes Relay Center', 'Bordeaux Locker'],
  DHL: ['Leipzig Hub', 'Paris Gateway', 'Nice Service Point'],
  UPS: ['Koeln Hub', 'Chilly-Mazarin Facility', 'Toulouse Depot'],
};

const scenarioEvents: Record<
  Scenario,
  Array<Pick<NewTrackingEvent, 'title' | 'description' | 'status'>>
> = {
  normal: [
    { title: 'Order confirmed', description: 'The shipment has been created.', status: 'confirmed' },
    { title: 'Parcel prepared', description: 'The parcel is packed and ready for pickup.', status: 'prepared' },
    { title: 'Parcel handed to carrier', description: 'The carrier has received the parcel.', status: 'in_transit' },
    { title: 'Arrived at sorting center', description: 'The parcel has reached a regional sorting facility.', status: 'in_transit' },
    { title: 'Departed sorting center', description: 'The parcel left the facility for the destination depot.', status: 'in_transit' },
    { title: 'Out for delivery', description: 'The parcel is on its way to the recipient.', status: 'out_for_delivery' },
  ],
  delayed: [
    { title: 'Order confirmed', description: 'The shipment has been created.', status: 'confirmed' },
    { title: 'Parcel prepared', description: 'The parcel is packed and ready for pickup.', status: 'prepared' },
    { title: 'In transit', description: 'The parcel is moving through the carrier network.', status: 'in_transit' },
    { title: 'Arrived at sorting center', description: 'The parcel is waiting for the next carrier scan.', status: 'in_transit' },
    { title: 'Delay detected', description: 'Carrier processing is taking longer than expected at the sorting center.', status: 'delayed' },
    { title: 'New delivery estimate', description: 'A revised delivery date has been calculated.', status: 'delayed' },
  ],
  blocked: [
    { title: 'Order confirmed', description: 'The shipment has been created.', status: 'confirmed' },
    { title: 'Parcel handed to carrier', description: 'The carrier has received the parcel.', status: 'in_transit' },
    { title: 'Arrived at hub', description: 'The parcel was scanned at a carrier hub.', status: 'in_transit' },
    { title: 'No movement detected for 48h', description: 'The parcel has not received a recent scan and may need investigation.', status: 'blocked' },
  ],
  delivered: [
    { title: 'Order confirmed', description: 'The shipment has been created.', status: 'confirmed' },
    { title: 'Parcel prepared', description: 'The parcel is packed and ready for pickup.', status: 'prepared' },
    { title: 'In transit', description: 'The parcel is moving through the carrier network.', status: 'in_transit' },
    { title: 'Arrived at destination depot', description: 'The parcel reached the final delivery depot.', status: 'in_transit' },
    { title: 'Out for delivery', description: 'The parcel is on its way to the recipient.', status: 'out_for_delivery' },
    { title: 'Delivered', description: 'The parcel was delivered successfully.', status: 'delivered' },
  ],
  failed: [
    { title: 'Order confirmed', description: 'The shipment has been created.', status: 'confirmed' },
    { title: 'Parcel prepared', description: 'The parcel is packed and ready for pickup.', status: 'prepared' },
    { title: 'Arrived at destination depot', description: 'The parcel reached the final delivery depot.', status: 'in_transit' },
    { title: 'Out for delivery', description: 'The parcel is on its way to the recipient.', status: 'out_for_delivery' },
    { title: 'Delivery attempt failed', description: 'The carrier could not complete delivery.', status: 'failed' },
    { title: 'Action required', description: 'The recipient should contact the carrier or update delivery details.', status: 'failed' },
  ],
};

export function generateTrackingNumber(carrier: Carrier) {
  const number = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return `${carrierPrefixes[carrier]}-${number}`;
}

export function generateTrackingEvents(scenario: Scenario, carrier: Carrier): NewTrackingEvent[] {
  const now = new Date();
  const locations = locationsByCarrier[carrier];
  const eventTemplates = scenarioEvents[scenario];

  return eventTemplates.map((event, index) => {
    const eventDate = new Date(now);
    const hoursAgo = scenario === 'blocked' ? 72 - index * 8 : (eventTemplates.length - index - 1) * 10;
    eventDate.setHours(now.getHours() - Math.max(hoursAgo, 0));

    return {
      ...event,
      location: locations[index % locations.length],
      event_date: eventDate.toISOString(),
    };
  });
}

export function getShipmentStatusFromScenario(scenario: Scenario): ShipmentStatus {
  const statusByScenario: Record<Scenario, ShipmentStatus> = {
    normal: 'out_for_delivery',
    delayed: 'delayed',
    blocked: 'blocked',
    delivered: 'delivered',
    failed: 'failed',
  };

  return statusByScenario[scenario];
}

export function getHumanReadableMessage(status: ShipmentStatus, scenario: Scenario) {
  if (status === 'delivered') {
    return 'This parcel has been delivered successfully.';
  }

  if (status === 'failed') {
    return 'Delivery could not be completed. The recipient may need to take action.';
  }

  if (scenario === 'blocked') {
    return 'This parcel appears blocked because no recent carrier movement was detected.';
  }

  if (scenario === 'delayed') {
    return 'This parcel is delayed, and the estimated delivery date has been adjusted.';
  }

  if (status === 'out_for_delivery') {
    return 'This parcel is currently out for delivery.';
  }

  return 'This parcel is moving through the carrier network.';
}

export function getEstimatedDeliveryDate(scenario: Scenario) {
  const date = new Date();
  const offsets: Record<Scenario, number> = {
    normal: 1,
    delayed: 3,
    blocked: 5,
    delivered: -1,
    failed: 2,
  };

  date.setDate(date.getDate() + offsets[scenario]);
  return date.toISOString();
}
