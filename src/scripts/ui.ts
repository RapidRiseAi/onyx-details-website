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

const initServiceCarousels = () => {
  document.querySelectorAll('[data-service-carousel]').forEach((carousel) => {
    if (!(carousel instanceof HTMLElement)) return;
    if (carousel.dataset.carouselInit === 'true') return;
    carousel.dataset.carouselInit = 'true';

    const track = carousel.querySelector('[data-service-carousel-track]');
    const viewport = carousel.querySelector('[data-service-carousel-viewport]');
    const prevButton = carousel.querySelector('[data-service-carousel-prev]');
    const nextButton = carousel.querySelector('[data-service-carousel-next]');
    if (!(track instanceof HTMLElement) || !(viewport instanceof HTMLElement) || !(prevButton instanceof HTMLButtonElement) || !(nextButton instanceof HTMLButtonElement)) return;

    const getSlides = () => Array.from(track.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
    const slideStep = () => {
      const slides = getSlides();
      if (!slides.length) return viewport.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return slides[0].offsetWidth + gap;
    };

    const maxScrollLeft = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const canGoPrev = () => track.scrollLeft > 4;
    const canGoNext = () => track.scrollLeft < maxScrollLeft() - 4;

    const updateControls = () => {
      const desktop = window.matchMedia('(min-width: 981px)').matches;
      prevButton.disabled = desktop || !canGoPrev();
      nextButton.disabled = desktop || !canGoNext();
    };

    const scrollBySlides = (direction: 1 | -1) => {
      track.scrollBy({
        left: slideStep() * direction,
        behavior: 'smooth'
      });
    };

    prevButton.addEventListener('click', () => scrollBySlides(-1));
    nextButton.addEventListener('click', () => scrollBySlides(1));
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  });
};

const initUi = () => {
  initMobileMenu();
  initServiceCarousels();
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
