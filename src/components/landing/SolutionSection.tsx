import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { solutionPoints } from '@/data/landing';

export default function SolutionSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="product">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-violet-700">The product</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Parcel Experience creates an embedded tracking experience directly inside the merchant website.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Instead of sending customers to a carrier page, brands can own the waiting period with clear shipment updates,
            branded support, and commerce moments that feel relevant to the order.
          </p>
        </div>
        <Card className="rounded-[1.5rem] border-slate-200 bg-slate-50 shadow-sm ring-slate-200">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-5">
              {solutionPoints.map((point, index) => (
                <div key={point}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700">
                      <CheckCircle2 className="size-4" />
                    </span>
                    <p className="text-base font-medium leading-7 text-slate-800">{point}</p>
                  </div>
                  {index < solutionPoints.length - 1 ? <Separator className="mt-5 bg-slate-200" /> : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
