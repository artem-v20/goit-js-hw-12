import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Likes</span>
            <span class="value">${likes}</span>
          </div>
          <div class="info-item">
            <span class="label">Views</span>
            <span class="value">${views}</span>
          </div>
          <div class="info-item">
            <span class="label">Comments</span>
            <span class="value">${comments}</span>
          </div>
          <div class="info-item">
            <span class="label">Downloads</span>
            <span class="value">${downloads}</span>
          </div>
        </div>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.remove('visible');
}
