import type { Metadata } from 'next';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';
import { branding } from '@/content/siteContent';

export const metadata: Metadata = {
  title: 'Onyx Details',
  description: 'Premium mobile detailing',
  icons: {
    icon: branding.logo,
    shortcut: branding.logo,
    apple: branding.logo
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
