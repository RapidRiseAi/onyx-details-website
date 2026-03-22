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

    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsFinePointer) return;

    let isMouseDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const startDrag = (clientX: number) => {
      isMouseDown = true;
      startX = clientX;
      startScrollLeft = carousel.scrollLeft;
      carousel.classList.add('dragging');
    };

    const moveDrag = (clientX: number) => {
      if (!isMouseDown) return;
      const distance = clientX - startX;
      carousel.scrollLeft = startScrollLeft - distance;
    };

    const endDrag = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      carousel.classList.remove('dragging');
    };

    carousel.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;
      startDrag(event.clientX);
    });

    carousel.addEventListener('mousemove', (event) => {
      if (!isMouseDown) return;
      event.preventDefault();
      moveDrag(event.clientX);
    });

    carousel.addEventListener('mouseleave', endDrag);
    document.addEventListener('mouseup', endDrag);

    carousel.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
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
