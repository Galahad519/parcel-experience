import { FormEvent, useMemo, useState } from 'react';
import { Loader2, SendHorizonal } from 'lucide-react';

import ChatLauncher from '@/components/chat/ChatLauncher';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatQuickActions from '@/components/chat/ChatQuickActions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { buildShipmentAssistantContext, type AssistantMessage } from '@/lib/chat-context';
import { getLocalAssistantResponse } from '@/lib/local-assistant';
import { supabase, supabaseConfigError } from '@/lib/supabase';
import type { Shipment, TrackingEvent } from '@/types/tracking';

type TrackingAssistantProps = {
  shipment: Shipment;
  events: TrackingEvent[];
};

type EdgeFunctionResponse = {
  message?: string;
};

function createMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    role,
    content,
  };
}

export default function TrackingAssistant({ shipment, events }: TrackingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configurationWarning, setConfigurationWarning] = useState<string | null>(supabaseConfigError);
  const shipmentContext = useMemo(() => buildShipmentAssistantContext(shipment, events), [shipment, events]);
  const hasStarted = messages.some((message) => message.role === 'user');

  async function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    const userMessage = createMessage('user', trimmedQuestion);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    if (!supabase) {
      setConfigurationWarning('Assistant IA non configuré');
      setMessages([...nextMessages, createMessage('assistant', getLocalAssistantResponse(trimmedQuestion, shipmentContext))]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: functionError } = await supabase.functions.invoke<EdgeFunctionResponse>('tracking-assistant', {
        body: {
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          shipmentContext,
        },
      });

      if (functionError || !data?.message) {
        setConfigurationWarning('Assistant IA non configuré');
        setMessages([...nextMessages, createMessage('assistant', getLocalAssistantResponse(trimmedQuestion, shipmentContext))]);
        return;
      }

      setMessages([...nextMessages, createMessage('assistant', data.message)]);
      setConfigurationWarning(null);
    } catch {
      setConfigurationWarning('Assistant IA non configuré');
      setMessages([...nextMessages, createMessage('assistant', getLocalAssistantResponse(trimmedQuestion, shipmentContext))]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasStarted) {
      setError('Choisissez d’abord une question rapide pour démarrer l’assistant.');
      return;
    }

    sendQuestion(input);
  }

  return (
    <>
      <ChatLauncher onClick={() => setIsOpen(true)} />
      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetContent className="w-full max-w-md gap-0 bg-white p-0 sm:max-w-md" side="right">
          <SheetHeader className="border-b border-violet-100 p-5">
            <div className="flex items-center gap-2">
              <SheetTitle>Assistant de suivi</SheetTitle>
              <Badge className="bg-violet-50 text-violet-700" variant="secondary">
                LUMEN
              </Badge>
            </div>
            <SheetDescription>Je peux vous aider à comprendre votre commande.</SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="min-h-0 flex-1">
              <div className="grid gap-4 p-5">
                {configurationWarning ? (
                  <Alert className="border-amber-200 bg-amber-50 text-amber-900">
                    <AlertTitle>Assistant IA non configuré</AlertTitle>
                    <AlertDescription className="text-amber-800">
                      Les réponses locales de démonstration restent disponibles.
                    </AlertDescription>
                  </Alert>
                ) : null}

                {messages.length === 0 ? (
                  <div className="grid gap-4 rounded-3xl bg-violet-50 p-4">
                    <div>
                      <p className="font-semibold text-violet-950">Une question sur votre commande ?</p>
                      <p className="mt-1 text-sm text-violet-800">
                        Bonjour, je peux vous aider à comprendre le statut de votre colis ou à compléter votre commande si elle n’est pas encore expédiée.
                      </p>
                    </div>
                    <ChatQuickActions disabled={isLoading} onSelect={sendQuestion} />
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Loader2 className="size-4 animate-spin" />
                        L’assistant prépare une réponse…
                      </div>
                    ) : null}
                    <Separator />
                    <ChatQuickActions disabled={isLoading} onSelect={sendQuestion} />
                  </>
                )}

                {error ? (
                  <Alert variant="destructive">
                    <AlertTitle>Question requise</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}
              </div>
            </ScrollArea>

            <form className="grid gap-3 border-t border-violet-100 p-4" onSubmit={handleSubmit}>
              <Textarea
                className="max-h-28 min-h-16 resize-none rounded-2xl"
                disabled={isLoading || !hasStarted}
                onChange={(event) => setInput(event.target.value)}
                placeholder={hasStarted ? 'Posez votre question…' : 'Choisissez d’abord une question rapide…'}
                value={input}
              />
              <Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700" disabled={isLoading || !input.trim() || !hasStarted} type="submit">
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <SendHorizonal className="size-4" />}
                Envoyer
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
