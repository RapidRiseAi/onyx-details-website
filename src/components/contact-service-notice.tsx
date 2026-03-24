'use client';

import { useSearchParams } from 'next/navigation';

export function ContactServiceNotice() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service');

  if (!selectedService) {
    return null;
  }

  return (
    <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-zinc-100">
      Booking request for: <strong>{decodeURIComponent(selectedService)}</strong>
    </p>
  );
}
