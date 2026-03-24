import Link from 'next/link';
import { branding, contact, navLinks } from '@/content/siteContent';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950/90 backdrop-blur">
        <div className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3 md:grid">
          <nav className="flex gap-4">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-200 hover:text-gold">{link.label}</Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={branding.logo} alt="Onyx Details logo" className="h-10 w-10 rounded-full border border-gold/40 bg-zinc-900 object-contain p-1" />
            <span className="text-sm font-semibold tracking-[0.2em] text-gold">ONYX DETAILS</span>
          </Link>
          <nav className="flex justify-end gap-4">
            {navLinks.slice(3).map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-200 hover:text-gold">{link.label}</Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 md:hidden">
          <Link href="/" className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={branding.logo} alt="Onyx Details logo" className="h-9 w-9 rounded-full border border-gold/40 bg-zinc-900 object-contain p-1" />
            <span className="text-xs font-semibold tracking-[0.2em] text-gold">ONYX DETAILS</span>
          </Link>
        </div>
        <nav className="flex gap-3 overflow-x-auto border-t border-zinc-900 px-4 py-2 text-sm md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-zinc-300">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <p className="font-semibold text-gold">ONYX DETAILS</p>
            <p className="mt-2 text-sm text-zinc-400">Premium mobile detailing with reliable quality and on-site convenience.</p>
          </div>
          <div>
            <p className="font-medium">Quick links</p>
            <div className="mt-2 grid gap-1 text-sm text-zinc-300">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium">Contact</p>
            <p className="mt-2 text-sm text-zinc-300">{contact.phone}</p>
            <p className="text-sm text-zinc-300">{contact.email}</p>
            <Link href={contact.whatsapp} className="mt-3 inline-block rounded-lg border border-zinc-700 px-3 py-2 text-sm">
              WhatsApp
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
