import { Bot, CheckCircle2, MapPin, PackagePlus, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-4 rounded-[2rem] bg-violet-200/40 blur-3xl" />
      <Card className="relative gap-0 rounded-[1.75rem] border-slate-200 bg-white p-0 shadow-2xl shadow-slate-200/80 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium text-slate-500">Atelier Nova</p>
            <h3 className="text-base font-semibold text-slate-950">Order #PX-1048</h3>
          </div>
          <Badge className="bg-violet-100 text-violet-700" variant="secondary">
            In preparation
          </Badge>
        </div>
        <CardContent className="grid gap-4 p-4 sm:p-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-normal text-slate-500">Shipment progress</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">Arrives Thursday, 10:30-13:00</p>
              </div>
              <Truck className="size-5 text-violet-600" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['Paid', 'Packed', 'Shipped', 'Delivered'].map((label, index) => (
                <div className="grid gap-2" key={label}>
                  <div className={`h-2 rounded-full ${index < 2 ? 'bg-violet-600' : 'bg-slate-200'}`} />
                  <span className={`text-[11px] font-medium ${index < 2 ? 'text-slate-950' : 'text-slate-400'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-48 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-4">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="relative h-full rounded-xl border border-white/80 bg-white/65 p-4 shadow-sm">
                <div className="absolute left-10 top-12 h-20 w-28 rounded-full border-2 border-dashed border-violet-300" />
                <span className="absolute left-8 top-10 grid size-8 place-items-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-200">
                  <MapPin className="size-4" />
                </span>
                <span className="absolute bottom-8 right-10 grid size-9 place-items-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-300">
                  <CheckCircle2 className="size-4" />
                </span>
                <p className="relative text-xs font-semibold text-slate-600">Live delivery area</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <PackagePlus className="size-4 text-violet-700" />
                  <p className="text-sm font-semibold text-slate-950">Complete your parcel</p>
                </div>
                <p className="text-xs leading-5 text-slate-600">Add premium laces before the warehouse closes this shipment.</p>
                <button className="mt-4 h-8 rounded-full bg-violet-600 px-3 text-xs font-semibold text-white" type="button">
                  Add for $9
                </button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-950 text-white">
                    <Bot className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Support assistant</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Your parcel is still editable for 2 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
