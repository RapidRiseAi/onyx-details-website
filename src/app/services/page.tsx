import { services } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import Link from 'next/link';

export default function ServicesPage() {
  const oneTimeServices = services.filter((service) => service.category === 'one-time');
  const subscriptionServices = services.filter((service) => service.category === 'subscription');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="max-w-3xl text-zinc-300">Choose from once-off washes, full details, and recurring maintenance plans tailored to your schedule.</p>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-gold">Once-off services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
          {oneTimeServices.map((service) => (
            <Card key={service.id}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="min-w-0 flex-1 text-xl font-semibold leading-tight">{service.title}</h3>
                <InfoPopover label={service.title} description={service.info ?? service.desc} />
              </div>
              <p className="text-gold">{service.price}</p>
              <p className="mt-2 text-zinc-300">{service.desc}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="mt-4 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950">
                Book This Service
              </Link>
            </Card>
          ))}
        </MobileSnapCarousel>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-gold">Subscription services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
          {subscriptionServices.map((service) => (
            <Card key={service.id}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="min-w-0 flex-1 text-xl font-semibold leading-tight">{service.title}</h3>
                <InfoPopover label={service.title} description={service.info ?? service.desc} />
              </div>
              <p className="text-gold">{service.price}</p>
              <p className="mt-2 text-zinc-300">{service.desc}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="mt-4 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950">
                Book This Service
              </Link>
            </Card>
          ))}
        </MobileSnapCarousel>
      </section>
    </div>
  );
}
