import type { Metadata } from 'next';
import { bookingAddOns, paintCorrectionOptions, services } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import { ServiceCard } from '@/components/ui/service-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Once-off washes, full details, paint correction services, and recurring maintenance plans, plus optional add-ons.'
};

const addOnPriceLabel = (addOn: (typeof bookingAddOns)[number]) => {
  if (addOn.id === 'interior-detail') return 'R219, or R199 with a paint correction service';
  if (addOn.id === 'paint-correction') return 'From R1699, or R99 less when the main service includes exterior detail';
  if (addOn.priceMin === addOn.priceMax) return `R${addOn.priceMin}`;
  return `R${addOn.priceMin} to R${addOn.priceMax}`;
};

export default function ServicesPage() {
  const oneTimeServices = services.filter((service) => service.category === 'one-time');
  const subscriptionServices = services.filter((service) => service.category === 'subscription');

  return (
    <div className="space-y-14">
      <Reveal>
        <SectionHeading
          eyebrow="Services & pricing"
          title="Choose Your Detailing Package"
          subtitle="Once-off washes, full details, paint correction services, and recurring maintenance plans tailored to your schedule."
        >
          <h1 className="sr-only">Services</h1>
        </SectionHeading>
      </Reveal>

      <section className="space-y-4">
        <Reveal>
          <h2 className="eyebrow !text-zinc-400">Once-off services</h2>
        </Reveal>
        <Reveal delay={60}>
          <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {oneTimeServices.map((service) => (
              <ServiceCard key={service.id} service={service} showBullets />
            ))}
          </MobileSnapCarousel>
        </Reveal>
      </section>

      <section className="space-y-4">
        <Reveal>
          <h2 className="eyebrow !text-zinc-400">Subscription services</h2>
        </Reveal>
        <Reveal delay={60}>
          <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
            {subscriptionServices.map((service) => (
              <ServiceCard key={service.id} service={service} showBullets />
            ))}
          </MobileSnapCarousel>
        </Reveal>
      </section>

      <section className="space-y-5">
        <Reveal>
          <SectionHeading
            eyebrow="Optional upgrades"
            title="Add-ons"
            subtitle="These are optional upgrades shown for information only. You can select add-ons after choosing a main product on the booking form."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookingAddOns.map((addOn, index) => (
            <Reveal key={addOn.id} delay={(index % 3) * 70} as="article">
              <Card className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 flex-1 font-display font-semibold leading-tight text-white">{addOn.label}</h3>
                  <InfoPopover label={addOn.label} description={addOn.description ?? addOn.label} />
                </div>
                <p className="mt-2 w-fit rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">{addOnPriceLabel(addOn)}</p>
                {addOn.id === 'paint-correction' ? (
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-400">
                    {paintCorrectionOptions.map((option) => (
                      <li key={option.id} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        <span>{option.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{addOn.description}</p>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
