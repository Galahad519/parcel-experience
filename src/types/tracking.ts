export type Carrier = 'Colissimo' | 'Chronopost' | 'Mondial Relay' | 'DHL' | 'UPS';

export type Scenario = 'normal' | 'delayed' | 'blocked' | 'delivered' | 'failed';

export type ShipmentStatus =
  | 'confirmed'
  | 'prepared'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delayed'
  | 'blocked'
  | 'delivered'
  | 'failed';

export type Shipment = {
  id: string;
  tracking_number: string;
  carrier: Carrier;
  customer_name: string | null;
  order_number: string | null;
  status: ShipmentStatus;
  estimated_delivery: string | null;
  scenario: Scenario;
  created_at: string;
};

export type TrackingEvent = {
  id: string;
  shipment_id: string;
  title: string;
  description: string | null;
  location: string | null;
  status: ShipmentStatus;
  event_date: string;
  created_at: string;
};

export type NewTrackingEvent = Omit<TrackingEvent, 'id' | 'shipment_id' | 'created_at'>;
