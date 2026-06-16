import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { BookingRequestForm } from '@/components/booking-request-form';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Card } from '@/components/ui/card';
import { contact } from '@/content/siteContent';

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description: 'Call, WhatsApp, or send a booking request to Onyx Details for premium mobile detailing across Mpumalanga.'
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Get in touch"
          title="Book Your Detail"
          subtitle="Send a request and Kaden will confirm the final arrangements. Prefer to chat? Call or WhatsApp us directly."
        >
          <h1 className="sr-only">Contact</h1>
        </SectionHeading>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-4">
          <Card className="p-6">
            <h2 className="font-display text-xl font-semibold text-white">Contact details</h2>
            <div className="gold-divider mt-3" />
            <div className="mt-5 grid gap-4 text-sm">
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-zinc-300 transition hover:text-gold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold"><Phone size={16} /></span>
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-zinc-300 transition hover:text-gold">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold"><Mail size={16} /></span>
                {contact.email}
              </a>
              <a href={contact.whatsapp} className="flex items-center gap-3 text-zinc-300 transition hover:text-gold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold"><MessageCircle size={16} /></span>
                Message on WhatsApp
              </a>
              <div className="flex items-start gap-3 text-zinc-300">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold"><MapPin size={16} /></span>
                <span>{contact.areas.join(', ')}<br /><span className="text-zinc-500">Other areas on request; travel fees may apply outside Sabie.</span></span>
              </div>
              <div className="flex items-start gap-3 text-zinc-300">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold"><Clock size={16} /></span>
                <span>We typically respond the same day.</span>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <Suspense fallback={null}>
            <BookingRequestForm />
          </Suspense>
        </Reveal>
      </div>
    </div>
  );
}
