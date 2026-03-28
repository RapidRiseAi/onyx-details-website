'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type ImageItem = { src: string; alt: string; title?: string };

export function WorkProofGallery({ items }: { items: ImageItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!items.length) return null;
  const active = items[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active.src} alt={active.alt} className="h-72 w-full cursor-zoom-in object-cover" onClick={() => setOpen(true)} />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/80 p-2" onClick={goPrev} aria-label="Previous image"><ChevronLeft size={18} /></button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/80 p-2" onClick={goNext} aria-label="Next image"><ChevronRight size={18} /></button>
      </div>
      <div className="flex justify-center gap-2" aria-hidden>
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-blue-500' : 'w-2 bg-zinc-600'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4">
          <button className="absolute right-4 top-4 rounded-full bg-zinc-900 p-2" onClick={() => setOpen(false)} aria-label="Close gallery"><X size={18} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={active.src} alt={active.alt} className="max-h-[85vh] w-auto max-w-[95vw] rounded-xl" />
        </div>
      ) : null}
    </div>
  );
}
