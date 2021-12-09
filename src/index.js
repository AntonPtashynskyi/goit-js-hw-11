import SimpleLightbox from 'simplelightbox';

import fetchImages from './components/fetchApi';
import Api from './components/services';

const services = new Api();
const lightbox = new SimpleLightbox('.gallery img');
const galleryContainer = document.querySelector('.gallery');
const form = document.getElementById('search-form');

form.addEventListener('submit', handleInputtedValue);
galleryContainer.addEventListener('click', handleImageClick);

function handleInputtedValue(evt) {
  evt.preventDefault();
  services.resetPage();
  const inputValue = evt.currentTarget.elements.searchQuery.value;

  try {
    fetchImages(inputValue).then((response) => {
      renderGallery(response);
      services.setPage();
    });
  } catch (error) {
    console.log(error);
  }
}

function renderGallery(photos) {
  const markup = photos.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>`
    )
    .join('');

  galleryContainer.innerHTML = markup;
}

function handleImageClick(evt) {
  // console.log(evt.target);
}

function formattedSearchName(searchName) {
  return searchName.trim('').split(' ').join('+');
}
