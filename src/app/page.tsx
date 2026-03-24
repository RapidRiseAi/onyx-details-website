import Link from 'next/link';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { gallery, hero, services, steps, testimonials, whyChoose } from '@/content/siteContent';

export default function HomePage() {
  const beforeAfterGallery = gallery.filter((item) => item.src.includes('Before-After'));

  return (
    <div className="space-y-10">
      <section className="relative -mx-4 hidden w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} className="h-[82vh] min-h-[620px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-6xl items-center px-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Premium mobile vehicle care</p>
            <h1 className="mt-4 max-w-3xl font-serif text-7xl font-semibold leading-[1.03]">
              Premium Mobile Car Wash and Detailing at Your Home, Farm, or Workplace
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-200">{hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-full px-6 py-3">Book Now</Button>
              <Link href="/services" className="rounded-full border border-gold/80 px-6 py-3 font-semibold text-zinc-100">View Services</Link>
              <Link href="https://wa.me/15551234567" className="rounded-full border border-zinc-500 px-6 py-3 font-semibold text-zinc-100">Ask on WhatsApp</Link>
            </div>
          </div>
        </div>
      </section>

      <Section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} className="h-48 w-full rounded-xl object-cover" />
        <p className="text-xs uppercase tracking-[0.22em] text-blue-400">Business Systems</p>
        <h1 className="font-serif text-5xl font-semibold leading-[1.03]">Premium Mobile Car Wash and Detailing</h1>
        <p className="text-zinc-300">{hero.subtitle}</p>
        <div className="grid grid-cols-2 gap-3">
          <Button className="w-full rounded-2xl py-3">Book Now</Button>
          <Link href="/services" className="rounded-2xl border border-zinc-600 px-4 py-3 text-center font-semibold">View Services</Link>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">Why Choose OnyxDetails</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => (
            <Card key={item}>{item}</Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">Services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id}>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-gold">{service.price}</p>
              <p className="mt-2 text-sm text-zinc-300">{service.desc}</p>
              <Button className="mt-4 w-full">Book This Service</Button>
            </Card>
          ))}
        </MobileSnapCarousel>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">Before &amp; After Results</h2>
        <MobileSnapCarousel desktopMode="carousel" itemClassName="w-[92%] md:w-[32%]" showPagination={false}>
          {beforeAfterGallery.map((item) => (
            <Card key={item.src} className="space-y-2 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="h-56 w-full rounded-lg object-cover" />
              <p className="px-2 pb-2 text-sm text-zinc-300">{item.title}</p>
            </Card>
          ))}
        </MobileSnapCarousel>
        <Link href="/gallery" className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm">View full gallery</Link>
      </Section>

      <Section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Built-Around-Convenience.png"
            alt="Built around convenience"
            className="h-64 w-full rounded-xl object-cover"
          />
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Built Around Convenience, Quality, and Consistency</h2>
            <p className="text-zinc-300">
              OnyxDetails exists to make vehicle care easier without compromising on quality. We bring the setup, process, and reliability to your location.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Home visits', 'Farm/worksite ready', 'Recurring options'].map((item) => (
                <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-xs uppercase tracking-wide text-gold">Step {index + 1}</p>
              <h3 className="mt-1 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{step.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">Client Feedback</h2>
        {testimonials.map((item) => (
          <Card key={item.name}>
            <p className="text-zinc-200">“{item.quote}”</p>
            <p className="mt-3 text-sm text-zinc-400">— {item.name}</p>
          </Card>
        ))}
      </Section>
    </div>
  );
}
