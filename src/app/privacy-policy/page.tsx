import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/section-heading';
import { contact } from '@/content/siteContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Onyx Details collects, uses, and protects your personal information in line with South Africa’s POPIA.'
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-400">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <SectionHeading eyebrow="Your data, protected" title="Privacy Policy">
          <h1 className="sr-only">Privacy Policy</h1>
        </SectionHeading>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-zinc-500">Last updated: 16 June 2026</p>
      </div>

      <div className="space-y-8">
        <Block title="1. Who we are">
          <p>
            Onyx Details (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides mobile car detailing services across Mpumalanga. We are the responsible party for the personal information processed through this website, as defined by the Protection of Personal Information Act, 2013 (POPIA).
          </p>
          <p>
            For any privacy queries you can reach our Information Officer at <a href={`mailto:${contact.email}`} className="text-gold underline underline-offset-2">{contact.email}</a> or {contact.phone}.
          </p>
        </Block>

        <Block title="2. What we collect">
          <p>When you submit a booking request or contact us, we may collect:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Your name, email address, and phone number;</li>
            <li>Your city/location and the service area for the booking;</li>
            <li>Vehicle details and the service(s) and add-ons selected;</li>
            <li>Any photos you choose to upload and the description of issues you want addressed;</li>
            <li>Any additional notes you provide.</li>
          </ul>
        </Block>

        <Block title="3. Why we use it (purpose & lawful basis)">
          <p>
            We process your information only to prepare a quote, arrange and deliver the booking, and communicate with you about your service. Our lawful basis is the performance of (or steps toward) a service you requested, and the consent you provide when submitting the form.
          </p>
        </Block>

        <Block title="4. Who we share it with">
          <p>
            Booking details are stored and processed using Google Workspace services (Google Sheets, Google Drive for uploaded photos, and Gmail for notifications). These operators process the data on our behalf. We do not sell your personal information or share it for marketing by third parties.
          </p>
        </Block>

        <Block title="5. How long we keep it">
          <p>
            We retain booking information only for as long as needed to provide the service and to meet reasonable business and legal record-keeping requirements, after which it is deleted or anonymised. Uploaded photos are kept only as long as they are useful for the related booking.
          </p>
        </Block>

        <Block title="6. How we protect it">
          <p>
            Information is transmitted over an encrypted (HTTPS) connection and stored within access-controlled Google accounts. We limit access to those who need it to deliver your service.
          </p>
        </Block>

        <Block title="7. Your rights">
          <p>Under POPIA you have the right to:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Request access to the personal information we hold about you;</li>
            <li>Request correction or deletion of your information;</li>
            <li>Object to or withdraw consent for processing (this may affect our ability to provide the service);</li>
            <li>Lodge a complaint with the Information Regulator of South Africa.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <a href={`mailto:${contact.email}`} className="text-gold underline underline-offset-2">{contact.email}</a> and we will assist promptly.
          </p>
        </Block>

        <Block title="8. Cookies & analytics">
          <p>
            This website does not use advertising or tracking cookies. Only the technical functionality required to display the site and submit your request is used.
          </p>
        </Block>

        <Block title="9. Changes to this policy">
          <p>
            We may update this policy from time to time. The latest version will always be available on this page with its effective date.
          </p>
        </Block>
      </div>
    </div>
  );
}
