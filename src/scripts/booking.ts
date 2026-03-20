import { formEndpoints } from '../data/endpoints';

const modal = document.querySelector('#booking-modal');
const form = document.querySelector('#booking-form');
if (modal && form) {
  const status = form.querySelector('.form-status');
  if (modal.open) modal.close();

  const open = (serviceId, serviceName) => {
    form.reset();
    form.elements.namedItem('sourcePage').value = window.location.pathname;
    form.elements.namedItem('serviceId').value = serviceId ?? '';
    if (serviceName) form.elements.namedItem('selectedService').value = serviceName;
    modal.showModal();
  };

  document.querySelectorAll('[data-open-booking]').forEach((button) => {
    button.addEventListener('click', () => open(button.dataset.serviceId, button.dataset.serviceName));
  });
  modal.querySelector('[data-close-booking]')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    const target = event.target;
    if (target === modal) modal.close();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) status.textContent = 'Submitting your booking request...';
    const data = new FormData(form);
    const payload = {
      timestamp: new Date().toISOString(),
      sourcePage: data.get('sourcePage'),
      serviceId: data.get('serviceId'),
      selectedService: data.get('selectedService'),
      fullName: data.get('fullName'),
      phone: data.get('phone'),
      address: data.get('address'),
      vehicleType: data.get('vehicleType'),
      preferredDate: data.get('preferredDate'),
      preferredTime: data.get('preferredTime'),
      specialNotes: data.get('specialNotes')
    };
    try {
      const response = await fetch(formEndpoints.bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to submit booking request');
      if (status) {
        status.textContent =
          'Your booking request has been received. OnyxDetails will review your details and get back to you shortly to confirm availability.';
      }
      form.reset();
    } catch {
      if (status) status.textContent = 'Unable to send booking request right now. Please try again or reach out on WhatsApp.';
    }
  });
}
