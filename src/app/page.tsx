import Link from 'next/link';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { Card } from '@/components/ui/card';
import { ServiceCard } from '@/components/ui/service-card';
import { Section } from '@/components/ui/section';
import { contact, gallery, hero, services, steps, testimonials } from '@/content/siteContent';

export default function HomePage() {
  const beforeAfterGallery = gallery.filter((item) => item.src.includes('Before-After'));
  const oneTimeServices = services.filter((service) => service.category === 'one-time');
  const subscriptionServices = services.filter((service) => service.category === 'subscription');

  return (
    <div className="-mt-10 space-y-10">
      <section className="relative left-1/2 right-1/2 -mx-4 hidden w-screen -translate-x-1/2 overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} className="h-[clamp(560px,72vh,700px)] w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(148,163,184,0.28),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.78)_30%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-[96rem] items-center px-6">
          <div className="max-w-[52rem] -translate-y-3">
            <p className="text-sm font-normal uppercase tracking-[0.48em] text-white">Mobile Car Detailing</p>
            <h1 className="mt-9 text-[clamp(2.5rem,3.85vw,4.2rem)] font-medium uppercase leading-[1.12] tracking-[0.04em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              <span className="block">We Bring The</span>
              <span className="block"><span className="bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#a97913] bg-clip-text text-transparent">Showroom</span> To You</span>
            </h1>
            <p className="mt-8 max-w-3xl text-2xl font-light leading-relaxed tracking-[0.02em] text-white">
              Premium car care at your home or office.<br />
              Professional detailing. Pristine results.
            </p>
            <div className="mt-12 flex flex-wrap gap-10">
              <Link href="/services" className="min-w-56 rounded-md bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#b8871c] px-10 py-5 text-center text-lg font-medium uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(212,175,55,0.36)] transition hover:brightness-110">View Packages</Link>
              <Link href="/contact" className="min-w-56 rounded-md border border-[#d4af37]/55 bg-black/15 px-10 py-5 text-center text-lg font-medium uppercase tracking-[0.24em] text-zinc-100 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">Book Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -mx-4 -mt-10 min-h-[154px] w-screen -translate-x-1/2 overflow-hidden md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.title} className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_34%,rgba(148,163,184,0.24),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.94)_100%)]" />
        <div className="relative flex min-h-[154px] items-end px-4 pb-4 pt-7">
          <div>
            <p className="text-[0.468rem] font-normal uppercase tracking-[0.24em] text-white">Mobile Car Detailing</p>
            <h1 className="mt-3 text-[clamp(1.26rem,5.76vw,1.896rem)] font-medium uppercase leading-[1.12] tracking-[0.016em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              <span className="block">We Bring The</span>
              <span className="block"><span className="bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#a97913] bg-clip-text text-transparent">Showroom</span> To You</span>
            </h1>
            <p className="mt-3 text-[0.756rem] font-light leading-relaxed tracking-[0.01em] text-white">
              Premium car care at your home or office.<br />
              Professional detailing. Pristine results.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/services" className="rounded-md bg-gradient-to-b from-[#ffe8a3] via-[#d4af37] to-[#b8871c] px-[0.8rem] py-[0.4rem] text-center text-[0.528rem] font-medium uppercase tracking-[0.06em] text-black shadow-[0_0_24px_rgba(212,175,55,0.36)]">View Packages</Link>
              <Link href="/contact" className="rounded-md border border-[#d4af37]/55 bg-black/20 px-[0.8rem] py-[0.4rem] text-center text-[0.528rem] font-medium uppercase tracking-[0.14em] text-zinc-100">Book Now</Link>
            </div>
          </div>
        </div>
      </section>


      <Section>
        <h2 className="text-2xl font-semibold">Services</h2>
        <h3 className="mt-3 text-sm uppercase tracking-[0.18em] text-gold">Once-off services</h3>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-2">
          {oneTimeServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </MobileSnapCarousel>

        <h3 className="mt-6 text-sm uppercase tracking-[0.18em] text-gold">Subscription services</h3>
        <MobileSnapCarousel itemClassName="w-[92%] md:w-auto" desktopClassName="md:grid-cols-2 lg:grid-cols-2">
          {subscriptionServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
