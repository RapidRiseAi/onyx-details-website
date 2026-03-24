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
  document.querySelectorAll('[data-service-mobile-shell]').forEach((shell) => {
    if (!(shell instanceof HTMLElement)) return;
    if (shell.dataset.carouselInit === 'true') return;
    shell.dataset.carouselInit = 'true';

    const track = shell.querySelector('[data-service-mobile-track]');
    const prev = shell.querySelector('[data-service-mobile-prev]');
    const next = shell.querySelector('[data-service-mobile-next]');
    if (!(track instanceof HTMLElement) || !(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) return;

    const slides = Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
    if (slides.length <= 1) {
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    const slideStep = () => {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return slides[0].offsetWidth + gap;
    };

    const maxIndex = () => Math.max(0, slides.length - 1);
    const currentIndex = () => {
      const step = slideStep();
      if (step <= 0) return 0;
      return Math.round(track.scrollLeft / step);
    };

    const updateControls = () => {
      const index = Math.min(maxIndex(), Math.max(0, currentIndex()));
      prev.disabled = index <= 0;
      next.disabled = index >= maxIndex();
    };

    prev.addEventListener('click', () => {
      const target = Math.max(0, currentIndex() - 1);
      track.scrollTo({ left: target * slideStep(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      const target = Math.min(maxIndex(), currentIndex() + 1);
      track.scrollTo({ left: target * slideStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
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
