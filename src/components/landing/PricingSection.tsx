import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { pricingPlans } from '@/data/landing';

export default function PricingSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="pricing">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-violet-700">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Simple packaging for the next stage of the product.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Payments are not implemented in this PoC. These plans are placeholders for demo positioning.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              className={`rounded-2xl bg-white shadow-sm ${plan.featured ? 'border-violet-300 ring-violet-200' : 'border-slate-200 ring-slate-200'}`}
              key={plan.name}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{plan.description}</p>
                  </div>
                  {plan.featured ? <Badge className="bg-violet-100 text-violet-700" variant="secondary">Popular</Badge> : null}
                </div>
                <p className="mt-8 text-2xl font-semibold text-slate-950">{plan.price}</p>
                <Button className="mt-6 w-full rounded-full" disabled variant={plan.featured ? 'default' : 'outline'}>
                  Join waitlist
                </Button>
                <div className="mt-6 grid gap-3">
                  {plan.features.map((feature) => (
                    <div className="flex items-center gap-3 text-sm text-slate-700" key={feature}>
                      <Check className="size-4 text-violet-700" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
