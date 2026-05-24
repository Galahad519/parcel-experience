import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { upsellProducts } from '@/data/landing';

const benefits = [
  'Increases average order value',
  'Reduces friction',
  'Avoids extra shipping fees',
  'Feels contextual instead of pushy',
  'Turns logistics timing into a sales opportunity',
];

export default function CompleteParcelSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-violet-700">Complete your parcel</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Let customers add complementary products before the parcel leaves the warehouse.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Parcel Experience turns fulfillment timing into a useful commerce moment. When the shipment is still editable,
            customers can add relevant products to the same parcel without paying for a second delivery.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div className="flex items-center gap-2" key={benefit}>
                <span className="size-1.5 rounded-full bg-violet-600" />
                {benefit}
              </div>
            ))}
          </div>
          <Button className="mt-8 h-11 rounded-full bg-violet-600 px-5 text-white hover:bg-violet-700" render={<Link to="/generator" />}>
            See the upsell flow
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="rounded-[1.75rem] border border-violet-100 bg-violet-50/70 p-4 shadow-xl shadow-violet-100/70 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Add before shipment</p>
              <p className="mt-1 text-sm text-slate-600">Warehouse cutoff in 2h 14m</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm">Same parcel</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {upsellProducts.map((product) => (
              <Card className="rounded-2xl border-white bg-white shadow-sm ring-white" key={product.name}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-violet-700">
                      <product.icon className="size-5" />
                    </span>
                    <button className="grid size-8 place-items-center rounded-full border border-slate-200 text-slate-700" type="button">
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <h3 className="mt-5 font-semibold text-slate-950">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.price} · ships together</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
