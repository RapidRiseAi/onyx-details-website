# Security, Privacy & Backend Hardening Notes

This document tracks compliance and security items for the Onyx Details site. Items marked
**[done in site]** are already implemented in this codebase. Items marked **[action needed]**
require changes you must apply outside this repo (mainly the Google Apps Script / Google account)
because the frontend alone cannot enforce them.

---

## 1. Open email-relay / spam abuse on the booking endpoint — **[action needed] 🔴 High**

**Risk.** The booking endpoint URL (`script.google.com/macros/s/.../exec`) ships in the public
JS bundle and accepts anonymous POSTs. The Apps Script sends a confirmation email to
`payload.clientEmail`. An attacker who reads the URL can therefore send emails *from your Google
account to any address they choose*, and can flood your Sheet, Drive, and inbox.

**Fix (in `GOOGLE_APPS_SCRIPT_BOOKING.gs` / Google):**
1. **Add a shared secret.** Have the site send a header/field token and reject any `doPost`
   without it. (Note: a public static site can't truly hide a secret, so combine with #2.)
2. **Add a CAPTCHA** — Cloudflare Turnstile is free and integrates well. Verify the Turnstile
   token server-side in `doPost` before doing anything else.
3. **Rate-limit** by IP/email using `PropertiesService`/`CacheService` (e.g. max N submissions
   per email/hour).
4. **Don't email user-supplied addresses unverified** — or send the customer confirmation only
   after a basic sanity/allowlist check, and keep the company notification as the primary path.
5. **Validate & cap uploads** server-side (file count, per-file size, allowed MIME types) before
   `Utilities.base64Decode` writes them to Drive.

## 2. POPIA compliance — **[done in site] + [action needed]**

- **[done]** Rewrote `/privacy-policy` to cover responsible party / Information Officer, data
  collected, purpose & lawful basis, third-party operators (Google), retention, security, data-
  subject rights, and complaints to the Information Regulator.
- **[done]** Added an explicit consent checkbox to the booking form, linked to the policy, and the
  consent flag is included in the submitted payload.
- **[action needed]** Confirm the named **Information Officer** and register if required, and set a
  concrete **retention period** for bookings/photos in the Apps Script (e.g. auto-delete archived
  rows + Drive folders after N months).

## 3. Security headers — **[done in site]**

`public/_headers` (served by Cloudflare Pages) sets:
- `Content-Security-Policy` (restricts scripts/styles/img/connect; allows the Apps Script origin)
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy`, `Permissions-Policy`

> If you add new third-party origins (analytics, fonts, embeds), update the CSP `connect-src` /
> `script-src` accordingly or they will be blocked.

## 4. Form submission reliability — **[partially addressed] 🟠**

The form posts with `mode: 'no-cors'`, so the browser receives an **opaque** response and cannot
read success/failure from the server — only outright network failures are caught. The UI therefore
shows success optimistically.

**Options:** have the Apps Script return proper CORS headers and switch to a normal `fetch` so the
client can confirm receipt, **or** keep the company-notification email as the source of truth for
"did it arrive". Document whichever you choose.

## 5. Dependency CVEs — **[done in site]**

- Bumped **Next.js → 15.5.x**, which clears the previously-flagged *critical* advisories.
- One **moderate** advisory remains via `postcss` bundled in Next's build tooling; it is **build-
  time only** (not shipped to browsers) and does not affect the static output. Revisit on the next
  Next.js major bump.

## 6. Misc — **[done in site]**

- All images self-hosted (no `raw.githubusercontent.com` hot-linking → removes a reliability/ToS
  and information-leak concern).
- `robots.txt` + `sitemap.xml` added.
