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
    if (carousel.dataset.carouselInit === 'true') return;
    carousel.dataset.carouselInit = 'true';

    const track = carousel.querySelector('[data-service-carousel-track]') as HTMLElement | null;
    const prevButton = carousel.querySelector('[data-service-carousel-prev]') as HTMLButtonElement | null;
    const nextButton = carousel.querySelector('[data-service-carousel-next]') as HTMLButtonElement | null;
    const dotsContainer = carousel.querySelector('[data-service-carousel-dots]') as HTMLElement | null;
    if (!track || !prevButton || !nextButton || !dotsContainer) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let currentIndex = 0;
    let rafId = 0;

    const getSlideUnit = () => {
      const firstSlide = slides[0] as HTMLElement;
      const style = window.getComputedStyle(track);
      const gap = Number.parseFloat(style.columnGap || style.gap || '0');
      return firstSlide.getBoundingClientRect().width + gap;
    };

    const clampIndex = (index: number) => Math.max(0, Math.min(index, slides.length - 1));

    const goToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
      currentIndex = clampIndex(index);
      const slideUnit = getSlideUnit();
      if (slideUnit <= 0) return;
      track.scrollTo({ left: currentIndex * slideUnit, behavior });
      updateUi();
    };

    const updateUi = () => {
      prevButton.toggleAttribute('disabled', currentIndex === 0);
      nextButton.toggleAttribute('disabled', currentIndex === slides.length - 1);
      Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
        dot.toggleAttribute('aria-current', dotIndex === currentIndex);
      });
    };

    const syncFromScroll = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        const slideUnit = getSlideUnit();
        if (slideUnit <= 0) return;
        currentIndex = clampIndex(Math.round(track.scrollLeft / slideUnit));
        updateUi();
      });
    };

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'service-carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to service ${index + 1}`);
      dot.addEventListener('click', () => goToIndex(index));
      dotsContainer.append(dot);
    });

    prevButton.addEventListener('click', () => goToIndex(currentIndex - 1));
    nextButton.addEventListener('click', () => goToIndex(currentIndex + 1));
    track.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', () => goToIndex(currentIndex, 'auto'));

    goToIndex(0, 'auto');
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
