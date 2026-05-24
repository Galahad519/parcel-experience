import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DemoCTASection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="demo">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-slate-200 sm:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-violet-300">Explore the PoC</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">
                Generate a fake parcel, then view the branded tracking page as a customer would.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                The demo uses generated shipment scenarios and mock data. No real carrier APIs, Shopify integration, or payments are connected.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button className="h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-violet-100" render={<Link to="/generator" />}>
                Open generator
                <ArrowRight className="size-4" />
              </Button>
              <Button className="h-11 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10" render={<Link to="/generator" />} variant="outline">
                View tracking demo
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
