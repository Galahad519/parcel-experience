import type { Scenario, ShipmentStatus } from '@/types/tracking';

export const statusLabels: Record<ShipmentStatus, string> = {
  confirmed: 'Confirmed',
  prepared: 'Prepared',
  in_transit: 'In transit',
  out_for_delivery: 'Out for delivery',
  delayed: 'Delayed',
  blocked: 'Blocked',
  delivered: 'Delivered',
  failed: 'Failed',
};

export const scenarioLabels: Record<Scenario, string> = {
  normal: 'Normal',
  delayed: 'Delayed',
  blocked: 'Blocked',
  delivered: 'Delivered',
  failed: 'Failed',
};

export function getStatusBadgeClassName(status: ShipmentStatus) {
  if (status === 'delivered') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300';
  }

  if (status === 'failed') {
    return '';
  }

  if (status === 'delayed' || status === 'blocked') {
    return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300';
  }

  if (status === 'confirmed' || status === 'prepared') {
    return '';
  }

  return '';
}

export function getStatusBadgeVariant(status: ShipmentStatus) {
  if (status === 'failed') {
    return 'destructive' as const;
  }

  if (status === 'confirmed' || status === 'prepared') {
    return 'secondary' as const;
  }

  return 'default' as const;
}

export function getStatusProgress(status: ShipmentStatus) {
  const progressByStatus: Record<ShipmentStatus, number> = {
    confirmed: 15,
    prepared: 30,
    in_transit: 55,
    out_for_delivery: 85,
    delayed: 60,
    blocked: 45,
    delivered: 100,
    failed: 75,
  };

  return progressByStatus[status];
}

export const frenchStatusLabels: Record<ShipmentStatus, string> = {
  confirmed: 'Votre commande est confirmée',
  prepared: 'Votre colis est en préparation',
  in_transit: 'Votre colis est en transit',
  out_for_delivery: 'Votre colis est en livraison',
  delayed: 'Votre livraison prend un peu de retard',
  blocked: 'Votre colis nécessite une vérification',
  delivered: 'Votre colis a été livré',
  failed: 'La livraison n’a pas pu aboutir',
};

export function getFrenchShipmentTitle(status: ShipmentStatus, scenario: Scenario) {
  if (scenario === 'normal' && status === 'out_for_delivery') {
    return 'Votre colis est en préparation';
  }

  return frenchStatusLabels[status];
}

export function getFrenchShipmentSubtitle(status: ShipmentStatus, scenario: Scenario) {
  if (status === 'delivered') {
    return 'Vos articles ont bien été remis à destination.';
  }

  if (status === 'failed') {
    return 'Notre équipe suit la situation pour vous aider à finaliser la livraison.';
  }

  if (scenario === 'blocked') {
    return 'Votre colis n’a pas encore quitté notre entrepôt. Nous surveillons son prochain scan.';
  }

  if (scenario === 'delayed') {
    return 'Le transporteur a ajusté le délai, mais votre commande reste bien prise en charge.';
  }

  return 'Nous emballons actuellement vos articles avec soin.';
}

export function getFrenchDeliveryEstimate(status: ShipmentStatus) {
  if (status === 'delivered') {
    return 'Livraison effectuée';
  }

  if (status === 'failed') {
    return 'Action requise auprès du transporteur';
  }

  if (status === 'out_for_delivery') {
    return 'Livraison prévue aujourd’hui avant 19:00';
  }

  return 'Expédition prévue demain avant 15:00';
}

export function getFrenchTrackingBadge(status: ShipmentStatus) {
  if (status === 'delivered') {
    return 'Livré';
  }

  if (status === 'failed') {
    return 'À vérifier';
  }

  if (status === 'delayed') {
    return 'Retard détecté';
  }

  if (status === 'blocked') {
    return 'En attente';
  }

  if (status === 'out_for_delivery') {
    return 'En livraison';
  }

  if (status === 'in_transit') {
    return 'En transit';
  }

  return 'Bientôt expédié';
}

export function getOrderStepIndex(status: ShipmentStatus) {
  const stepByStatus: Record<ShipmentStatus, number> = {
    confirmed: 0,
    prepared: 1,
    in_transit: 2,
    out_for_delivery: 3,
    delayed: 2,
    blocked: 1,
    delivered: 4,
    failed: 3,
  };

  return stepByStatus[status];
}
