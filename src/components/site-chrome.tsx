import Link from 'next/link';
import { contact, navLinks } from '@/content/siteContent';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-wide text-gold">ONYX DETAILS</Link>
          <nav className="hidden gap-4 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-200 hover:text-gold">{link.label}</Link>
            ))}
          </nav>
        </div>
        <nav className="flex gap-3 overflow-x-auto border-t border-zinc-900 px-4 py-2 text-sm md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-zinc-300">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
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
