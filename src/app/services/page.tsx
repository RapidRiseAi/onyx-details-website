import { services } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="max-w-3xl text-zinc-300">Choose from one-off washes, full details, and recurring maintenance plans tailored to your schedule.</p>
      <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id}>
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-gold">{service.price}</p>
            <p className="mt-2 text-zinc-300">{service.desc}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Card>
        ))}
      </MobileSnapCarousel>
    </div>
  );
}
