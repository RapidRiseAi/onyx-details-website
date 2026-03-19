# OnyxDetails Website (Astro)

Premium dark-theme mobile detailing website for **OnyxDetails**.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Cloudflare Pages deployment

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Astro

## Editable content

- Contact details: `src/data/contact.ts`
- Services and pricing: `src/data/services.ts`
- Testimonial content: `src/data/testimonials.ts`
- Gallery entries: `src/data/gallery.ts`
- SEO metadata: `src/data/seo.ts`
- Policy text: `src/data/policies.ts`

## Forms and Apps Script endpoints

Set both form endpoint URLs in:

- `src/data/endpoints.ts`
  - `bookingEndpoint`
  - `contactEndpoint`

Both forms submit JSON payloads to Google Apps Script Web App URLs.

## Booking modal behavior

- Reusable modal is implemented in `src/components/BookingModal.astro`.
- Trigger with any element containing `data-open-booking`.
- Service card buttons pass service details via:
  - `data-service-id`
  - `data-service-name`
- Script handling and submission logic: `src/scripts/booking.ts`

## Images and logo

- Place final transparent logo at:
  - `public/assets/logos/onyxdetails-logo.png`
- Swap placeholder images in:
  - `public/assets/images/hero`
  - `public/assets/images/services`
  - `public/assets/images/gallery/*`
  - `public/assets/images/placeholders`

