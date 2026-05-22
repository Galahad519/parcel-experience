import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { completeParcelProducts } from '@/data/mockProducts';

export default function CompleteParcelUpsell() {
  return (
    <Card className="rounded-3xl border-violet-200 bg-violet-50/80 shadow-sm">
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-xl text-violet-950">Complétez votre colis</CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-violet-800/80">
              Ajoutez ces articles à votre commande actuelle et recevez-les dans le même colis, sans frais de livraison supplémentaires.
            </CardDescription>
          </div>
          <div className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">Plus que 04:18:47</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {completeParcelProducts.map((product) => (
            <article className="grid gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-violet-100" key={product.id}>
              <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-white text-xs font-semibold text-violet-400">
                LUMEN
              </div>
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold text-slate-950">{product.name}</h3>
                <p className="text-xs text-slate-500">{product.meta}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star className="size-3 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-950">{product.price}</span>
                <Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700" size="sm">
                  Ajouter
                </Button>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
