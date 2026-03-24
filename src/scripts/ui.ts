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
  initSwipeTracks();
};

const initSwipeTracks = () => {
  document.querySelectorAll('.service-grid-mobile-carousel, .carousel-track').forEach((trackEl) => {
    const track = trackEl as HTMLElement;
    if (track.dataset.swipeInit === 'true') return;
    track.dataset.swipeInit = 'true';

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let activePointerId: number | null = null;
    let dragAxisLocked = false;
    let isDragging = false;
    let suppressClickUntil = 0;

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      suppressClickUntil = Date.now() + 300;
      track.classList.remove('is-dragging');
    };

    track.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      activePointerId = event.pointerId;
      dragAxisLocked = false;
      isDragging = false;
      startX = event.clientX;
      startY = event.clientY;
      startScrollLeft = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
    });

    track.addEventListener('pointermove', (event) => {
      if (activePointerId !== event.pointerId) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!dragAxisLocked) {
        if (Math.abs(deltaX) < 4 && Math.abs(deltaY) < 4) return;
        dragAxisLocked = true;
      }

      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
      isDragging = true;
      track.classList.add('is-dragging');
      event.preventDefault();
      track.scrollLeft = startScrollLeft - deltaX;
    });

    track.addEventListener('pointerup', (event) => {
      if (activePointerId !== event.pointerId) return;
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      activePointerId = null;
      endDrag();
    });

    track.addEventListener('pointercancel', (event) => {
      if (activePointerId !== event.pointerId) return;
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      activePointerId = null;
      endDrag();
    });

    track.addEventListener(
      'click',
      (event) => {
        if (Date.now() > suppressClickUntil) return;
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );
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
