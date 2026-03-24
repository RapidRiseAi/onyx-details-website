const initMobileMenu = () => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mobile-menu-panel');
  const menuClose = document.querySelector('[data-mobile-menu-close]');
  const backdrop = document.querySelector('[data-mobile-backdrop]');

  if (!menuToggle || !nav || !backdrop) return;
  if (menuToggle.dataset.menuInit === 'true') return;
  menuToggle.dataset.menuInit = 'true';

  const mobileLinks = Array.from(nav.querySelectorAll('a'));
  const mobileCtas = Array.from(nav.querySelectorAll('[data-open-booking]'));

  const setMenuState = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
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
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) setMenuState(false);
  });
};

const initUi = () => {
  initMobileMenu();
  initCarouselProgress();
};

const initCarouselProgress = () => {
  document.querySelectorAll('[data-scroll-sync]').forEach((containerEl) => {
    const container = containerEl as HTMLElement;
    if (container.dataset.scrollSyncInit === 'true') return;
    container.dataset.scrollSyncInit = 'true';

    const track = container.querySelector('[data-scroll-track]') as HTMLElement | null;
    const progress = container.querySelector('[data-carousel-progress]') as HTMLInputElement | null;
    if (!track || !progress) return;

    const syncProgress = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (maxScroll === 0) {
        progress.value = '0';
        progress.disabled = true;
        return;
      }
      progress.disabled = false;
      progress.value = String(Math.round((track.scrollLeft / maxScroll) * 100));
    };

    progress.addEventListener('input', () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (maxScroll === 0) return;
      const target = (Number(progress.value) / 100) * maxScroll;
      track.scrollTo({ left: target, behavior: 'auto' });
    });

    track.addEventListener('scroll', syncProgress, { passive: true });
    window.addEventListener('resize', syncProgress);
    syncProgress();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUi, { once: true });
} else {
  initUi();
}

document.addEventListener('astro:page-load', initUi);

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
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
