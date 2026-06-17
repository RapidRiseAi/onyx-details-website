import Link from 'next/link';
import { ArrowRight, CalendarCheck, CalendarDays, Car, ListChecks, MapPin, Quote, Smartphone, Sparkles, Star } from 'lucide-react';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { ServiceCard } from '@/components/ui/service-card';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { contact, gallery, hero, services, stats, steps, testimonials } from '@/content/siteContent';

const stepIcons = [ListChecks, CalendarCheck, Car, Sparkles];
const statIcons = [MapPin, Smartphone, Sparkles, CalendarDays];

export default function HomePage() {
  const beforeAfterGallery = gallery.filter((item) => item.category === 'before-after');
  const oneTimeServices = services.filter((service) => service.category === 'one-time');
  const subscriptionServices = services.filter((service) => service.category === 'subscription');

  return (
    <div className="-mt-10 space-y-16 md:space-y-24">
      {/* HERO — desktop (unchanged design, now self-hosted + priority loaded) */}
      <section className="relative left-1/2 right-1/2 -mx-4 hidden w-screen -translate-x-1/2 overflow-hidden md:-mx-6 md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} width={1920} height={792} fetchPriority="high" decoding="async" className="h-[clamp(560px,72vh,700px)] w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(148,163,184,0.28),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.78)_30%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-[96rem] items-center px-6">
          <div className="max-w-[52rem] -translate-y-3">
            <p className="text-sm font-normal uppercase tracking-[0.48em] text-white">Mobile Car Detailing</p>
            <h1 className="mt-9 text-[clamp(2.5rem,3.85vw,4.2rem)] font-medium uppercase leading-[1.12] tracking-[0.04em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              <span className="block">We Bring The</span>
              <span className="block"><span className="bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#a97913] bg-clip-text text-transparent">Showroom</span> To You</span>
            </h1>
            <p className="mt-8 max-w-3xl text-2xl font-light leading-relaxed tracking-[0.02em] text-white">
              Premium car care at your home or office.<br />
              Professional detailing. Pristine results.
            </p>
            <div className="mt-12 flex flex-wrap gap-10">
              <Link href="/services" className="min-w-56 rounded-md bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#b8871c] px-10 py-5 text-center text-lg font-medium uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(212,175,55,0.36)] transition hover:brightness-110">View Packages</Link>
              <Link href="/contact" className="min-w-56 rounded-md border border-[#d4af37]/55 bg-black/15 px-10 py-5 text-center text-lg font-medium uppercase tracking-[0.24em] text-zinc-100 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">Book Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HERO — mobile only: premium editorial card (desktop hero above is untouched) */}
      <section className="-mt-6 md:hidden">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.imageMobile}
            alt={hero.title}
            width={960}
            height={396}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/82 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          <div className="relative flex min-h-[31rem] flex-col px-6 pb-7 pt-8">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-gold">Premium Car Care</p>
            <div className="mt-3 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
            <h1 className="mt-6 font-display text-[2.5rem] font-semibold uppercase leading-[1.04] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              <span className="block">We Bring The</span>
              <span className="block text-gold-gradient">Showroom</span>
              <span className="block">To You</span>
            </h1>
            <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-zinc-200">
              Premium car care at your home or office. Professional detailing. Pristine results.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-9">
              <Link href="/services" className="flex items-center justify-center rounded-xl bg-gold-gradient px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.08em] leading-tight text-black shadow-glow-sm">
                View Packages
              </Link>
              <Link href="/contact" className="flex items-center justify-center rounded-xl border border-gold/55 bg-black/25 px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.08em] leading-tight text-zinc-100 backdrop-blur-sm">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / STATS BAND — desktop (unchanged) */}
      <Reveal className="hidden md:block">
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-800/60 px-5 py-7 text-center">
              <p className="font-display text-4xl font-semibold text-gold-gradient">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* TRUST / STATS — mobile only: stacked premium rows matching the mockup */}
      <Reveal className="md:hidden">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {stats.map((stat, index) => {
            const Icon = statIcons[index] ?? Sparkles;
            return (
              <div
                key={stat.title}
                className={`flex items-center gap-4 px-5 py-5 ${index > 0 ? 'border-t border-white/10' : ''}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon size={20} />
                </span>
                <span className="w-[4.25rem] shrink-0 whitespace-nowrap py-0.5 font-display text-[1.55rem] font-semibold leading-[1.18] text-gold-gradient">{stat.value}</span>
                <span className="min-w-0 border-l border-white/10 pl-4">
                  <span className="block text-[0.8rem] font-semibold uppercase leading-tight tracking-[0.06em] text-white">{stat.title}</span>
                  <span className="mt-1 block text-xs text-zinc-400">{stat.sub}</span>
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* SERVICES */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="Detailing Packages"
            subtitle="Once-off washes, full details, paint correction, and recurring maintenance plans, all delivered at your location."
          />
        </Reveal>
        <Reveal delay={80}>
          <h3 className="mt-8 eyebrow !text-zinc-400">Once-off services</h3>
          <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {oneTimeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </MobileSnapCarousel>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="mt-10 eyebrow !text-zinc-400">Subscription services</h3>
          <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {subscriptionServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </MobileSnapCarousel>
        </Reveal>
        <Reveal delay={140} className="pt-2">
          <Link href="/services" className="btn-outline">View all packages <ArrowRight size={15} /></Link>
        </Reveal>
      </Section>

      {/* BEFORE & AFTER */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Proof in the paint" title="Before & After Results" />
        </Reveal>
        <Reveal delay={80}>
          <MobileSnapCarousel desktopMode="carousel" itemClassName="w-[92%] md:w-[32%]" showPagination={false}>
            {beforeAfterGallery.map((item) => (
              <Card key={item.src} className="group overflow-hidden p-0">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} loading="lazy" className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <p className="px-4 py-3 text-sm text-zinc-300">{item.title}</p>
              </Card>
            ))}
          </MobileSnapCarousel>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/gallery" className="btn-outline">View full gallery <ArrowRight size={15} /></Link>
        </Reveal>
      </Section>

      {/* CONVENIENCE */}
      <Reveal>
        <Section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/about/convenience.webp"
                alt="Built around convenience"
                loading="lazy"
                className="h-72 w-full object-cover md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            </div>
            <div>
              <p className="eyebrow">The Onyx difference</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
                Built Around Convenience, Quality &amp; Consistency
              </h2>
              <div className="gold-divider mt-4" />
              <p className="mt-5 text-base leading-relaxed text-zinc-400">
                Onyx Details exists to make vehicle care easier without compromising on quality. We bring the setup, process, and reliability to your location.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
                {['Home visits', 'Farm / worksite ready', 'Recurring options'].map((item) => (
                  <span key={item} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-zinc-200">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* HOW IT WORKS */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Simple process" title="How It Works" align="center" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Sparkles;
            return (
              <Reveal key={step.title} delay={index * 90}>
                <Card className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-4xl font-semibold text-white/10">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="What clients say" title="Client Feedback" align="center" />
        </Reveal>
        <div className="mx-auto max-w-3xl">
          {testimonials.map((item) => (
            <Reveal key={item.name}>
              <Card className="relative p-8 text-center md:p-10">
                <Quote className="mx-auto text-gold/40" size={36} />
                <div className="mt-4 flex justify-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-relaxed text-zinc-100 md:text-2xl">“{item.quote}”</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{item.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">Verified client</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Reveal>
        <section className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/[0.12] via-ink-800 to-ink-800 px-6 py-14 text-center md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-20%,rgba(212,175,55,0.18),transparent_70%)]" />
          <div className="relative">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Bring the showroom finish to your driveway
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-300">
              Book in minutes. We arrive fully equipped, on time, and leave your vehicle pristine.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold">Book Now <ArrowRight size={16} /></Link>
              <Link href={contact.whatsapp} className="btn-outline">Ask on WhatsApp</Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
