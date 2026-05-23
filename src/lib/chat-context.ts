import { completeParcelProducts, orderedProducts } from '@/data/mockProducts';
import { getFrenchDeliveryEstimate, getFrenchShipmentSubtitle, getFrenchShipmentTitle, statusLabels } from '@/lib/status';
import type { Shipment, TrackingEvent } from '@/types/tracking';

export type AssistantRole = 'user' | 'assistant';

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
};

export type ShipmentAssistantContext = {
  tracking_number: string;
  carrier: string;
  order_number: string | null;
  customer_name: string | null;
  status: string;
  status_label: string;
  scenario: string;
  estimated_delivery: string | null;
  title: string;
  subtitle: string;
  delivery_estimate_label: string;
  can_complete_parcel: boolean;
  tracking_events: Array<{
    title: string;
    description: string | null;
    location: string | null;
    status: string;
    event_date: string;
  }>;
  ordered_products: Array<{
    name: string;
    meta: string;
    price: string;
    quantity: number | null;
  }>;
  upsell_products: Array<{
    name: string;
    meta: string;
    price: string;
  }>;
};

export function canCompleteParcel(shipment: Shipment) {
  return shipment.status === 'confirmed' || shipment.status === 'prepared';
}

export function buildShipmentAssistantContext(
  shipment: Shipment,
  events: TrackingEvent[],
): ShipmentAssistantContext {
  return {
    tracking_number: shipment.tracking_number,
    carrier: shipment.carrier,
    order_number: shipment.order_number,
    customer_name: shipment.customer_name,
    status: shipment.status,
    status_label: statusLabels[shipment.status],
    scenario: shipment.scenario,
    estimated_delivery: shipment.estimated_delivery,
    title: getFrenchShipmentTitle(shipment.status, shipment.scenario),
    subtitle: getFrenchShipmentSubtitle(shipment.status, shipment.scenario),
    delivery_estimate_label: getFrenchDeliveryEstimate(shipment.status),
    can_complete_parcel: canCompleteParcel(shipment),
    tracking_events: events.map((event) => ({
      title: event.title,
      description: event.description,
      location: event.location,
      status: event.status,
      event_date: event.event_date,
    })),
    ordered_products: orderedProducts.map((product) => ({
      name: product.name,
      meta: product.meta,
      price: product.price,
      quantity: product.quantity ?? null,
    })),
    upsell_products: completeParcelProducts.map((product) => ({
      name: product.name,
      meta: product.meta,
      price: product.price,
    })),
  };
}

export function stringifyShipmentAssistantContext(context: ShipmentAssistantContext) {
  return JSON.stringify(context);
}
