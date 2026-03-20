import { formEndpoints } from '../data/endpoints';

const form = document.querySelector('#contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) status.textContent = 'Sending enquiry...';
    const data = new FormData(form);
    const payload = {
      timestamp: new Date().toISOString(),
      sourcePage: window.location.pathname,
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      area: data.get('area'),
      message: data.get('message')
    };
    try {
      const response = await fetch(formEndpoints.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to submit enquiry');
      if (status) status.textContent = 'Your enquiry has been sent. OnyxDetails will get back to you shortly.';
      form.reset();
    } catch {
      if (status) status.textContent = 'Unable to send your enquiry right now. Please try again later.';
    }
  });
}
