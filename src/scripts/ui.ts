const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

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

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const carouselTrack = carousel.querySelector('[data-carousel-track]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  if (!carouselTrack || !prevButton || !nextButton) return;

  const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
  if (slides.length === 0) return;

  let currentIndex = 0;

  const visibleSlides = () => {
    if (window.matchMedia('(max-width: 800px)').matches) return 1;
    if (window.matchMedia('(max-width: 1200px)').matches) return 2;
    return 3;
  };

  const updateCarousel = (behavior = 'smooth') => {
    const maxIndex = Math.max(0, slides.length - visibleSlides());
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    slides[currentIndex].scrollIntoView({ behavior, block: 'nearest', inline: 'start' });
  };

  prevButton.addEventListener('click', () => {
    currentIndex -= 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex += 1;
    updateCarousel();
  });

  window.addEventListener('resize', () => updateCarousel('auto'));
  updateCarousel('auto');
});
