import { HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const accountItems = [
  'Tableau de bord',
  'Mes commandes',
  'Mes adresses',
  'Mes informations',
  'Mes favoris',
  'Programme fidélité',
  'Mes retours',
  'Déconnexion',
];

export default function AccountSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <Card className="rounded-2xl border-violet-100 bg-white shadow-sm">
        <CardContent className="grid gap-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">Mon compte</p>
          <nav className="grid gap-1">
            {accountItems.map((item) => (
              <a
                className={[
                  'rounded-xl px-3 py-2 text-sm transition',
                  item === 'Mes commandes' ? 'bg-violet-50 font-semibold text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950',
                ].join(' ')}
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <Separator className="my-2" />
          <div className="rounded-2xl bg-violet-50 p-4 text-sm">
            <div className="mb-2 flex items-center gap-2 font-semibold text-violet-900">
              <HelpCircle className="size-4" />
              Besoin d’aide ?
            </div>
            <p className="mb-3 text-slate-600">Notre équipe suit votre commande avec vous.</p>
            <Button className="w-full rounded-full bg-violet-600 text-white hover:bg-violet-700" size="sm">
              Contacter le support
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
