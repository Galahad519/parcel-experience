import { Card, CardContent } from '@/components/ui/card';
import { problemCards } from '@/data/landing';

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-violet-700">The current problem</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            The tracking link is one of the most visited post-purchase moments, but brands give it away.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemCards.map((item) => (
            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm ring-slate-200" key={item.title}>
              <CardContent className="p-5">
                <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-slate-100 text-violet-700">
                  <item.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
