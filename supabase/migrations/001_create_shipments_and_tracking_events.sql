create extension if not exists "pgcrypto";

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_number text unique not null,
  carrier text not null,
  customer_name text,
  order_number text,
  status text not null,
  estimated_delivery timestamptz,
  scenario text not null,
  created_at timestamptz default now()
);

create table if not exists public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  title text not null,
  description text,
  location text,
  status text not null,
  event_date timestamptz not null,
  created_at timestamptz default now()
);

create index if not exists shipments_tracking_number_idx
  on public.shipments(tracking_number);

create index if not exists tracking_events_shipment_id_idx
  on public.tracking_events(shipment_id);

create index if not exists tracking_events_event_date_idx
  on public.tracking_events(event_date);
