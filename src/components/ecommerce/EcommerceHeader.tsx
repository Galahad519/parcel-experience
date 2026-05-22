import { Link } from 'react-router-dom';
import { Search, ShoppingBag, UserRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navItems = ['Accueil', 'Boutique', 'Nouveautés', 'Collections'];

export default function EcommerceHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-violet-100/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-xl font-semibold tracking-[0.18em] text-violet-700" to="/generator">
          LUMEN
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-violet-700" href="#" key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden w-full max-w-xs items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-9 rounded-full border-violet-100 bg-violet-50/60 pl-9" placeholder="Rechercher un produit" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button aria-label="Mon compte" className="rounded-full text-slate-600 hover:text-violet-700" size="icon" variant="ghost">
            <UserRound className="size-4" />
          </Button>
          <Button aria-label="Panier" className="relative rounded-full text-slate-600 hover:text-violet-700" size="icon" variant="ghost">
            <ShoppingBag className="size-4" />
            <Badge className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-violet-600 px-1 text-[10px] text-white">2</Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
