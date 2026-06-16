import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import { services } from '@/content/siteContent';

type Service = (typeof services)[number];

export function ServiceCard({ service, showBullets = false }: { service: Service; showBullets?: boolean }) {
  const isPaintCorrection = 'isPaintCorrection' in service && service.isPaintCorrection;

  return (
    <Card className="group h-full p-3">
      <div className="flex h-full flex-col gap-4 md:flex-row">
        {service.image ? (
          <div className="w-full shrink-0 overflow-hidden rounded-xl md:w-44">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.imageAlt ?? service.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {isPaintCorrection ? (
                <span className="absolute left-2 top-2 rounded-full border border-gold/40 bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                  Premium
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 font-display text-lg font-semibold leading-tight text-white md:text-xl">{service.title}</h3>
            <InfoPopover label={service.title} description={service.info ?? service.desc} />
          </div>
          <p className="mt-1 text-lg font-semibold text-gold-gradient">{service.price}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[15px]">{service.desc}</p>
          {showBullets ? (
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="group/btn mt-auto inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold transition hover:border-gold hover:bg-gold hover:text-black"
          >
            Book This Service
            <ArrowRight size={15} className="transition group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
