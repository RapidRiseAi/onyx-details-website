const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.site-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const lightbox = document.querySelector<HTMLElement>('#lightbox');
const lightboxImage = lightbox?.querySelector<HTMLImageElement>('img');
document.querySelectorAll<HTMLElement>('[data-lightbox-src]').forEach((item) => {
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

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
  const carouselTrack = carousel.querySelector<HTMLElement>('[data-carousel-track]');
  const prevButton = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const nextButton = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!carouselTrack || !prevButton || !nextButton) return;

  const slides = Array.from(carouselTrack.querySelectorAll<HTMLElement>('.carousel-slide'));
  if (slides.length === 0) return;

  let currentIndex = 0;

  const visibleSlides = () => {
    const firstSlide = slides[0];
    const slideWidth = firstSlide.offsetWidth;
    if (slideWidth === 0) return 1;
    return Math.max(1, Math.floor(carouselTrack.clientWidth / slideWidth));
  };

  const updateCarousel = (behavior: ScrollBehavior = 'smooth') => {
    const maxIndex = Math.max(0, slides.length - visibleSlides());
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    carouselTrack.scrollTo({ left: slides[currentIndex].offsetLeft, behavior });
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
