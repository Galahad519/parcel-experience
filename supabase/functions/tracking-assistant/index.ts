type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type RequestPayload = {
  messages?: ChatMessage[];
  shipmentContext?: unknown;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const systemPrompt = `Vous êtes l’assistant post-achat de Parcel Experience.
Vous aidez les clients à comprendre leur commande et leur statut de livraison.
Vous devez toujours répondre en français.
Soyez concis, calme, rassurant et utile.
Utilisez uniquement le contexte de colis fourni.
N’inventez jamais d’événements de livraison, de dates ou d’informations transporteur.
Si une information manque, dites que vous n’avez pas assez d’information.
Vous pouvez expliquer les statuts avec des mots simples.
Vous pouvez suggérer de compléter le colis uniquement si le colis n’a pas encore été expédié.
Vous pouvez recommander uniquement les produits additionnels présents dans la liste fournie.
Vous n’êtes pas un chatbot support générique.
Vous êtes un assistant contextuel pour cette commande précise.`;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function isValidMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const message = value as Record<string, unknown>;
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  );
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const openAiApiKey = Deno.env.get('OPENAI_API_KEY');

  if (!openAiApiKey) {
    return jsonResponse({ error: 'assistant_not_configured' }, 503);
  }

  let payload: RequestPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return jsonResponse({ error: 'messages are required' }, 400);
  }

  if (!payload.messages.every(isValidMessage)) {
    return jsonResponse({ error: 'messages are invalid' }, 400);
  }

  if (!payload.shipmentContext || typeof payload.shipmentContext !== 'object') {
    return jsonResponse({ error: 'shipmentContext is required' }, 400);
  }

  const safeMessages = payload.messages.slice(-12).map((message) => ({
    role: message.role,
    content: message.content.slice(0, 1200),
  }));

  const shipmentContext = JSON.stringify(payload.shipmentContext).slice(0, 8000);
  const model = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini';

  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'developer', content: systemPrompt },
          {
            role: 'user',
            content: `Contexte structuré de la commande, seule source autorisée:\n${shipmentContext}`,
          },
          ...safeMessages,
        ],
      }),
    });

    if (!openAiResponse.ok) {
      const details = await openAiResponse.text();
      console.error('OpenAI request failed', openAiResponse.status, details);
      return jsonResponse({ error: 'assistant_request_failed' }, 502);
    }

    const completion = await openAiResponse.json();
    const message = completion?.choices?.[0]?.message?.content;

    if (typeof message !== 'string' || !message.trim()) {
      return jsonResponse({ error: 'assistant_empty_response' }, 502);
    }

    return jsonResponse({ message: message.trim() });
  } catch (error) {
    console.error('tracking-assistant failed', error);
    return jsonResponse({ error: 'assistant_request_failed' }, 502);
  }
});
