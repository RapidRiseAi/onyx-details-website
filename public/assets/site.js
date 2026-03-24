(() => {
  const BOOKING_ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_BOOKING_WEB_APP/exec';
  const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_CONTACT_WEB_APP/exec';

  const initMobileMenu = () => {
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#mobile-menu-panel');
    const menuClose = document.querySelector('[data-mobile-menu-close]');
    const backdrop = document.querySelector('[data-mobile-backdrop]');
    if (!menuToggle || !nav || !backdrop) return;

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
  };

  const initTrackControls = (root, selectors) => {
    const track = root.querySelector(selectors.track);
    const prev = root.querySelector(selectors.prev);
    const next = root.querySelector(selectors.next);
    if (!(track instanceof HTMLElement) || !(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) return;

    const slides = Array.from(track.children).filter((el) => el instanceof HTMLElement);
    if (!slides.length) {
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    const slideStep = () => {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const firstSlide = slides[0];
      return firstSlide.getBoundingClientRect().width + gap;
    };

    const maxIndex = () => Math.max(0, slides.length - 1);
    const currentIndex = () => {
      const step = slideStep();
      if (step <= 0) return 0;
      return Math.round(track.scrollLeft / step);
    };

    const updateControls = () => {
      const index = Math.max(0, Math.min(maxIndex(), currentIndex()));
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
  };

  const initResponsiveVariants = () => {
    const media = window.matchMedia('(max-width: 980px)');
    const sync = () => {
      const mobile = media.matches;

      document.querySelectorAll('[data-carousel-root]').forEach((root) => {
        const desktop = root.querySelector('[data-carousel-desktop-variant]');
        const mobileVariant = root.querySelector('[data-carousel-mobile-variant]');
        if (desktop instanceof HTMLElement) {
          desktop.hidden = mobile;
          desktop.setAttribute('aria-hidden', String(mobile));
          desktop.inert = mobile;
        }
        if (mobileVariant instanceof HTMLElement) {
          mobileVariant.hidden = !mobile;
          mobileVariant.setAttribute('aria-hidden', String(!mobile));
          mobileVariant.inert = !mobile;
        }
      });

      document.querySelectorAll('[data-service-carousel-root]').forEach((root) => {
        const desktop = root.querySelector('[data-service-desktop-variant]');
        const mobileVariant = root.querySelector('[data-service-mobile-variant]');
        if (desktop instanceof HTMLElement) {
          desktop.hidden = mobile;
          desktop.setAttribute('aria-hidden', String(mobile));
          desktop.inert = mobile;
        }
        if (mobileVariant instanceof HTMLElement) {
          mobileVariant.hidden = !mobile;
          mobileVariant.setAttribute('aria-hidden', String(!mobile));
          mobileVariant.inert = !mobile;
        }
      });
    };

    media.addEventListener('change', sync);
    sync();
  };

  const initImageCarousels = () => {
    document.querySelectorAll('[data-carousel-desktop-variant], [data-carousel-mobile-variant]').forEach((carousel) => {
      if (!(carousel instanceof HTMLElement)) return;
      if (carousel.dataset.carouselInit === 'true') return;
      carousel.dataset.carouselInit = 'true';
      initTrackControls(carousel, {
        track: '[data-image-carousel-track]',
        prev: '[data-image-carousel-prev]',
        next: '[data-image-carousel-next]'
      });
    });
  };

  const initServiceCarousels = () => {
    document.querySelectorAll('[data-service-mobile-variant]').forEach((carousel) => {
      if (!(carousel instanceof HTMLElement)) return;
      if (carousel.dataset.carouselInit === 'true') return;
      carousel.dataset.carouselInit = 'true';
      initTrackControls(carousel, {
        track: '[data-service-carousel-track]',
        prev: '[data-service-carousel-prev]',
        next: '[data-service-carousel-next]'
      });
    });
  };

  const initBookingModal = () => {
    const modal = document.querySelector('#booking-modal');
    const form = document.querySelector('#booking-form');
    if (!(modal instanceof HTMLDialogElement) || !(form instanceof HTMLFormElement)) return;
    const status = form.querySelector('.form-status');

    const openModal = (serviceId, serviceName) => {
      form.reset();
      const sourcePage = form.elements.namedItem('sourcePage');
      const serviceIdField = form.elements.namedItem('serviceId');
      const selectedService = form.elements.namedItem('selectedService');
      if (sourcePage) sourcePage.value = window.location.pathname;
      if (serviceIdField) serviceIdField.value = serviceId || '';
      if (selectedService && serviceName) selectedService.value = serviceName;
      modal.showModal();
    };

    document.querySelectorAll('[data-open-booking]').forEach((button) => {
      button.addEventListener('click', () => openModal(button.dataset.serviceId, button.dataset.serviceName));
    });

    modal.querySelector('[data-close-booking]')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (status) status.textContent = 'Submitting your booking request...';
      const data = new FormData(form);
      const payload = {
        timestamp: new Date().toISOString(),
        sourcePage: data.get('sourcePage'),
        serviceId: data.get('serviceId'),
        selectedService: data.get('selectedService'),
        fullName: data.get('fullName'),
        phone: data.get('phone'),
        address: data.get('address'),
        vehicleType: data.get('vehicleType'),
        preferredDate: data.get('preferredDate'),
        preferredTime: data.get('preferredTime'),
        specialNotes: data.get('specialNotes')
      };

      try {
        const response = await fetch(BOOKING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to submit booking request');
        if (status) status.textContent = 'Your booking request has been received. OnyxDetails will review your details and get back to you shortly to confirm availability.';
        form.reset();
      } catch {
        if (status) status.textContent = 'Unable to send booking request right now. Please try again or reach out on WhatsApp.';
      }
    });
  };

  const initContactForm = () => {
    const form = document.querySelector('#contact-form');
    if (!(form instanceof HTMLFormElement)) return;
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (status) status.textContent = 'Sending enquiry...';
      const data = new FormData(form);
      const payload = {
        timestamp: new Date().toISOString(),
        sourcePage: window.location.pathname,
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        area: data.get('area'),
        message: data.get('message')
      };

      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to submit enquiry');
        if (status) status.textContent = 'Your enquiry has been sent. OnyxDetails will get back to you shortly.';
        form.reset();
      } catch {
        if (status) status.textContent = 'Unable to send your enquiry right now. Please try again later.';
      }
    });
  };

  const initLightbox = () => {
    const lightbox = document.querySelector('#lightbox');
    const image = lightbox?.querySelector('img');
    if (!lightbox || !image) return;

    document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
      item.addEventListener('click', () => {
        lightbox.hidden = false;
        image.src = item.dataset.lightboxSrc || '';
        image.alt = item.dataset.lightboxAlt || '';
      });
    });

    lightbox.querySelector('[data-close-lightbox]')?.addEventListener('click', () => {
      lightbox.hidden = true;
    });
  };

  const init = () => {
    initMobileMenu();
    initResponsiveVariants();
    initImageCarousels();
    initServiceCarousels();
    initBookingModal();
    initContactForm();
    initLightbox();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
