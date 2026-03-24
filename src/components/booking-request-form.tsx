'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/content/siteContent';

export function BookingRequestForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get('service') ?? '';

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);
  const defaultService = serviceOptions.includes(requestedService) ? requestedService : '';

  const [serviceType, setServiceType] = useState(defaultService);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-lg font-semibold">Book a Service Request</h2>
      <p className="text-sm text-zinc-300">
        Tell us what service you need and your preferred timing. Once submitted, Kaden will contact you with further arrangements.
      </p>

      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm">
          <span>Service type</span>
          <select
            required
            value={serviceType}
            onChange={(event) => setServiceType(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span>City</span>
          <input
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
            placeholder="Enter your city"
          />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Phone number</span>
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
              placeholder="Your contact number"
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm">
          <span>Preferred service date</span>
          <input
            type="date"
            required
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          />
        </label>

        <button type="submit" className="mt-1 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950">
          Submit Request
        </button>
      </form>

      {submitted ? (
        <p className="rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-zinc-100">
          Thanks! Your request has been received. Kaden will contact you shortly to confirm the final arrangements.
        </p>
      ) : null}
    </div>
  );
}
