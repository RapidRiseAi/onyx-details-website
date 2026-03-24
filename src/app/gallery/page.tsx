import { gallery } from '@/content/siteContent';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="text-zinc-300">Swipe through recent transformations and finished vehicle presentations.</p>
      <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.src} className="space-y-2 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} className="h-64 w-full rounded-xl object-cover" />
            <p className="px-2 pb-2 text-sm text-zinc-300">{item.title}</p>
          </Card>
        ))}
      </MobileSnapCarousel>
    </div>
  );
}
