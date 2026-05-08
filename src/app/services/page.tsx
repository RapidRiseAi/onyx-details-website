import { bookingAddOns, paintCorrectionOptions, services } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import { ServiceCard } from '@/components/ui/service-card';

const addOnPriceLabel = (addOn: (typeof bookingAddOns)[number]) => {
  if (addOn.id === 'interior-detail') return 'R219, or R199 with a paint correction service';
  if (addOn.id === 'paint-correction') return 'From R1699, or R99 less when the main service includes exterior detail';
  if (addOn.priceMin === addOn.priceMax) return `R${addOn.priceMin}`;
  return `R${addOn.priceMin} - R${addOn.priceMax}`;
};

export default function ServicesPage() {
  const oneTimeServices = services.filter((service) => service.category === 'one-time');
  const subscriptionServices = services.filter((service) => service.category === 'subscription');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="max-w-3xl text-zinc-300">Choose from once-off washes, full details, paint correction services, and recurring maintenance plans tailored to your schedule.</p>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-gold">Once-off services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
          {oneTimeServices.map((service) => (
            <ServiceCard key={service.id} service={service} showBullets />
          ))}
        </MobileSnapCarousel>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-gold">Subscription services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
          {subscriptionServices.map((service) => (
            <ServiceCard key={service.id} service={service} showBullets />
          ))}
        </MobileSnapCarousel>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm uppercase tracking-[0.18em] text-gold">Add-ons</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-300">These are optional upgrades shown for information only. You can select add-ons after choosing a main product on the booking form.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {bookingAddOns.map((addOn) => (
            <Card key={addOn.id} className="group relative">
              <div className="flex items-start justify-between gap-2">
                <h3 className="min-w-0 flex-1 font-semibold leading-tight">{addOn.label}</h3>
                <InfoPopover label={addOn.label} description={addOn.description ?? addOn.label} />
              </div>
              <p className="mt-1 text-sm text-gold">{addOnPriceLabel(addOn)}</p>
              {addOn.id === 'paint-correction' ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-400">
                  {paintCorrectionOptions.map((option) => (
                    <li key={option.id}>{option.label}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-zinc-300">{addOn.description}</p>
              )}
              <p className="pointer-events-none absolute inset-x-3 bottom-3 rounded-md border border-gold/50 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 opacity-0 shadow-lg transition group-hover:opacity-100">
                You can add this once you have selected a main product.
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
