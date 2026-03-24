import Link from 'next/link';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { WorkProofGallery } from '@/components/ui/work-proof-gallery';
import { gallery, services } from '@/content/siteContent';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Section className="space-y-4">
        <h1 className="text-4xl font-bold">Premium Mobile Detailing</h1>
        <p className="max-w-2xl text-zinc-300">Book quality mobile detailing with a responsive experience built for both mobile and desktop.</p>
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
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <WorkProofGallery items={gallery} />
        <Link href="/gallery" className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm">View full gallery</Link>
      </Section>
    </div>
  );
}
