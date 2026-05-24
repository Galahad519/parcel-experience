import type * as React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

type AccordionContextValue = {
  openValue?: string;
  setOpenValue: (value?: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<string | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion components must be used inside Accordion.');
  }

  return context;
}

function Accordion({
  className,
  defaultValue,
  ...props
}: React.ComponentProps<'div'> & { defaultValue?: string }) {
  const [openValue, setOpenValue] = useState<string | undefined>(defaultValue);
  const value = useMemo(() => ({ openValue, setOpenValue }), [openValue]);

  return (
    <AccordionContext.Provider value={value}>
      <div className={cn('divide-y divide-border', className)} {...props} />
    </AccordionContext.Provider>
  );
}

function AccordionItem({ className, value, ...props }: React.ComponentProps<'div'> & { value: string }) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn('py-1', className)} {...props} />
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { openValue, setOpenValue } = useAccordion();
  const itemValue = useContext(AccordionItemContext);
  const isOpen = openValue === itemValue;

  if (!itemValue) {
    throw new Error('AccordionTrigger must be used inside AccordionItem.');
  }

  return (
    <button
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-200',
        className,
      )}
      onClick={() => setOpenValue(isOpen ? undefined : itemValue)}
      type="button"
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
    </button>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { openValue } = useAccordion();
  const itemValue = useContext(AccordionItemContext);
  const isOpen = openValue === itemValue;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn('pb-5 text-sm leading-6 text-muted-foreground', className)} {...props}>
      {children}
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
