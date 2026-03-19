# OnyxDetails Website (Astro)

Premium dark-theme mobile detailing website for **OnyxDetails**.

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```
   (or `npm install` if preferred)
2. Run locally:
   ```bash
   bun run dev
   ```
3. Build for production:
   ```bash
   bun run build
   ```
4. Preview production build:
   ```bash
   bun run preview
   ```

## Cloudflare Pages deployment (recommended)

Use **Cloudflare Pages** for the default deployment flow.

- Framework preset: **Astro**
- Build command: `bun run build` (or `npm run build`)
- Build output directory: `dist`
- **Deploy command: leave empty** (do not use `npx wrangler deploy`)

### If your pipeline uses Wrangler (`wrangler deploy` or `wrangler versions upload`)

This repo includes `wrangler.jsonc` configured for static asset uploads from `dist` and a pre-deploy build command.

- `assets.directory` is set to `./dist`
- `build.command` is set to `bun run build`

This allows both of these commands to work in CI:

```bash
npx wrangler deploy
npx wrangler versions upload
```

### Why this matters

If `wrangler deploy` is used in a non-interactive CI run, Wrangler may attempt to auto-install and configure `@astrojs/cloudflare`, which can create adapter/version mismatches and fail with errors such as:

- `Package subpath './app/manifest' is not defined by "exports"`

This site is built to deploy as a static Astro Pages build, so adapter auto-configuration is unnecessary.


## Compatibility note

- Astro is pinned to the v6 line in `package.json` to stay compatible with current Cloudflare/Wrangler Astro integration behavior in CI environments.
- If you keep a `wrangler deploy` workflow, this reduces adapter-version mismatch risk versus older Astro major versions.

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
  - `public/assets/logos/onyxdetails-logo.svg` (or update `src/data/site.ts` to your preferred file)
- Swap placeholder images in:
  - `public/assets/images/hero`
  - `public/assets/images/services`
  - `public/assets/images/gallery/*`
  - `public/assets/images/placeholders`
