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
  initServiceCarousels();
};

const initServiceCarousels = () => {
  document.querySelectorAll('[data-service-carousel]').forEach((carousel) => {
    if (carousel.dataset.serviceCarouselInit === 'true') return;
    carousel.dataset.serviceCarouselInit = 'true';

    const track = carousel.querySelector('[data-service-carousel-track]') as HTMLElement | null;
    const prevButton = carousel.querySelector('[data-service-carousel-prev]') as HTMLButtonElement | null;
    const nextButton = carousel.querySelector('[data-service-carousel-next]') as HTMLButtonElement | null;
    if (!track || !prevButton || !nextButton) return;

    const getStep = () => {
      const firstSlide = track.firstElementChild as HTMLElement | null;
      if (!firstSlide) return 0;
      const style = window.getComputedStyle(track);
      const gap = Number.parseFloat(style.columnGap || style.gap || '0');
      return firstSlide.getBoundingClientRect().width + gap;
    };

    const syncButtons = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      prevButton.disabled = track.scrollLeft <= 4;
      nextButton.disabled = track.scrollLeft >= maxScroll - 4;
    };

    const scrollByStep = (direction: 1 | -1) => {
      const step = getStep();
      if (step <= 0) return;
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    };

    prevButton.addEventListener('click', () => scrollByStep(-1));
    nextButton.addEventListener('click', () => scrollByStep(1));
    track.addEventListener('scroll', syncButtons, { passive: true });
    window.addEventListener('resize', syncButtons);
    syncButtons();
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
