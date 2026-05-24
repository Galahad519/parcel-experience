import { Card, CardContent } from '@/components/ui/card';
import { steps } from '@/data/landing';

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-violet-700">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Replace a carrier handoff with a branded journey in three steps.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm ring-slate-200" key={step.title}>
              <CardContent className="p-6">
                <span className="text-sm font-semibold text-violet-700">{step.label}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
