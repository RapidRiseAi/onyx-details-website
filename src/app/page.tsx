import Link from 'next/link';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { gallery, hero, services, steps, testimonials, whyChoose } from '@/content/siteContent';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Section className="space-y-4">
        <h1 className="text-4xl font-bold">Premium Mobile Detailing</h1>
        <p className="max-w-2xl text-zinc-300">{hero.subtitle}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} className="h-64 w-full rounded-xl object-cover md:h-80" />
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
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <Card key={item.src} className="space-y-2 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="h-56 w-full rounded-lg object-cover" />
              <p className="px-2 pb-2 text-sm text-zinc-300">{item.title}</p>
            </Card>
          ))}
        </MobileSnapCarousel>
        <Link href="/gallery" className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm">View full gallery</Link>
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
