const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.site-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      const category = item.querySelector('img')?.getAttribute('src') ?? '';
      item.style.display = filter === 'all' || category.includes(`${filter}/`) ? 'block' : 'none';
    });
  });
});

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
