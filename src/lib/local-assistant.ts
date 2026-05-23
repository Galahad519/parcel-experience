import type { ShipmentAssistantContext } from '@/lib/chat-context';

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function getLocalAssistantResponse(question: string, context: ShipmentAssistantContext) {
  const normalizedQuestion = question.toLowerCase();
  const latestEvent = context.tracking_events.at(-1);
  const formattedEstimate = formatDate(context.estimated_delivery);

  if (normalizedQuestion.includes('où') || normalizedQuestion.includes('colis')) {
    if (!latestEvent) {
      return 'Je n’ai pas encore d’événement de suivi pour cette commande. Votre commande est bien enregistrée dans notre expérience de suivi.';
    }

    return `Votre colis est actuellement au statut “${context.status_label}”. Dernier événement : ${latestEvent.title}${latestEvent.location ? ` à ${latestEvent.location}` : ''}.`;
  }

  if (normalizedQuestion.includes('ajouter') || normalizedQuestion.includes('article') || normalizedQuestion.includes('compléter')) {
    if (!context.can_complete_parcel) {
      return 'Votre colis semble déjà avoir quitté la phase de préparation. Dans cette démo, l’ajout d’articles est proposé uniquement avant expédition.';
    }

    const suggestions = context.upsell_products.slice(0, 2).map((product) => `${product.name} (${product.price})`).join(' ou ');
    return `Oui, vous pouvez encore compléter votre colis dans cette démo. Vous pouvez par exemple ajouter ${suggestions}, sans frais de livraison supplémentaires.`;
  }

  if (normalizedQuestion.includes('retard')) {
    if (context.scenario !== 'delayed' && context.status !== 'delayed') {
      return 'Je ne vois pas de retard indiqué dans le contexte de cette commande. Je peux seulement me baser sur les événements de suivi disponibles.';
    }

    return 'Le suivi indique un retard de traitement. Cela signifie que le transporteur a ajusté le délai, mais votre commande reste prise en charge.';
  }

  if (normalizedQuestion.includes('quand') || normalizedQuestion.includes('livré') || normalizedQuestion.includes('livraison')) {
    if (!formattedEstimate) {
      return 'Je n’ai pas assez d’information pour donner une date de livraison estimée.';
    }

    return `La livraison estimée est indiquée au ${formattedEstimate}. Cette date reste une estimation basée sur le suivi disponible.`;
  }

  if (normalizedQuestion.includes('support') || normalizedQuestion.includes('contacter')) {
    return 'Vous pouvez contacter le support depuis la carte “Besoin d’aide ?”. Dans cette démo, aucune demande réelle n’est envoyée.';
  }

  return 'Je peux vous aider à comprendre le statut de votre colis, la date estimée ou les options pour compléter votre commande avant expédition.';
}
