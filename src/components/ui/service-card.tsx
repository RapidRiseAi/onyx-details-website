import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { InfoPopover } from '@/components/ui/info-popover';
import { services } from '@/content/siteContent';

type Service = (typeof services)[number];

export function ServiceCard({ service, showBullets = false }: { service: Service; showBullets?: boolean }) {
  return (
    <Card className="h-full p-3">
      <div className="flex h-full flex-col gap-3 md:flex-row">
        {service.image ? (
          <div className="w-full shrink-0 md:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.imageAlt ?? service.title}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 text-lg font-semibold leading-tight md:text-xl">{service.title}</h3>
            <InfoPopover label={service.title} description={service.info ?? service.desc} />
          </div>
          <p className="text-gold">{service.price}</p>
          <p className="mt-2 text-sm text-zinc-300 md:text-base">{service.desc}</p>
          {showBullets ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="mt-auto inline-block rounded-lg bg-gold px-4 py-2 text-center text-sm font-semibold text-zinc-950 md:self-start">
            Book This Service
          </Link>
        </div>
      </div>
    </Card>
  );
}
