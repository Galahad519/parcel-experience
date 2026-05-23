# Générateur de suivi colis

MVP full-stack pour générer des numéros de suivi colis et des timelines de suivi de démonstration avec Vite, React, TypeScript et Supabase.

## Install

```bash
pnpm install
```

## Prérequis pnpm

Ce projet utilise pnpm. N’utilisez pas `npm install`. Le script `preinstall` bloque les installations npm/yarn afin d’éviter les conflits de lockfile.

Activez pnpm avec Corepack si nécessaire :

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Ou installez pnpm globalement :

```bash
npm install -g pnpm
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
pnpm dev
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
pnpm dev
```

Build et prévisualisation :

```bash
pnpm build
pnpm preview
```

Open the local Vite URL, usually:

```text
http://localhost:5173
```

Routes:

- `/` redirects to `/generator`
- `/generator` creates fake shipments and events
- `/track/:trackingNumber` displays shipment details and timeline

## AI Assistant Setup

The tracking page includes a contextual assistant UI. The browser never receives an OpenAI key. AI calls go through the Supabase Edge Function at:

```text
supabase/functions/tracking-assistant/index.ts
```

The frontend continues to use only:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not add `OPENAI_API_KEY` to any `VITE_` environment variable.

Set the OpenAI key as a Supabase secret:

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key
```

Optionally set a model override:

```bash
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

Run the function locally with the Supabase CLI:

```bash
supabase functions serve tracking-assistant --env-file .env.local
```

For local Edge Function testing, `.env.local` may contain `OPENAI_API_KEY`, but it must stay server-side and must not use the `VITE_` prefix.

Deploy the function:

```bash
supabase functions deploy tracking-assistant
```

The chat UI falls back to deterministic local responses when the Edge Function is unavailable or `OPENAI_API_KEY` is missing, so local UI development still works without AI configuration.

Pour ajouter des composants shadcn/ui :

```bash
pnpm dlx shadcn@latest add button card badge input select separator progress alert dialog sheet tabs table
```

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
