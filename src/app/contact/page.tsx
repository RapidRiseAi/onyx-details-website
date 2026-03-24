import { Suspense } from 'react';
import { ContactServiceNotice } from '@/components/contact-service-notice';
import { contact } from '@/content/siteContent';

export default function ContactPage() {
  return (
    <div className="space-y-5">
      <section className="space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Built-Around-Convenience.png"
          alt="Mobile detailing at your location"
          className="h-56 w-full rounded-xl object-cover"
        />
        <h1 className="text-3xl font-bold">Contact</h1>
      </section>

      <p className="text-zinc-300">Call or message us to book your detailing service.</p>
      <Suspense fallback={null}>
        <ContactServiceNotice />
      </Suspense>
      <div className="grid gap-3 text-zinc-300 md:grid-cols-2">
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
      </div>
      <p className="text-zinc-400">Service areas: {contact.areas.join(', ')}</p>
      <a href={contact.whatsapp} className="inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950">Message on WhatsApp</a>
    </div>
  );
}
