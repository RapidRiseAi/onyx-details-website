import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';
import { branding } from '@/content/siteContent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://onyxdetails.co.za'),
  title: {
    default: 'Onyx Details | Premium Mobile Car Detailing',
    template: '%s | Onyx Details'
  },
  description:
    'Premium mobile car detailing across Sabie, Graskop, White River, Nelspruit and Hazyview. We bring the showroom to your home, farm or office.',
  keywords: ['mobile car detailing', 'car wash', 'paint correction', 'ceramic coating', 'Sabie', 'Nelspruit', 'Mpumalanga'],
  icons: {
    icon: branding.logo,
    shortcut: branding.logo,
    apple: branding.logo
  },
  openGraph: {
    title: 'Onyx Details | Premium Mobile Car Detailing',
    description: 'We bring the showroom to you. Premium mobile detailing across Mpumalanga.',
    type: 'website',
    locale: 'en_ZA'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preload the hero so it paints first — responsive per viewport */}
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero/hero.webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero/hero-mobile.webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        {/* If JS is unavailable, never keep reveal content hidden */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;animation:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
