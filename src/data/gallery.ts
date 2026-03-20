export type GalleryCategory = 'before-after' | 'finished-cars' | 'lifestyle' | 'team';

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  src: string;
  fallbackSrc: string;
  title: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 'ba-1', category: 'before-after', src: '/assets/images/gallery/before-after/Before-After1.png', fallbackSrc: '/assets/images/gallery/before-after/ba-1.svg', title: 'Before and after sedan detail', alt: 'Before and after mobile detailing results on a sedan' },
  { id: 'ba-2', category: 'before-after', src: '/assets/images/gallery/before-after/Before-After2.png', fallbackSrc: '/assets/images/gallery/before-after/ba-2.svg', title: 'Farm bakkie transformation', alt: 'Before and after cleaning result on farm work vehicle' },
  { id: 'ba-3', category: 'before-after', src: '/assets/images/gallery/before-after/Before-After3.png', fallbackSrc: '/assets/images/gallery/before-after/ba-3.svg', title: 'Interior reset', alt: 'Before and after interior detailing of family vehicle' },
  { id: 'ba-4', category: 'before-after', src: '/assets/images/gallery/before-after/Before-After4.png', fallbackSrc: '/assets/images/gallery/before-after/ba-3.svg', title: 'Deep clean turnaround', alt: 'Before and after transformation from deep detailing service' },
  { id: 'fc-1', category: 'finished-cars', src: '/assets/images/gallery/finished-cars/Clean-Car-1.png', fallbackSrc: '/assets/images/gallery/finished-cars/fc-1.svg', title: 'Premium exterior finish', alt: 'Shiny black vehicle after premium mobile wash' },
  { id: 'fc-2', category: 'finished-cars', src: '/assets/images/gallery/finished-cars/Clean-Car-2.png', fallbackSrc: '/assets/images/gallery/finished-cars/fc-2.svg', title: 'Showroom-ready SUV', alt: 'Large SUV with polished finish after detailing' },
  { id: 'fc-3', category: 'finished-cars', src: '/assets/images/gallery/finished-cars/Clean-Car3.png', fallbackSrc: '/assets/images/gallery/finished-cars/fc-3.svg', title: 'Work vehicle refresh', alt: 'Work vehicle cleaned and detailed on site' },
  { id: 'fc-4', category: 'finished-cars', src: '/assets/images/gallery/finished-cars/Clean-Car4.png', fallbackSrc: '/assets/images/gallery/finished-cars/fc-3.svg', title: 'Luxury gloss finish', alt: 'Premium polished finish with deep gloss reflection' },
  { id: 'life-1', category: 'lifestyle', src: '/assets/images/gallery/lifestyle/Lifestyle1.png', fallbackSrc: '/assets/images/gallery/lifestyle/life-1.svg', title: 'At-home service', alt: 'Mobile detailing service setup at residential driveway' },
  { id: 'life-2', category: 'lifestyle', src: '/assets/images/gallery/lifestyle/Lifestyle2.png', fallbackSrc: '/assets/images/gallery/lifestyle/life-2.svg', title: 'Farm service convenience', alt: 'OnyxDetails washing vehicle at farm property' },
  { id: 'team-1', category: 'team', src: '/assets/images/gallery/team/Team1.png', fallbackSrc: '/assets/images/gallery/team/team-1.svg', title: 'Professional process', alt: 'OnyxDetails team member carefully detailing a car' },
  { id: 'team-2', category: 'team', src: '/assets/images/gallery/team/Team2.png', fallbackSrc: '/assets/images/gallery/team/team-2.svg', title: 'Quality check finish', alt: 'Final quality inspection before vehicle handover' }
];
