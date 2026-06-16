import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import { services } from '@/content/siteContent';

type Service = (typeof services)[number];

export function ServiceCard({ service, showBullets = false }: { service: Service; showBullets?: boolean }) {
  const isPaintCorrection = 'isPaintCorrection' in service && service.isPaintCorrection;

  return (
    <Card className="group flex h-full flex-col p-0">
      {service.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.imageAlt ?? service.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {isPaintCorrection ? (
            <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-black/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
              Premium
            </span>
          ) : null}
          <span className="absolute bottom-3 left-3 rounded-full border border-gold/40 bg-black/60 px-3.5 py-1.5 text-sm font-semibold text-gold backdrop-blur-sm">
            {service.price}
          </span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 font-display text-lg font-semibold leading-tight text-white md:text-xl">{service.title}</h3>
          <InfoPopover label={service.title} description={service.info ?? service.desc} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.desc}</p>
        {showBullets ? (
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          className="group/btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-gold transition hover:border-gold hover:bg-gold hover:text-black"
        >
          Book This Service
          <ArrowRight size={15} className="transition group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}
