const body = document.body;
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#mobile-menu-panel');
const menuClose = document.querySelector<HTMLButtonElement>('[data-mobile-menu-close]');
const backdrop = document.querySelector<HTMLElement>('[data-mobile-backdrop]');
const mobileLinks = nav ? Array.from(nav.querySelectorAll<HTMLAnchorElement>('a')) : [];
const mobileCtas = nav ? Array.from(nav.querySelectorAll<HTMLElement>('[data-open-booking]')) : [];

if (menuToggle && nav && backdrop) {
  const setMenuState = (open: boolean) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close mobile menu' : 'Open mobile menu');
    nav.setAttribute('aria-hidden', String(!open));
    nav.hidden = !open;
    backdrop.hidden = !open;
    nav.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    body.classList.toggle('mobile-menu-open', open);
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!expanded);
  });

  menuClose?.addEventListener('click', () => setMenuState(false));
  backdrop.addEventListener('click', () => setMenuState(false));
  mobileLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));
  mobileCtas.forEach((cta) => cta.addEventListener('click', () => setMenuState(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuToggle.focus();
    }
  });
}

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll<HTMLElement>('[data-lightbox-src]').forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.hidden = false;
    lightboxImage.src = item.dataset.lightboxSrc ?? '';
    lightboxImage.alt = item.dataset.lightboxAlt ?? '';
  });
});

lightbox?.querySelector('[data-close-lightbox]')?.addEventListener('click', () => {
  lightbox.hidden = true;
});
