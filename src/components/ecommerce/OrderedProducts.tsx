import { orderedProducts } from '@/data/mockProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function OrderedProducts() {
  return (
    <Card className="rounded-2xl border-violet-100 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Articles de la commande</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {orderedProducts.map((product) => (
          <div className="flex items-center gap-4" key={product.id}>
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-violet-50 text-xs font-semibold text-violet-400">LUMEN</div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-950">{product.name}</h3>
              <p className="text-sm text-slate-500">{product.meta}</p>
              <p className="text-xs text-slate-400">Quantité {product.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-slate-950">{product.price}</p>
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total</span>
          <span className="text-base font-semibold text-slate-950">114,80 €</span>
        </div>
      </CardContent>
    </Card>
  );
}
