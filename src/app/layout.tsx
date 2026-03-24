import type { Metadata } from 'next';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Onyx Details',
  description: 'Premium mobile detailing'
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
