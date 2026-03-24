import Link from 'next/link';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { gallery, services } from '@/content/siteContent';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Premium Mobile Detailing</h1>
        <p className="max-w-2xl text-zinc-300">Book quality mobile detailing with a responsive experience built for both mobile and desktop.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Services</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-gold">{service.price}</p>
              <p className="mt-2 text-sm text-zinc-300">{service.desc}</p>
              <button className="mt-4 w-full rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-zinc-950">Book This Service</button>
            </article>
          ))}
        </MobileSnapCarousel>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.src} className="space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="h-56 w-full rounded-xl object-cover" />
              <p className="text-sm text-zinc-300">{item.title}</p>
            </article>
          ))}
        </MobileSnapCarousel>
        <Link href="/gallery" className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm">View full gallery</Link>
      </section>
    </div>
  );
}
