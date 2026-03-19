export type ServiceType = 'one-time' | 'monthly';

export type Service = {
  id: string;
  name: string;
  shortDescription: string;
  priceLabel: string;
  priceValue?: number;
  includedItems: string[];
  bestFor: string;
  serviceType: ServiceType;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    shortDescription: 'Interior and exterior upkeep done with a premium mobile touch.',
    priceLabel: 'R220 per wash',
    priceValue: 220,
    includedItems: ['Interior & Exterior', 'Foam bath & hand wash', 'Basic vacuum & wipe down'],
    bestFor: 'routine upkeep',
    serviceType: 'one-time'
  },
  {
    id: 'detail-interior-exterior',
    name: 'Detail Interior & Exterior',
    shortDescription: 'A deeper refresh for drivers who want a renewed finish inside and out.',
    priceLabel: 'R400 per detail',
    priceValue: 400,
    includedItems: ['Deep clean interior & exterior', 'Shampoo seats & mats', 'Make it look new again'],
    bestFor: 'deeper refresh',
    serviceType: 'one-time'
  },
  {
    id: 'basic-wash-bi-weekly',
    name: 'Basic Wash Bi-weekly',
    shortDescription: 'Recurring care plan for a consistently clean vehicle every month.',
    priceLabel: 'R400 p/m',
    priceValue: 400,
    includedItems: ['Interior & Exterior', '1 basic wash every second week'],
    bestFor: 'recurring maintenance',
    serviceType: 'monthly'
  },
  {
    id: 'detail-bi-weekly',
    name: 'Detail Bi-weekly',
    shortDescription: 'Bi-weekly detailing to maintain a high presentation standard all month.',
    priceLabel: 'R700 p/m',
    priceValue: 700,
    includedItems: ['Interior & exterior detail', '1 detail every second week'],
    bestFor: 'regular deeper care',
    serviceType: 'monthly'
  },
  {
    id: 'special-pack',
    name: 'Special Pack',
    shortDescription: 'The complete monthly package for premium condition and long-term value.',
    priceLabel: 'R1099 p/m',
    priceValue: 1099,
    includedItems: ['Week 1: Interior & exterior detail', 'Week 2, 3, 4: Basic wash'],
    bestFor: 'best overall value',
    serviceType: 'monthly',
    featured: true
  }
];
