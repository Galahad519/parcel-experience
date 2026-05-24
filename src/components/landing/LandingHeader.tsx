import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { navItems } from '@/data/landing';

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-sm font-semibold text-slate-950" to="/landing">
          <span className="grid size-8 place-items-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-200">
            <Package className="size-4" />
          </span>
          Parcel Experience
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a className="transition-colors hover:text-slate-950" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden rounded-full sm:inline-flex" render={<a href="#demo" />} size="sm" variant="outline">
            View demo
          </Button>
          <Button className="rounded-full bg-slate-950 text-white hover:bg-violet-700" render={<Link to="/generator" />} size="sm">
            Open PoC
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
