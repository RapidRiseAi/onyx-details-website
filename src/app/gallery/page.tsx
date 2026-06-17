import type { Metadata } from 'next';
import { gallery } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Recent vehicle transformations and finished detailing presentations by Onyx Details.'
};

export default function GalleryPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Our work"
          title="Recent Transformations"
          subtitle="Swipe through recent transformations and finished vehicle presentations."
        >
          <h1 className="sr-only">Gallery</h1>
        </SectionHeading>
      </Reveal>
      <Reveal delay={60}>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <Card key={item.src} className="group overflow-hidden p-0">
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <p className="px-4 py-3 text-sm text-zinc-300">{item.title}</p>
            </Card>
          ))}
        </MobileSnapCarousel>
      </Reveal>
    </div>
  );
}
