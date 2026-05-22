export type MockProduct = {
  id: string;
  name: string;
  meta: string;
  price: string;
  quantity?: number;
  rating?: string;
};

export const orderedProducts: MockProduct[] = [
  {
    id: 'urban-white',
    name: 'Sneakers Urban White',
    meta: 'Blanc cassé · Taille 42',
    price: '89,90 €',
    quantity: 1,
  },
  {
    id: 'essential-cap',
    name: 'Casquette Essential',
    meta: 'Noir · Taille unique',
    price: '24,90 €',
    quantity: 1,
  },
];

export const completeParcelProducts: MockProduct[] = [
  {
    id: 'sport-socks',
    name: 'Chaussettes Sport',
    meta: 'Blanc · Lot de 3',
    price: '12,90 €',
    rating: '4.8',
  },
  {
    id: 'sneaker-care',
    name: 'Kit Entretien Sneakers',
    meta: 'Nettoyant + brosse',
    price: '19,90 €',
    rating: '4.9',
  },
  {
    id: 'comfort-insoles',
    name: 'Semelles Confort',
    meta: 'Gel respirant',
    price: '14,90 €',
    rating: '4.7',
  },
  {
    id: 'premium-laces',
    name: 'Lacets Premium',
    meta: 'Ivoire · 120 cm',
    price: '7,90 €',
    rating: '4.6',
  },
];

export const recommendedProducts: MockProduct[] = [
  {
    id: 'oversize-tee',
    name: 'Tee-Shirt Oversize',
    meta: 'Coton lourd · Écru',
    price: '34,90 €',
  },
  {
    id: 'comfort-hoodie',
    name: 'Hoodie Comfort',
    meta: 'Molleton premium · Violet',
    price: '69,90 €',
  },
  {
    id: 'urban-belt-bag',
    name: 'Sac Banane Urban',
    meta: 'Nylon recyclé · Noir',
    price: '39,90 €',
  },
];
