import { Link } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Parcel Experience</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Post-purchase experience infrastructure for modern e-commerce brands.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-slate-300 sm:grid-cols-4">
            <a className="hover:text-white" href="#product">Product</a>
            <a className="hover:text-white" href="#demo">Demo</a>
            <a className="hover:text-white" href="https://github.com" rel="noreferrer" target="_blank">GitHub</a>
            <a className="hover:text-white" href="mailto:hello@parcel.experience">Contact</a>
          </nav>
        </div>
        <Separator className="my-8 bg-white/10" />
        <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Parcel Experience. Demo product.</p>
          <Link className="hover:text-slate-300" to="/generator">Open internal PoC generator</Link>
        </div>
      </div>
    </footer>
  );
}
