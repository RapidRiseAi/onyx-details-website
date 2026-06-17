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
  logo: '/assets/logos/onyx-logo.webp'
};

export const hero = {
  title: 'We Bring The Showroom To You',
  subtitle: 'Premium car care at your home or office. Professional detailing. Pristine results.',
  image: '/assets/images/hero/hero.webp',
  imageMobile: '/assets/images/hero/hero-mobile.webp'
};

// Trust band shown on the homepage.
// `label` is used by the desktop band; `title` + `sub` are used by the mobile stacked rows.
export const stats = [
  { value: '5+', label: 'Towns served across Mpumalanga', title: 'Towns served', sub: 'across Mpumalanga' },
  { value: '100%', label: 'Mobile service, we come to you', title: 'Mobile service', sub: 'we come to you' },
  { value: '10+', label: 'Detailing & add-on services', title: 'Detailing & add-on', sub: 'services' },
  { value: '7-Day', label: 'Recurring care plans available', title: 'Recurring care plans', sub: 'available' }
];

export const services = [
  {
    id: 'basic-wash-single',
    category: 'one-time',
    title: 'Basic Wash (Interior & Exterior)',
    image: '/assets/images/services/basic-wash.webp',
    imageAlt: 'Basic interior and exterior wash service',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    includesInteriorDetail: false,
    includesExteriorDetail: false,
    desc: 'Single-use clean for interior and exterior upkeep.',
    info: 'A once-off maintenance clean covering cabin and exterior surfaces. Ideal when your vehicle needs a quality refresh without full correction work.',
    bullets: ['Interior + exterior wash', 'Ideal for regular upkeep', 'Mobile on-site service']
  },
  {
    id: 'detail-single',
    category: 'one-time',
    title: 'Detail Interior & Exterior',
    image: '/assets/images/services/detail.webp',
    imageAlt: 'Exterior and interior detail service',
    price: 'R399',
    priceMin: 399,
    priceMax: 399,
    washCount: 1,
    includesInteriorDetail: true,
    includesExteriorDetail: true,
    desc: 'Single-use full detail option for interior and exterior.',
    info: 'A deeper once-off detailing package for both interior and exterior, with added attention to grime buildup and finish quality.',
    bullets: ['Deeper interior attention', 'Exterior detail finish', 'Paint correction can be added']
  },
  {
    id: 'interior-single',
    category: 'one-time',
    title: 'Interior Detail Only',
    image: '/assets/images/services/interior.webp',
    imageAlt: 'Interior detail service',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    includesInteriorDetail: true,
    includesExteriorDetail: false,
    desc: 'Focused interior-only clean for seats, trims, and surfaces.',
    info: 'Interior-only treatment for seats, mats, plastics, trims, and touch points when the cabin needs focused care.',
    bullets: ['Interior-focused service', 'Great for regular reset', 'Mobile on-site convenience']
  },
  {
    id: 'exterior-single',
    category: 'one-time',
    title: 'Exterior Detail Only',
    image: '/assets/images/services/exterior.webp',
    imageAlt: 'Exterior detail service',
    price: 'R219',
    priceMin: 219,
    priceMax: 219,
    washCount: 1,
    includesInteriorDetail: false,
    includesExteriorDetail: true,
    desc: 'Focused exterior-only clean with optional paint correction add-on.',
    info: 'Exterior-only service focused on bodywork, glass, and wheels. Best when the paintwork needs a clean presentation boost.',
    bullets: ['Exterior-focused service', 'Paint correction can be added', 'Ideal before events']
  },
  {
    id: 'paint-correction-gloss-revival',
    category: 'one-time',
    title: 'Gloss Revival Paint Correction',
    image: '/assets/images/services/gloss-revival.webp',
    imageAlt: 'Gloss revival paint correction service',
    price: 'R1699 to R1999',
    priceMin: 1699,
    priceMax: 1999,
    washCount: 1,
    includesInteriorDetail: false,
    includesExteriorDetail: true,
    isPaintCorrection: true,
    desc: 'One-stage paint correction with an exterior detail included. Interior detail is optional.',
    info: 'Best for light swirl marks, dull paint, water spots, and minor fading. Includes exterior detailing and one polishing stage to restore shine and clarity, but does not include interior detailing.',
    bullets: ['Exterior detail included', 'Interior detail optional add-on', 'Best for lighter defects and gloss revival']
  },
  {
    id: 'paint-correction-deep-clarity',
    category: 'one-time',
    title: 'Deep Clarity Paint Correction',
    image: '/assets/images/services/deep-clarity.webp',
    imageAlt: 'Deep clarity paint correction service',
    price: 'R2299 to R2499',
    priceMin: 2299,
    priceMax: 2499,
    washCount: 1,
    includesInteriorDetail: false,
    includesExteriorDetail: true,
    isPaintCorrection: true,
    desc: 'Two-stage paint correction with an exterior detail included. Interior detail is optional.',
    info: 'Best for heavier swirl marks, oxidation, deeper scratches, holograms, and dull paint. Includes exterior detailing, a cutting stage, and a refining polish, but does not include interior detailing.',
    bullets: ['Exterior detail included', 'Interior detail optional add-on', 'Best for heavier defects and deeper clarity']
  },
  {
    id: 'basic-weekly',
    category: 'subscription',
    title: 'Basic Wash (Weekly)',
    image: '/assets/images/services/basic-wash.webp',
    imageAlt: 'Basic recurring wash service',
    price: 'R799 / month',
    priceMin: 799,
    priceMax: 799,
    washCount: 4,
    includesInteriorDetail: false,
    includesExteriorDetail: false,
    desc: 'Recurring weekly basic wash package.',
    info: 'Monthly subscription with one visit per week (about four visits per month) to keep your vehicle consistently clean.',
    bullets: ['Weekly recurring schedule', 'Consistent monthly upkeep', 'Priority recurring slot']
  },
  {
    id: 'basic-biweekly',
    category: 'subscription',
    title: 'Basic Wash (Bi-Weekly)',
    image: '/assets/images/services/basic-wash.webp',
    imageAlt: 'Basic recurring wash service',
    price: 'R379 / month',
    priceMin: 379,
    priceMax: 379,
    washCount: 2,
    includesInteriorDetail: false,
    includesExteriorDetail: false,
    desc: 'Recurring bi-weekly basic wash option.',
    info: 'Monthly plan with two maintenance visits per month for lighter-use vehicles that still need regular care.',
    bullets: ['Bi-weekly schedule', 'Lower monthly commitment', 'Convenient recurring care']
  },
  {
    id: 'detail-biweekly',
    category: 'subscription',
    title: 'Detail Interior & Exterior (Bi-Weekly)',
    image: '/assets/images/services/detail.webp',
    imageAlt: 'Recurring interior and exterior detail service',
    price: 'R699 / month',
    priceMin: 699,
    priceMax: 699,
    washCount: 2,
    includesInteriorDetail: true,
    includesExteriorDetail: true,
    desc: 'Bi-weekly recurring detail plan for higher finish consistency.',
    info: 'Two detailed visits per month with stronger interior and exterior attention than a basic maintenance wash.',
    bullets: ['Bi-weekly detail service', 'Interior + exterior attention', 'Recurring premium upkeep']
  },
  {
    id: 'special-pack',
    category: 'subscription',
    title: 'Special Pack (Week 1 Detail + Weeks 2-4 Basic Wash)',
    image: '/assets/images/services/detail.webp',
    imageAlt: 'Monthly detail and wash special pack',
    price: 'R1049 / month',
    priceMin: 1049,
    priceMax: 1049,
    washCount: 4,
    includesInteriorDetail: true,
    includesExteriorDetail: true,
    desc: 'Monthly structure with 1 deep detail followed by 3 weekly basic washes.',
    info: 'Hybrid monthly plan: one deeper detail in week 1, then three upkeep washes for ongoing presentation through the month.',
    bullets: ['Week 1 full detail', 'Weeks 2-4 basic wash', 'Best-value monthly presentation plan']
  }
];

export const bookingAddOns = [
  { id: 'interior-detail', label: 'Interior Detail Add-on', description: 'Adds an interior detail to a service that does not already include interior detailing. Paint correction services receive this add-on at R199.', priceMin: 219, priceMax: 219, paintCorrectionPriceMin: 199, paintCorrectionPriceMax: 199 },
  { id: 'paint-correction', label: 'Paint Correction Add-on (pricing below)', description: 'Machine polishing add-on that reduces swirl marks, oxidation, and light paint imperfections. Step options are selected below. If your main service includes an exterior detail, paint correction add-on pricing is discounted by R99.', priceMin: 0, priceMax: 0 },
  { id: 'ceramic-coating', label: 'Ceramic Coating (+R699)', description: 'Protective ceramic layer that helps repel water, contamination, and UV exposure while enhancing gloss.', priceMin: 699, priceMax: 699 },
  { id: 'headlight-restoration', label: 'Headlight Restoration (R349 to R449)', description: 'Restores cloudy or yellowed headlights to improve clarity, appearance, and night-time light output.', priceMin: 349, priceMax: 449 },
  { id: 'windshield-ceramic', label: 'Windshield Ceramic Coating (+R70)', description: 'Hydrophobic coating for the front windshield that helps water bead and roll off more easily.', priceMin: 70, priceMax: 70 },
  { id: 'pet-hair-removal', label: 'Pet Hair Removal (+R150)', description: 'Extra time and tools to remove embedded pet hair from seats, carpets, and boot areas.', priceMin: 150, priceMax: 150 },
  { id: 'dash-protection', label: 'Dash Protection Layer (+R49)', description: 'Protective interior dressing applied to dashboard plastics to reduce fading and dust adhesion.', priceMin: 49, priceMax: 49 },
  { id: 'leather-protection', label: 'Leather Seats Protection (+R49)', description: 'Conditioning and protection layer for leather seats to support softness and help resist cracking.', priceMin: 49, priceMax: 49 },
  { id: 'engine-bay', label: 'Engine Bay Cleaning (+R149)', description: 'Safe cleaning and dressing of visible engine bay surfaces for a neater, maintained look.', priceMin: 149, priceMax: 149 },
  { id: 'wax-application', label: 'Wax Application (+R199)', description: 'Protective wax layer that adds gloss and short-term protection against environmental fallout.', priceMin: 199, priceMax: 199 }
];

export const paintCorrectionOptions = [
  {
    id: 'step-1',
    title: 'Gloss Revival Polish',
    label: 'Gloss Revival Polish (R1699 to R1999 depending on vehicle size)',
    description:
      'Best for vehicles with light swirl marks, dull paint, water spots, and minor fading. This service uses one polishing stage to restore shine, improve clarity, and make the paint look cleaner and glossier without going into heavy defect removal. Ideal for newer or well-maintained vehicles.',
    priceMin: 1699,
    priceMax: 1999
  },
  {
    id: 'step-2',
    title: 'Deep Clarity Correction',
    label: 'Deep Clarity Correction (R2299 to R2499 depending on vehicle size)',
    description:
      'Best for vehicles with heavier swirl marks, oxidation, deeper scratches, holograms, and dull paint. This service uses a cutting stage to remove more visible defects, followed by a refining polish to bring back deep gloss and a smoother finish. Ideal for older, neglected, or darker coloured vehicles.',
    priceMin: 2299,
    priceMax: 2499
  }
];

export const gallery = [
  { src: '/assets/images/gallery/before-after/ba-1.webp', category: 'before-after', alt: 'Before and after vehicle detail one', title: 'Before / After Transformation 1' },
  { src: '/assets/images/gallery/before-after/ba-2.webp', category: 'before-after', alt: 'Before and after vehicle detail two', title: 'Before / After Transformation 2' },
  { src: '/assets/images/gallery/before-after/ba-3.webp', category: 'before-after', alt: 'Before and after vehicle detail three', title: 'Before / After Transformation 3' },
  { src: '/assets/images/gallery/before-after/ba-4.webp', category: 'before-after', alt: 'Before and after vehicle detail four', title: 'Before / After Transformation 4' },
  { src: '/assets/images/gallery/lifestyle/lifestyle.webp', category: 'lifestyle', alt: 'Premium detailing lifestyle shot', title: 'Premium Mobile Care' }
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

// About page content
export const aboutValues = [
  {
    title: 'Showroom-grade finish',
    text: 'Every visit is treated like a presentation detail: consistent, careful, and finished to a standard you can see.'
  },
  {
    title: 'Total convenience',
    text: 'We arrive fully equipped at your home, farm, or workplace. No queues, no driving across town, no wasted weekends.'
  },
  {
    title: 'Reliable & respectful',
    text: 'Clear communication, on-time arrivals, and respect for your space and vehicle on every single booking.'
  }
];

export const aboutImages = {
  promise: '/assets/images/about/promise.webp',
  team1: '/assets/images/about/about-1.webp',
  team2: '/assets/images/about/about-2.webp',
  convenience: '/assets/images/about/convenience.webp'
};

export const testimonials = [
  {
    name: 'M. Taylor',
    quote:
      'Super easy to book, showed up on time, and the car looked showroom-ready. Best mobile detail we have used.'
  }
];
