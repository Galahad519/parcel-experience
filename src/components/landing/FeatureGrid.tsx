import { Card, CardContent } from '@/components/ui/card';
import { features } from '@/data/landing';

export default function FeatureGrid() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="features">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-violet-700">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Everything a modern brand needs after checkout.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Built around the customer’s real question: what is happening with my order, and what can I do next?
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm ring-slate-200" key={feature.title}>
              <CardContent className="p-5">
                <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
