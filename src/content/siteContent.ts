export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export const contact = {
  phone: '081 532 8774',
  email: 'onyxdetails17@gmail.com',
  areas: ['Sabie', 'Graskop', 'White River', 'Nelspruit', 'Hazyview'],
  whatsapp: 'https://wa.me/27815328774'
};

export const branding = {
  logo: '/assets/logos/onyxdetails-logo.svg'
};

export const hero = {
  title: 'Premium Mobile Detailing at Your Doorstep',
  subtitle:
    'We come to your home, farm, or workplace and deliver reliable, high-finish detailing with consistent quality.',
  image: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Home-Page-Hero.png'
};

export const services = [
  {
    id: 'basic-wash-single',
    category: 'one-time',
    title: 'Basic Wash (Interior & Exterior)',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    desc: 'Single-use clean for interior and exterior upkeep.',
    info: 'A once-off maintenance clean covering cabin and exterior surfaces. Ideal when your vehicle needs a quality refresh without full correction work.',
    bullets: ['Interior + exterior wash', 'Ideal for regular upkeep', 'Mobile on-site service']
  },
  {
    id: 'detail-single',
    category: 'one-time',
    title: 'Detail Interior & Exterior',
    price: 'R399',
    priceMin: 399,
    priceMax: 399,
    washCount: 1,
    desc: 'Single-use full detail option for interior and exterior.',
    info: 'A deeper once-off detailing package for both interior and exterior, with added attention to grime buildup and finish quality.',
    bullets: ['Deeper interior attention', 'Exterior detail finish', 'Paint correction can be added']
  },
  {
    id: 'interior-single',
    category: 'one-time',
    title: 'Interior Detail Only',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    desc: 'Focused interior-only clean for seats, trims, and surfaces.',
    info: 'Interior-only treatment for seats, mats, plastics, trims, and touch points when the cabin needs focused care.',
    bullets: ['Interior-focused service', 'Great for regular reset', 'Mobile on-site convenience']
  },
  {
    id: 'exterior-single',
    category: 'one-time',
    title: 'Exterior Detail Only',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    desc: 'Focused exterior-only clean with optional paint correction add-on.',
    info: 'Exterior-only service focused on bodywork, glass, and wheels. Best when the paintwork needs a clean presentation boost.',
    bullets: ['Exterior-focused service', 'Paint correction can be added', 'Ideal before events']
  },
  {
    id: 'basic-weekly',
    category: 'subscription',
    title: 'Basic Wash (Weekly)',
    price: 'R799 / month',
    priceMin: 799,
    priceMax: 799,
    washCount: 4,
    desc: 'Recurring weekly basic wash package.',
    info: 'Monthly subscription with one visit per week (about four visits per month) to keep your vehicle consistently clean.',
    bullets: ['Weekly recurring schedule', 'Consistent monthly upkeep', 'Priority recurring slot']
  },
  {
    id: 'basic-biweekly',
    category: 'subscription',
    title: 'Basic Wash (Bi-Weekly)',
    price: 'R379 / month',
    priceMin: 379,
    priceMax: 379,
    washCount: 2,
    desc: 'Recurring bi-weekly basic wash option.',
    info: 'Monthly plan with two maintenance visits per month for lighter-use vehicles that still need regular care.',
    bullets: ['Bi-weekly schedule', 'Lower monthly commitment', 'Convenient recurring care']
  },
  {
    id: 'detail-biweekly',
    category: 'subscription',
    title: 'Detail Interior & Exterior (Bi-Weekly)',
    price: 'R699 / month',
    priceMin: 699,
    priceMax: 699,
    washCount: 2,
    desc: 'Bi-weekly recurring detail plan for higher finish consistency.',
    info: 'Two detailed visits per month with stronger interior and exterior attention than a basic maintenance wash.',
    bullets: ['Bi-weekly detail service', 'Interior + exterior attention', 'Recurring premium upkeep']
  },
  {
    id: 'special-pack',
    category: 'subscription',
    title: 'Special Pack (Week 1 Detail + Weeks 2-4 Basic Wash)',
    price: 'R1049 / month',
    priceMin: 1049,
    priceMax: 1049,
    washCount: 4,
    desc: 'Monthly structure with 1 deep detail followed by 3 weekly basic washes.',
    info: 'Hybrid monthly plan: one deeper detail in week 1, then three upkeep washes for ongoing presentation through the month.',
    bullets: ['Week 1 full detail', 'Weeks 2-4 basic wash', 'Best-value monthly presentation plan']
  }
];

export const bookingAddOns = [
  { id: 'paint-correction', label: 'Paint Correction (pricing below)', description: 'Machine polishing add-on that reduces swirl marks, oxidation, and light paint imperfections. Step options are selected below.', priceMin: 0, priceMax: 0 },
  { id: 'headlight-restoration', label: 'Headlight Restoration (R349-R449)', description: 'Restores cloudy or yellowed headlights to improve clarity, appearance, and night-time light output.', priceMin: 349, priceMax: 449 },
  { id: 'windshield-ceramic', label: 'Windshield Ceramic Coating (+R70)', description: 'Hydrophobic coating for the front windshield that helps water bead and roll off more easily.', priceMin: 70, priceMax: 70 },
  { id: 'pet-hair-removal', label: 'Pet Hair Removal (+R150)', description: 'Extra time and tools to remove embedded pet hair from seats, carpets, and boot areas.', priceMin: 150, priceMax: 150 },
  { id: 'dash-protection', label: 'Dash Protection Layer (+R49)', description: 'Protective interior dressing applied to dashboard plastics to reduce fading and dust adhesion.', priceMin: 49, priceMax: 49 },
  { id: 'leather-protection', label: 'Leather Seats Protection (+R49)', description: 'Conditioning and protection layer for leather seats to support softness and help resist cracking.', priceMin: 49, priceMax: 49 },
  { id: 'engine-bay', label: 'Engine Bay Cleaning (+R149)', description: 'Safe cleaning and dressing of visible engine bay surfaces for a neater, maintained look.', priceMin: 149, priceMax: 149 },
  { id: 'wax-application', label: 'Wax Application (+R199)', description: 'Protective wax layer that adds gloss and short-term protection against environmental fallout.', priceMin: 199, priceMax: 199 }
];

export const paintCorrectionOptions = [
  { id: 'step-1', label: '1 Step Paint Correction (R649-R849 depending on vehicle size)', priceMin: 649, priceMax: 849 },
  { id: 'step-2', label: '2 Step Paint Correction (R949-R1149 depending on vehicle size)', priceMin: 949, priceMax: 1149 },
  { id: 'ceramic-coating', label: 'Add Ceramic Coating (+R399)', priceMin: 399, priceMax: 399 }
];

export const gallery = [
  { src: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Before-After1.png', alt: 'Before and after vehicle detail one', title: 'Before / After Transformation 1' },
  { src: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Before-After2.png', alt: 'Before and after vehicle detail two', title: 'Before / After Transformation 2' },
  { src: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Before-After3.png', alt: 'Before and after vehicle detail three', title: 'Before / After Transformation 3' },
  { src: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Before-After4.png', alt: 'Before and after vehicle detail four', title: 'Before / After Transformation 4' },
  { src: 'https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Lifestyle2.png', alt: 'Premium detailing lifestyle shot', title: 'Premium Mobile Care' }
];

export const whyChoose = [
  'We come to you',
  'Premium finish every visit',
  'Reliable recurring plans',
  'Professional and respectful service',
  'Suitable for homes, farms, and workplaces'
];

export const steps = [
  { title: 'Choose a service', text: 'Pick the wash/detail package that matches your vehicle and schedule.' },
  { title: 'Book your slot', text: 'Send your preferred date/time and location with quick contact details.' },
  { title: 'We detail on-site', text: 'Our team arrives equipped and completes the service at your location.' },
  { title: 'Enjoy the result', text: 'You get a clean, polished vehicle without leaving home or work.' }
];

export const testimonials = [
  {
    name: 'M. Taylor',
    quote:
      'Super easy to book, showed up on time, and the car looked showroom-ready. Best mobile detail we have used.'
  }
];
