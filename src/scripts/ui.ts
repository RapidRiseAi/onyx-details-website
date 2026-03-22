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
  document.querySelectorAll('.service-grid-mobile-carousel').forEach((carousel) => {
    if (carousel.dataset.carouselInit === 'true') return;
    carousel.dataset.carouselInit = 'true';

    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const startDrag = (clientX) => {
      isPointerDown = true;
      startX = clientX;
      startScrollLeft = carousel.scrollLeft;
      carousel.classList.add('dragging');
    };

    const moveDrag = (clientX) => {
      if (!isPointerDown) return;
      const distance = clientX - startX;
      carousel.scrollLeft = startScrollLeft - distance;
    };

    const endDrag = () => {
      isPointerDown = false;
      carousel.classList.remove('dragging');
    };

    carousel.addEventListener('pointerdown', (event) => {
      startDrag(event.clientX);
      carousel.setPointerCapture?.(event.pointerId);
    });

    carousel.addEventListener('pointermove', (event) => {
      if (!isPointerDown) return;
      event.preventDefault();
      moveDrag(event.clientX);
    });

    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);
    carousel.addEventListener('pointerleave', endDrag);

    carousel.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      startDrag(event.touches[0].clientX);
    }, { passive: true });

    carousel.addEventListener('touchmove', (event) => {
      if (!isPointerDown || event.touches.length !== 1) return;
      moveDrag(event.touches[0].clientX);
    }, { passive: true });

    carousel.addEventListener('touchend', endDrag);
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
