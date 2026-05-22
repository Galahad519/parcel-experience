import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recommendedProducts } from '@/data/mockProducts';

export default function RecommendedProducts() {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950">Vous pourriez aussi aimer</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendedProducts.map((product) => (
          <Card className="rounded-2xl border-violet-100 bg-white shadow-sm" key={product.id}>
            <CardHeader className="pb-0">
              <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-slate-50 text-xs font-semibold text-slate-300">LUMEN</div>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div>
                <CardTitle className="text-base">{product.name}</CardTitle>
                <p className="mt-1 text-sm text-slate-500">{product.meta}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-950">{product.price}</span>
                <Button className="rounded-full border-violet-200 text-violet-700 hover:bg-violet-50" size="sm" variant="outline">
                  Ajouter au panier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
