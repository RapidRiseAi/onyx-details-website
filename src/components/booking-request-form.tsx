'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { bookingAddOns, paintCorrectionOptions, services } from '@/content/siteContent';
import { InfoPopover } from '@/components/ui/info-popover';

const BOOKING_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx--jvxjMu5lozfbKzaIMVc4KKbwZph52RRREg1IppF5j67EuV1k8rGH0JeKLVXM_rhOQ/exec';

export function BookingRequestForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get('service') ?? '';

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);
  const defaultService = serviceOptions.includes(requestedService) ? requestedService : '';

  const [serviceType, setServiceType] = useState(defaultService);
  const [clientName, setClientName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleTypeOther, setVehicleTypeOther] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paintCorrectionStep, setPaintCorrectionStep] = useState<'step-1' | 'step-2' | ''>('');
  const [addOnApplication, setAddOnApplication] = useState<'one-time' | 'every-wash'>('one-time');
  const [mainProblem, setMainProblem] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const includesPaintCorrection = selectedAddOns.includes('paint-correction');
  const selectedService = services.find((service) => service.title === serviceType);

  const calculatedEstimate = useMemo(() => {
    let min = selectedService?.priceMin ?? 0;
    let max = selectedService?.priceMax ?? 0;

    const addOnMultiplier = selectedService && selectedService.washCount > 1 && addOnApplication === 'every-wash'
      ? selectedService.washCount
      : 1;

    selectedAddOns.forEach((addOnId) => {
      if (addOnId === 'paint-correction') return;
      const addOn = bookingAddOns.find((item) => item.id === addOnId);
      if (!addOn) return;
      min += addOn.priceMin * addOnMultiplier;
      max += addOn.priceMax * addOnMultiplier;
    });

    if (includesPaintCorrection) {
      const paintOption = paintCorrectionOptions.find((option) => option.id === paintCorrectionStep);
      if (paintOption) {
        min += paintOption.priceMin;
        max += paintOption.priceMax;
      }

    }

    return { min, max };
  }, [addOnApplication, includesPaintCorrection, paintCorrectionStep, selectedAddOns, selectedService]);

  const estimatedPriceLabel =
    calculatedEstimate.min === calculatedEstimate.max
      ? `R${calculatedEstimate.min}`
      : `R${calculatedEstimate.min} - R${calculatedEstimate.max}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const photos = await Promise.all(
        uploadedPhotos.map(
          (file) =>
            new Promise<{ name: string; type: string; base64: string }>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = String(reader.result || '');
                const base64 = result.includes(',') ? result.split(',')[1] : '';
                resolve({ name: file.name, type: file.type || 'application/octet-stream', base64 });
              };
              reader.onerror = () => reject(new Error(`Could not read file: ${file.name}`));
              reader.readAsDataURL(file);
            })
        )
      );

      const payload = {
        serviceType,
        clientName,
        clientEmail: email,
        clientPhone: phone,
        vehicleType: vehicleType === 'Other' ? `Other: ${vehicleTypeOther}` : vehicleType,
        city,
        preferredDate,
        addOns: selectedAddOns
          .map((addOnId) => bookingAddOns.find((item) => item.id === addOnId)?.label)
          .filter((label): label is string => Boolean(label)),
        addOnApplication,
        paintCorrectionOptions: [paintCorrectionStep]
          .filter(Boolean)
          .map((optionId) => paintCorrectionOptions.find((option) => option.id === optionId)?.label)
          .filter((label): label is string => Boolean(label)),
        estimatedPrice: estimatedPriceLabel,
        mainProblem,
        photos,
        notes
      };

      const response = await fetch(BOOKING_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response) {
        throw new Error('Could not send booking request right now. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAddOn = (addOnId: string) => {
    const currentlySelected = selectedAddOns.includes(addOnId);
    const next = currentlySelected
      ? selectedAddOns.filter((item) => item !== addOnId)
      : [...selectedAddOns, addOnId];

    setSelectedAddOns(next);

    if (addOnId === 'paint-correction' && currentlySelected) {
      setPaintCorrectionStep('');
    }
  };

  const onPhotoSelection = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 8);
    setUploadedPhotos(selected);
  };

  return (
    <div className="w-full max-w-full space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-lg font-semibold">Book a Service Request</h2>
      <p className="text-sm text-zinc-300">
        Tell us what service you need and your preferred timing. Once submitted, Kaden will contact you with further arrangements.
      </p>

      <form className="grid min-w-0 w-full max-w-full gap-3 [&>*]:min-w-0" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm">
          <span>Service type</span>
          <select
            required
            value={serviceType}
            onChange={(event) => setServiceType(event.target.value)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span>Your name</span>
          <input
            required
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
            placeholder="Enter your name"
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>City</span>
          <input
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
            placeholder="Enter your city"
          />
          <span className="text-xs text-zinc-400">Travel fees may apply outside of Sabie.</span>
        </label>

        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Phone number</span>
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
              placeholder="Your contact number"
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm">
          <span>Vehicle type</span>
          <select
            required
            value={vehicleType}
            onChange={(event) => {
              const nextType = event.target.value;
              setVehicleType(nextType);
              if (nextType !== 'Other') setVehicleTypeOther('');
            }}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          >
            <option value="">Select vehicle type</option>
            {['Sedan', 'Hatchback', 'SUV', 'Bakkie', 'Coupe', 'Van/Minibus', 'Other'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        {vehicleType === 'Other' ? (
          <label className="grid gap-1 text-sm">
            <span>Please specify vehicle type</span>
            <input
              required
              value={vehicleTypeOther}
              onChange={(event) => setVehicleTypeOther(event.target.value)}
              className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
              placeholder="Example: Crossover, MPV, Sports Car..."
            />
          </label>
        ) : null}

        <label className="grid gap-1 text-sm">
          <span>Preferred service date</span>
          <input
            type="date"
            required
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
            onFocus={(event) => event.currentTarget.showPicker?.()}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          />
        </label>

        <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3 text-sm">
          <p className="font-medium text-zinc-100">Estimated price</p>
          <p className="mt-1 text-gold">{serviceType ? estimatedPriceLabel : 'Select a service to see price estimate'}</p>
          {selectedService && selectedService.washCount > 1 ? (
            <p className="mt-1 text-xs text-zinc-400">Package includes {selectedService.washCount} washes. Add-ons can be priced once or at every wash.</p>
          ) : null}
        </div>

        <fieldset className="grid min-w-0 gap-2 rounded-md border border-zinc-800 p-3">
          <legend className="px-1 text-sm">Optional add-ons</legend>
          {bookingAddOns.map((addOn) => (
            <div key={addOn.id} className="flex w-full min-w-0 items-start gap-2 text-sm text-zinc-200">
              <input
                id={`addon-${addOn.id}`}
                type="checkbox"
                checked={selectedAddOns.includes(addOn.id)}
                onChange={() => toggleAddOn(addOn.id)}
              />
              <label htmlFor={`addon-${addOn.id}`} className="min-w-0 flex-1 break-words">
                {addOn.label}
                {addOn.id === 'ceramic-coating' ? (
                  <span className="mt-1 block text-xs text-zinc-400">Recommended with a paint correction to really see the full benefit.</span>
                ) : null}
              </label>
              <InfoPopover label={addOn.label} description={addOn.description ?? addOn.label} />
            </div>
          ))}
        </fieldset>

        {selectedService && selectedService.washCount > 1 && selectedAddOns.length > 0 ? (
          <fieldset className="grid gap-2 rounded-md border border-zinc-800 p-3">
            <legend className="px-1 text-sm">Add-on application</legend>
            <label className="flex items-center gap-2 text-sm text-zinc-200">
              <input
                type="radio"
                name="addon-application"
                checked={addOnApplication === 'one-time'}
                onChange={() => setAddOnApplication('one-time')}
              />
              <span>Apply add-ons once only</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-200">
              <input
                type="radio"
                name="addon-application"
                checked={addOnApplication === 'every-wash'}
                onChange={() => setAddOnApplication('every-wash')}
              />
              <span>Apply add-ons at every wash in this package</span>
            </label>
          </fieldset>
        ) : null}

        {includesPaintCorrection ? (
          <fieldset className="grid gap-2 rounded-md border border-gold/40 bg-gold/5 p-3">
            <legend className="px-1 text-sm">Paint correction pricing options (choose one step)</legend>
            {paintCorrectionOptions
              .map((option) => (
                <label key={option.id} className="flex items-start gap-2 text-sm text-zinc-100">
                  <input
                    type="radio"
                    name="paint-correction-step"
                    checked={paintCorrectionStep === option.id}
                    onChange={() => setPaintCorrectionStep(option.id as 'step-1' | 'step-2')}
                  />
                  <span className="break-words">{option.label}</span>
                  {'description' in option && option.description ? (
                    <span className="block text-xs text-zinc-300">{option.description}</span>
                  ) : null}
                </label>
              ))}
            <p className="text-xs text-zinc-300">Ceramic coating is recommended with at least the Gloss Revival Polish option.</p>
            <p className="text-xs text-zinc-300">Final paint correction pricing is confirmed on vehicle viewing.</p>
          </fieldset>
        ) : null}

        <label className="grid gap-1 text-sm">
          <span>Main problem you want solved (optional)</span>
          <textarea
            value={mainProblem}
            onChange={(event) => setMainProblem(event.target.value)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
            rows={3}
            placeholder="Example: swirls on bonnet, stained seats, pet hair, bad odor..."
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>Upload reference photos (optional)</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => onPhotoSelection(event.target.files)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 file:mr-3 file:rounded-md file:border-0 file:bg-gold file:px-3 file:py-1 file:text-xs file:font-semibold file:text-zinc-950"
          />
          <span className="text-xs text-zinc-400">Please upload clear interior and exterior photos, plus close-up photos of the main pain points you want solved.</span>
        </label>

        <label className="grid gap-1 text-sm">
          <span>Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-w-0 w-full max-w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
            rows={3}
            placeholder="Any extra details for Kaden..."
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full max-w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {submitError ? (
        <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{submitError}</p>
      ) : null}

      {submitted ? (
        <p className="rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-zinc-100">
          Thanks! Your request has been received. Kaden will contact you shortly to confirm the final arrangements.
        </p>
      ) : null}
    </div>
  );
}
