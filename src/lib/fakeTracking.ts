import type { Carrier, NewTrackingEvent, Scenario, ShipmentStatus } from '../types/tracking';

const carrierPrefixes: Record<Carrier, string> = {
  Colissimo: 'COL',
  Chronopost: 'CHR',
  'Mondial Relay': 'MR',
  DHL: 'DHL',
  UPS: 'UPS',
};

const locationsByCarrier: Record<Carrier, string[]> = {
  Colissimo: ['Hub de Paris', 'Centre de tri d’Orléans', 'Dépôt de Lyon'],
  Chronopost: ['Hub de Roissy', 'Agence de Tours', 'Dépôt de Marseille'],
  'Mondial Relay': ['Hub de Lille', 'Centre relais de Nantes', 'Consigne de Bordeaux'],
  DHL: ['Hub de Leipzig', 'Plateforme de Paris', 'Point service de Nice'],
  UPS: ['Hub de Cologne', 'Site de Chilly-Mazarin', 'Dépôt de Toulouse'],
};

const scenarioEvents: Record<
  Scenario,
  Array<Pick<NewTrackingEvent, 'title' | 'description' | 'status'>>
> = {
  normal: [
    { title: 'Commande confirmée', description: 'Votre commande a bien été confirmée.', status: 'confirmed' },
    { title: 'Colis en préparation', description: 'Nous préparons actuellement votre colis.', status: 'prepared' },
    { title: 'Colis remis au transporteur', description: 'Le transporteur a pris en charge votre colis.', status: 'in_transit' },
    { title: 'Arrivé au centre de tri', description: 'Votre colis est arrivé dans un centre de tri régional.', status: 'in_transit' },
    { title: 'Départ du centre de tri', description: 'Votre colis a quitté le centre de tri vers le dépôt de destination.', status: 'in_transit' },
    { title: 'En cours de livraison', description: 'Votre colis est en route vers son destinataire.', status: 'out_for_delivery' },
  ],
  delayed: [
    { title: 'Commande confirmée', description: 'Votre commande a bien été confirmée.', status: 'confirmed' },
    { title: 'Colis en préparation', description: 'Nous préparons actuellement votre colis.', status: 'prepared' },
    { title: 'En transit', description: 'Votre colis est en cours d’acheminement dans le réseau du transporteur.', status: 'in_transit' },
    { title: 'Arrivé au centre de tri', description: 'Votre colis attend le prochain scan du transporteur.', status: 'in_transit' },
    { title: 'Retard détecté', description: 'Le traitement du colis prend plus de temps que prévu au centre de tri.', status: 'delayed' },
    { title: 'Nouvelle estimation de livraison', description: 'Une date de livraison ajustée a été calculée.', status: 'delayed' },
  ],
  blocked: [
    { title: 'Commande confirmée', description: 'Votre commande a bien été confirmée.', status: 'confirmed' },
    { title: 'Colis remis au transporteur', description: 'Le transporteur a pris en charge votre colis.', status: 'in_transit' },
    { title: 'Arrivé au hub', description: 'Votre colis a été scanné sur une plateforme transporteur.', status: 'in_transit' },
    { title: 'Aucun mouvement détecté depuis 48 h', description: 'Votre colis n’a pas reçu de scan récent et peut nécessiter une vérification.', status: 'blocked' },
  ],
  delivered: [
    { title: 'Commande confirmée', description: 'Votre commande a bien été confirmée.', status: 'confirmed' },
    { title: 'Colis en préparation', description: 'Nous préparons actuellement votre colis.', status: 'prepared' },
    { title: 'En transit', description: 'Votre colis est en cours d’acheminement dans le réseau du transporteur.', status: 'in_transit' },
    { title: 'Arrivé au dépôt de destination', description: 'Votre colis est arrivé dans le dépôt final de livraison.', status: 'in_transit' },
    { title: 'En cours de livraison', description: 'Votre colis est en route vers son destinataire.', status: 'out_for_delivery' },
    { title: 'Livré', description: 'Votre colis a bien été livré.', status: 'delivered' },
  ],
  failed: [
    { title: 'Commande confirmée', description: 'Votre commande a bien été confirmée.', status: 'confirmed' },
    { title: 'Colis en préparation', description: 'Nous préparons actuellement votre colis.', status: 'prepared' },
    { title: 'Arrivé au dépôt de destination', description: 'Votre colis est arrivé dans le dépôt final de livraison.', status: 'in_transit' },
    { title: 'En cours de livraison', description: 'Votre colis est en route vers son destinataire.', status: 'out_for_delivery' },
    { title: 'Tentative de livraison échouée', description: 'Le transporteur n’a pas pu finaliser la livraison.', status: 'failed' },
    { title: 'Action requise', description: 'Le destinataire doit contacter le transporteur ou mettre à jour les informations de livraison.', status: 'failed' },
  ],
};

export function generateTrackingNumber(carrier: Carrier) {
  const number = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return `${carrierPrefixes[carrier]}-${number}`;
}

export function generateTrackingEvents(scenario: Scenario, carrier: Carrier): NewTrackingEvent[] {
  const now = new Date();
  const locations = locationsByCarrier[carrier];
  const eventTemplates = scenarioEvents[scenario];

  return eventTemplates.map((event, index) => {
    const eventDate = new Date(now);
    const hoursAgo = scenario === 'blocked' ? 72 - index * 8 : (eventTemplates.length - index - 1) * 10;
    eventDate.setHours(now.getHours() - Math.max(hoursAgo, 0));

    return {
      ...event,
      location: locations[index % locations.length],
      event_date: eventDate.toISOString(),
    };
  });
}

export function getShipmentStatusFromScenario(scenario: Scenario): ShipmentStatus {
  const statusByScenario: Record<Scenario, ShipmentStatus> = {
    normal: 'out_for_delivery',
    delayed: 'delayed',
    blocked: 'blocked',
    delivered: 'delivered',
    failed: 'failed',
  };

  return statusByScenario[scenario];
}

export function getHumanReadableMessage(status: ShipmentStatus, scenario: Scenario) {
  if (status === 'delivered') {
    return 'Ce colis a bien été livré.';
  }

  if (status === 'failed') {
    return 'La livraison n’a pas pu être finalisée. Une action du destinataire peut être nécessaire.';
  }

  if (scenario === 'blocked') {
    return 'Ce colis semble bloqué car aucun mouvement récent du transporteur n’a été détecté.';
  }

  if (scenario === 'delayed') {
    return 'Ce colis est retardé et la date de livraison estimée a été ajustée.';
  }

  if (status === 'out_for_delivery') {
    return 'Ce colis est actuellement en cours de livraison.';
  }

  return 'Ce colis est en cours d’acheminement dans le réseau du transporteur.';
}

export function getEstimatedDeliveryDate(scenario: Scenario) {
  const date = new Date();
  const offsets: Record<Scenario, number> = {
    normal: 1,
    delayed: 3,
    blocked: 5,
    delivered: -1,
    failed: 2,
  };

  date.setDate(date.getDate() + offsets[scenario]);
  return date.toISOString();
}
