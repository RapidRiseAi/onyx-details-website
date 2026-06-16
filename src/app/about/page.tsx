import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { aboutImages, aboutValues, contact, whyChoose } from '@/content/siteContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Onyx Details delivers premium mobile detailing at homes, farms, and workplaces across Mpumalanga.'
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">About Onyx Details</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Premium care, <span className="text-gold-gradient">delivered to you</span>
          </h1>
          <div className="gold-divider mt-5" />
          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            Onyx Details delivers premium mobile detailing at homes, farms, and workplaces. Our focus is simple: consistent quality, professional communication, and reliable service that saves our clients time.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            We built our process to make regular detailing practical, not stressful, from booking through to the finished result.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/services" className="btn-gold">View Packages <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-outline">Book Now</Link>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={aboutImages.promise} alt="Onyx Details service promise" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="space-y-6">
        <Reveal>
          <SectionHeading eyebrow="What we stand for" title="Our Promise" align="center" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {aboutValues.map((value, index) => (
            <Reveal key={value.title} delay={index * 90}>
              <Card className="h-full p-6">
                <h3 className="font-display text-xl font-semibold text-white">{value.title}</h3>
                <div className="gold-divider mt-3" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{value.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team + why choose */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aboutImages.team1} alt="Onyx Details team at work" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aboutImages.team2} alt="Onyx Details detailing in progress" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Why clients choose us</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">A standard you can see</h2>
          <div className="gold-divider mt-4" />
          <ul className="mt-6 space-y-3">
            {whyChoose.map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-400">
            Serving {contact.areas.join(', ')} and surrounding areas.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
