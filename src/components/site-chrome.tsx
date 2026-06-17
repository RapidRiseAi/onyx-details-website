'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, CalendarCheck } from 'lucide-react';
import { branding, contact, navLinks } from '@/content/siteContent';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const leftLinks = navLinks.filter((item) => ['/', '/services', '/gallery'].includes(item.href));
  const rightLinks = navLinks.filter((item) => ['/about', '/contact'].includes(item.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Brand = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
    <Link href="/" className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap">
      <span className={`font-display font-semibold tracking-[0.22em] text-gold ${size === 'sm' ? 'text-[11px]' : 'text-base'}`}>ONYX</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={branding.logo} alt="Onyx Details logo" width={48} height={48} className={`${size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'} shrink-0 object-contain`} />
      <span className={`font-display font-semibold tracking-[0.22em] text-gold ${size === 'sm' ? 'text-[11px]' : 'text-base'}`}>DETAILS</span>
    </Link>
  );

  const navLinkClass = (href: string) =>
    `relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all hover:text-gold ${
      pathname === href ? 'text-gold after:w-full' : 'text-zinc-300 after:w-0 hover:after:w-full'
    }`;

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-gold/15 bg-ink/90 backdrop-blur-md' : 'border-white/5 bg-ink/70 backdrop-blur'
        }`}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="mx-auto hidden max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 py-4 md:grid">
          <nav className="flex gap-7">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>{link.label}</Link>
            ))}
          </nav>
          <Brand />
          <nav className="flex items-center justify-end gap-7">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>{link.label}</Link>
            ))}
            <Link href="/contact" className="btn-gold !px-5 !py-2.5 !text-xs">Book Now</Link>
          </nav>
        </div>

        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-3.5 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-zinc-200"
          >
            <Menu size={20} />
          </button>
          <Brand size="sm" />
          <Link href="/contact" className="btn-gold shrink-0 !px-4 !py-2 !text-[11px]">Book</Link>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[84%] max-w-sm border-r border-gold/15 bg-ink-800 p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-7 flex items-center justify-between">
              <p className="eyebrow">Menu</p>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="rounded-lg border border-white/10 p-2.5 text-zinc-200">
                <X size={20} />
              </button>
            </div>
            <nav className="grid gap-2.5 text-lg text-zinc-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl border px-4 py-3 transition ${
                    pathname === link.href ? 'border-gold/40 bg-gold/10 text-gold' : 'border-white/10 hover:border-gold/30'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={contact.whatsapp} className="btn-gold mt-3 w-full">
                <MessageCircle size={16} /> Ask on WhatsApp
              </Link>
            </nav>
          </div>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-[96rem] flex-1 px-4 py-10 md:px-6">{children}</main>

      <footer className="border-t border-white/10 bg-ink-800">
        <div className="mx-auto grid max-w-[96rem] gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={branding.logo} alt="Onyx Details logo" width={40} height={40} className="h-10 w-10 object-contain" />
              <p className="font-display text-lg font-semibold tracking-[0.18em] text-gold">ONYX DETAILS</p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Premium mobile detailing with reliable quality and on-site convenience. We bring the showroom to you.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-zinc-400">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
              <span>{contact.areas.join(' · ')}</span>
            </p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid gap-2.5 text-sm text-zinc-300">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition hover:text-gold">{link.label}</Link>
              ))}
              <Link href="/privacy-policy" className="w-fit transition hover:text-gold">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <div className="mt-4 grid gap-3 text-sm text-zinc-300">
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 transition hover:text-gold">
                <Phone size={15} className="text-gold" /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 transition hover:text-gold">
                <Mail size={15} className="text-gold" /> {contact.email}
              </a>
              <a href={contact.whatsapp} className="btn-outline mt-1 w-fit !px-4 !py-2 !text-xs">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-[96rem] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-zinc-500 sm:flex-row">
            <span>© {new Date().getFullYear()} Onyx Details. All rights reserved.</span>
            <span>Premium mobile car detailing · Mpumalanga</span>
          </div>
        </div>
      </footer>

      {/* Desktop: floating WhatsApp pill */}
      <Link
        href={contact.whatsapp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-xs font-semibold text-black shadow-glow transition hover:brightness-110 md:flex"
      >
        <MessageCircle size={16} /> WhatsApp
      </Link>

      {/* Mobile: sticky action bar for fast, easy navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-gold/15 bg-ink-800/95 backdrop-blur-md md:hidden">
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-zinc-200">
          <Phone size={18} className="text-gold" /> Call
        </a>
        <a href={contact.whatsapp} className="flex flex-col items-center gap-1 border-x border-white/10 py-2.5 text-[11px] font-medium text-zinc-200">
          <MessageCircle size={18} className="text-gold" /> WhatsApp
        </a>
        <Link href="/contact" className="flex flex-col items-center gap-1 bg-gold-gradient py-2.5 text-[11px] font-semibold text-black">
          <CalendarCheck size={18} /> Book
        </Link>
      </nav>
    </div>
  );
}
