export type GalleryCategory = 'before-after' | 'finished-cars' | 'lifestyle' | 'team';

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  src: string;
  title: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 'ba-1', category: 'before-after', src: '/Before-After1.png', title: 'Before and after sedan detail', alt: 'Before and after mobile detailing results on a sedan' },
  { id: 'ba-2', category: 'before-after', src: '/Before-After2.png', title: 'Farm bakkie transformation', alt: 'Before and after cleaning result on farm work vehicle' },
  { id: 'ba-3', category: 'before-after', src: '/Before-After3.png', title: 'Interior reset', alt: 'Before and after interior detailing of family vehicle' },
  { id: 'ba-4', category: 'before-after', src: '/Before-After4.png', title: 'Deep clean turnaround', alt: 'Before and after transformation from deep detailing service' },
  { id: 'fc-1', category: 'finished-cars', src: '/Clean-Car-1.png', title: 'Premium exterior finish', alt: 'Shiny black vehicle after premium mobile wash' },
  { id: 'fc-2', category: 'finished-cars', src: '/Clean-Car-2.png', title: 'Showroom-ready SUV', alt: 'Large SUV with polished finish after detailing' },
  { id: 'fc-3', category: 'finished-cars', src: '/Clean-Car3.png', title: 'Work vehicle refresh', alt: 'Work vehicle cleaned and detailed on site' },
  { id: 'fc-4', category: 'finished-cars', src: '/Clean-Car4.png', title: 'Luxury gloss finish', alt: 'Premium polished finish with deep gloss reflection' },
  { id: 'life-1', category: 'lifestyle', src: '/Lifestyle1.png', title: 'At-home service', alt: 'Mobile detailing service setup at residential driveway' },
  { id: 'life-2', category: 'lifestyle', src: '/Lifestyle2.png', title: 'Farm service convenience', alt: 'OnyxDetails washing vehicle at farm property' },
  { id: 'team-1', category: 'team', src: '/Team1.png', title: 'Professional process', alt: 'OnyxDetails team member carefully detailing a car' },
  { id: 'team-2', category: 'team', src: '/Team2.png', title: 'Quality check finish', alt: 'Final quality inspection before vehicle handover' }
];
