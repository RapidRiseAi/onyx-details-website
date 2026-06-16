# Onyx Details Website

Premium dark-theme mobile car-detailing website for **Onyx Details** (Mpumalanga, South Africa).

Built with **Next.js 15** (App Router) + **Tailwind CSS**, exported as a static site and deployed on **Cloudflare Pages**.

## Setup

```bash
npm install
npm run dev      # local dev at http://localhost:3000
npm run build    # static export to ./out
```

## Deployment (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `out`
- `next.config.mjs` uses `output: 'export'` (fully static — no server runtime).
- `public/_headers` applies security headers (CSP, HSTS, X-Frame-Options, etc.) and long-cache rules for static assets on Cloudflare Pages.

## Editing content

Almost all copy, pricing, services, gallery, and contact details live in one file:

- **`src/content/siteContent.ts`** — nav, contact info, hero, stats, services + add-ons, gallery, About content, steps, testimonials.

## Images (important — performance)

Images are **self-hosted and optimised** (WebP) in `public/assets/images/**`, *not* hot-linked from GitHub.

- Source PNGs live in the repo root.
- To (re)generate optimised WebP, run the conversion with `sharp` (see `scripts`/commit history) and place outputs under `public/assets/images/...`, then reference them from `siteContent.ts`.
- The hero is preloaded with `fetchPriority="high"` in `src/app/layout.tsx` (responsive desktop/mobile sources).

Guideline: keep the hero ≤ ~250 KB and below-the-fold images `loading="lazy"`.

## Booking form

- Component: `src/components/booking-request-form.tsx`
- Submits JSON to a Google Apps Script Web App (`BOOKING_WEBHOOK_URL`).
- Includes a POPIA consent checkbox linking to `/privacy-policy`.
- Backend script: `GOOGLE_APPS_SCRIPT_BOOKING.gs` (Sheet insert, Drive photo upload, email notifications).

> ⚠️ See **`SECURITY_AND_BACKEND_NOTES.md`** for outstanding backend hardening (anti-abuse / open-relay mitigation) that must be applied on the Apps Script side.

## SEO

- `src/app/robots.ts` and `src/app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml`.
- Metadata is defined per-page via the Next `metadata` export.
