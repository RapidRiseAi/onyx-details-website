import { contact } from '@/content/siteContent';

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-zinc-300">Call or message us to book your detailing service.</p>
      <div className="grid gap-3 text-zinc-300 md:grid-cols-2">
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
      </div>
      <p className="text-zinc-400">Service areas: {contact.areas.join(', ')}</p>
      <a href={contact.whatsapp} className="inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-zinc-950">Message on WhatsApp</a>
    </div>
  );
}
