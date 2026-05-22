import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const steps = ['Commande confirmée', 'En préparation', 'Expédiée', 'En livraison', 'Livrée'];

type OrderProgressProps = {
  currentStep: number;
};

export default function OrderProgress({ currentStep }: OrderProgressProps) {
  return (
    <div className="grid gap-4">
      <div className="hidden grid-cols-5 items-start gap-2 sm:grid">
        {steps.map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index <= currentStep;

          return (
            <div className="relative grid gap-2" key={step}>
              {index < steps.length - 1 ? (
                <div className={cn('absolute left-[calc(50%+1rem)] top-4 h-0.5 w-[calc(100%-2rem)]', index < currentStep ? 'bg-violet-500' : 'bg-slate-200')} />
              ) : null}
              <div
                className={cn(
                  'z-10 mx-auto flex size-8 items-center justify-center rounded-full border text-xs font-semibold',
                  isActive ? 'border-violet-500 bg-violet-600 text-white shadow-sm shadow-violet-200' : 'border-slate-200 bg-white text-slate-400',
                )}
              >
                {isDone ? <Check className="size-4" /> : index + 1}
              </div>
              <p className={cn('text-center text-xs font-medium', isActive ? 'text-violet-700' : 'text-slate-400')}>{step}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-3 sm:hidden">
        {steps.map((step, index) => (
          <div className="flex items-center gap-3" key={step}>
            <div className={cn('flex size-7 items-center justify-center rounded-full text-xs font-semibold', index <= currentStep ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400')}>
              {index < currentStep ? <Check className="size-4" /> : index + 1}
            </div>
            <span className={cn('text-sm', index <= currentStep ? 'font-medium text-slate-950' : 'text-slate-400')}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
