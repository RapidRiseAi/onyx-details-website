'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { branding, contact, navLinks } from '@/content/siteContent';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const leftLinks = navLinks.filter((item) => ['/', '/services', '/gallery'].includes(item.href));
  const rightLinks = navLinks.filter((item) => ['/about', '/contact'].includes(item.href));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950/90 backdrop-blur">
        <div className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3 md:grid">
          <nav className="flex gap-4">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-200 hover:text-gold">{link.label}</Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="text-sm font-semibold tracking-[0.2em] text-gold">ONYX</span>
            <img src={branding.logo} alt="Onyx Details logo" className="h-10 w-10 object-contain" />
            <span className="text-sm font-semibold tracking-[0.2em] text-gold">DETAILS</span>
          </Link>
          <nav className="flex items-center justify-end gap-4">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-200 hover:text-gold">{link.label}</Link>
            ))}
            <Link href="/contact" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_rgba(199,163,93,.35)]">
              Book Now
            </Link>
          </nav>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg border border-zinc-700 p-2 text-zinc-200"
          >
            <Menu size={18} />
          </button>
          <Link href="/" className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">ONYX</span>
            <img src={branding.logo} alt="Onyx Details logo" className="h-8 w-8 object-contain" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">DETAILS</span>
          </Link>
          <Link href="/contact" className="rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-zinc-950">
            Book
          </Link>
        </div>
      </header>
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/70 md:hidden">
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm border-r border-zinc-800 bg-zinc-950 p-5">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm tracking-[0.2em] text-gold">MENU</p>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="rounded-lg border border-zinc-700 p-2 text-zinc-200">
                <X size={18} />
              </button>
            </div>
            <nav className="grid gap-3 text-zinc-200">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg border border-zinc-800 px-3 py-2">
                  {link.label}
                </Link>
              ))}
              <Link href={contact.whatsapp} className="mt-2 rounded-lg bg-gold px-3 py-2 text-center font-semibold text-zinc-950">
                Ask on WhatsApp
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto hidden max-w-6xl gap-6 px-4 py-10 md:grid md:grid-cols-3">
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
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-5 text-xs text-zinc-400 md:hidden">
          <p className="font-semibold tracking-[0.18em] text-gold">ONYX DETAILS</p>
          <p className="max-w-xs text-zinc-400">Premium mobile detailing with reliable quality and on-site convenience.</p>
          <div className="grid gap-1 text-zinc-300">
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} OnyxDetails</span>
          </div>
        </div>
      </footer>

      <Link
        href={contact.whatsapp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-4 z-50 rounded-full bg-gold px-4 py-3 text-xs font-semibold text-zinc-950 shadow-[0_10px_24px_rgba(0,0,0,.35)] md:hidden"
      >
        WhatsApp
      </Link>
    </div>
  );
}
