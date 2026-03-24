import { gallery } from '@/content/siteContent';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <article key={item.src} className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} className="h-64 w-full rounded-xl object-cover" />
            <p className="text-sm text-zinc-300">{item.title}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
