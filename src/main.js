import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showTopLoader,
  hideTopLoader,
  showBottomLoader,
  hideBottomLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalPages = 0;
const loadedImageIds = new Set();

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  loadedImageIds.clear();
  clearGallery();
  hideLoadMoreButton();
  showTopLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideTopLoader();

    if (!data.hits.length) {
      iziToast.error({
        message: 'Sorry, no images match your search query.',
        position: 'topRight',
      });
      return;
    }

    const newImages = data.hits.filter(img => !loadedImageIds.has(img.id));
    newImages.forEach(img => loadedImageIds.add(img.id));

    createGallery(newImages);
    input.value = '';
    input.focus();

    totalPages = Math.ceil(data.totalHits / perPage);

    if (loadedImageIds.size < data.totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideTopLoader();
    iziToast.error({
      message: 'Oops! Something went wrong.',
      position: 'topRight',
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  hideLoadMoreButton();
  showBottomLoader();

  const collectedImages = [];

  try {
    while (collectedImages.length < perPage && currentPage < totalPages) {
      currentPage += 1;

      const data = await getImagesByQuery(currentQuery, currentPage);
      const unique = data.hits.filter(img => !loadedImageIds.has(img.id));

      unique.forEach(img => loadedImageIds.add(img.id));
      collectedImages.push(...unique);
    }

    hideBottomLoader();

    if (!collectedImages.length) {
      iziToast.info({
        message: "You're already viewing all available results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(collectedImages.slice(0, perPage));
    scrollByTwoCardHeights();

    if (
      currentPage >= totalPages ||
      loadedImageIds.size >= totalPages * perPage
    ) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideBottomLoader();
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    console.error(error);
  }
});

function scrollByTwoCardHeights() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height } = card.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
