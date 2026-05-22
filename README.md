# Fake Parcel Tracking Generator

Full-stack MVP for generating fake parcel tracking numbers and fake tracking timelines with Vite, React, TypeScript, and Supabase.

## Install

```bash
npm install
```

## Environment

Create a Supabase project and copy your browser credentials:

1. Go to the Supabase Dashboard.
2. Open your project.
3. Go to **Project Settings**.
4. Go to **API**.
5. Copy **Project URL**.
6. Copy the **anon public** key.

Create `.env.local` at the root of this project:

```bash
cp .env.example .env.local
```

Set the values:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then restart the Vite dev server:

```bash
npm run dev
```

## Supabase SQL Setup

Create a Supabase project, open the Supabase dashboard, then go to **SQL Editor** and paste the SQL from:

```text
supabase/migrations/001_create_shipments_and_tracking_events.sql
```

Run the query once. It creates:

- `shipments`
- `tracking_events`
- a cascading foreign key from `tracking_events.shipment_id` to `shipments.id`
- indexes for `tracking_number`, event lookup, and timeline ordering

This MVP does not add authentication yet. For local PoC usage, make sure your Supabase table policies allow the anon key to insert and read these two tables, or keep RLS disabled while testing in a private development project.

## Run Locally

```bash
npm run dev
```

Open the local Vite URL, usually:

```text
http://localhost:5173
```

Routes:

- `/` redirects to `/generator`
- `/generator` creates fake shipments and events
- `/track/:trackingNumber` displays shipment details and timeline

## Fake Data Rules

The fake data helpers live in `src/lib/fakeTracking.ts`:

- `generateTrackingNumber(carrier)`
- `generateTrackingEvents(scenario, carrier)`
- `getShipmentStatusFromScenario(scenario)`
- `getHumanReadableMessage(status, scenario)`

Supported carriers:

- Colissimo
- Chronopost
- Mondial Relay
- DHL
- UPS

Supported scenarios:

- normal
- delayed
- blocked
- delivered
- failed

## Next Steps For Shopify Later

- Add a backend function or API route for creating test shipments from Shopify order data.
- Store Shopify order IDs and fulfillment IDs on `shipments`.
- Add carrier mapping from Shopify shipping lines to internal carrier values.
- Add webhooks for `orders/create` and `fulfillments/create`.
- Add authentication before exposing the generator beyond internal users.
- Replace fake tracking generation with real carrier API integrations when ready.
