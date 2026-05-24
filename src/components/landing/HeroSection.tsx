import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';

import HeroMockup from '@/components/landing/HeroMockup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_32rem),linear-gradient(180deg,#fff,#f8fafc)]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <Badge className="mb-6 border-violet-200 bg-white text-violet-700 shadow-sm" variant="outline">
            Post-purchase experience platform
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Turn parcel tracking into a branded post-purchase experience
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Parcel Experience helps e-commerce brands keep customers on their website after checkout, reduce support tickets,
            and unlock contextual upsells before shipment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 rounded-full bg-violet-600 px-5 text-white shadow-lg shadow-violet-200 hover:bg-violet-700" render={<a href="#demo" />}>
              <PlayCircle className="size-4" />
              View live demo
            </Button>
            <Button className="h-11 rounded-full bg-white px-5" render={<Link to="/generator" />} variant="outline">
              Open generator
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-sm">
            <div>
              <p className="font-semibold text-slate-950">Embedded</p>
              <p className="mt-1 text-slate-500">Inside your store</p>
            </div>
            <div>
              <p className="font-semibold text-slate-950">Revenue-ready</p>
              <p className="mt-1 text-slate-500">Before shipment</p>
            </div>
            <div>
              <p className="font-semibold text-slate-950">Support-aware</p>
              <p className="mt-1 text-slate-500">Fewer WISMO tickets</p>
            </div>
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}
