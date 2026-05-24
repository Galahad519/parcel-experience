import { Card, CardContent } from '@/components/ui/card';
import { metrics } from '@/data/landing';

export default function MerchantValueSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-violet-700">Merchant value</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Post-purchase is an operational cost center until it becomes a customer channel.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            Parcel Experience helps teams reduce WISMO tickets, increase repeat visits, create new post-purchase revenue,
            and understand where carrier delays affect the customer relationship.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card className="rounded-2xl border-slate-200 bg-slate-50 shadow-sm ring-slate-200" key={metric.label}>
              <CardContent className="p-5">
                <p className="text-3xl font-semibold text-slate-950">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold text-violet-700">{metric.label}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">Illustrative demo metrics. Actual performance depends on order volume, support workflows, and carrier data quality.</p>
      </div>
    </section>
  );
}
