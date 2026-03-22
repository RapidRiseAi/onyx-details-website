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
    let isDragging = false;
    let activePointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let dragLockedToAxis = false;

    const getSlideUnit = () => {
      const firstSlide = carousel.firstElementChild as HTMLElement | null;
      if (!firstSlide) return 0;
      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || window.getComputedStyle(carousel).gap || '0');
      return firstSlide.getBoundingClientRect().width + gap;
    };

    const startDrag = (clientX: number, clientY: number) => {
      isPointerDown = true;
      isDragging = false;
      dragLockedToAxis = false;
      startX = clientX;
      startY = clientY;
      startScrollLeft = carousel.scrollLeft;
    };

    const moveDrag = (event: PointerEvent) => {
      if (!isPointerDown) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!dragLockedToAxis) {
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;
        dragLockedToAxis = true;
      }

      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

      isDragging = true;
      carousel.classList.add('dragging');
      event.preventDefault();
      carousel.scrollLeft = startScrollLeft - deltaX;
    };

    const endDrag = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      carousel.classList.remove('dragging');

      if (!isDragging) return;
      isDragging = false;
      const unit = getSlideUnit();
      if (unit <= 0) return;
      const targetIndex = Math.round(carousel.scrollLeft / unit);
      carousel.scrollTo({ left: targetIndex * unit, behavior: 'smooth' });
    };

    carousel.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      activePointerId = event.pointerId;
      carousel.setPointerCapture(event.pointerId);
      startDrag(event.clientX, event.clientY);
    });

    carousel.addEventListener('pointermove', (event) => {
      if (event.pointerId !== activePointerId) return;
      moveDrag(event);
    });

    carousel.addEventListener('pointerup', (event) => {
      if (event.pointerId !== activePointerId) return;
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
      activePointerId = null;
      endDrag();
    });

    carousel.addEventListener('pointercancel', (event) => {
      if (event.pointerId !== activePointerId) return;
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
      activePointerId = null;
      endDrag();
    });

    carousel.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });

    carousel.addEventListener(
      'click',
      (event) => {
        if (!isDragging) return;
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );
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
