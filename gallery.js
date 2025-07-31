const filterBtns = document.querySelectorAll('.filter-btn');
const gallery = document.getElementById('gallery');
const galleryItems = [...document.querySelectorAll('.gallery-item')];

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let filteredItems = [...galleryItems];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filteredItems = galleryItems.filter(item => filter === 'all' || item.dataset.category === filter);
    galleryItems.forEach(item => {
      if (filteredItems.includes(item)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

function openLightbox(index) {
  currentIndex = index;
  const img = filteredItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('show');
  lightboxImg.setAttribute('aria-modal', 'true');
  lightboxImg.setAttribute('role', 'dialog');
}

function closeLightbox() {
  lightbox.classList.remove('show');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
  updateLightboxImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % filteredItems.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = filteredItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.style.display !== 'none') {
      const visibleIndex = filteredItems.indexOf(item);
      openLightbox(visibleIndex);
    }
  });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  switch (e.key) {
    case 'ArrowLeft':
      showPrev();
      break;
    case 'ArrowRight':
      showNext();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
}); 