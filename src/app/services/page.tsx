import { services } from '@/content/siteContent';

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Services</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-gold">{service.price}</p>
            <p className="mt-2 text-zinc-300">{service.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
