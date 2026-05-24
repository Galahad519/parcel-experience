import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { faqs } from '@/data/landing';

export default function FAQSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="faq">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-violet-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Questions merchants ask first.
          </h2>
        </div>
        <Card className="rounded-2xl border-slate-200 bg-slate-50 shadow-sm ring-slate-200">
          <CardContent className="p-4 sm:p-6">
            <Accordion defaultValue="item-0">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
