import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Api from './components/services';

const services = new Api();
const gallery = new SimpleLightbox('.gallery a');
const galleryContainer = document.querySelector('.gallery');
const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', handleSubmitInput);
loadMoreBtn.addEventListener('click', handleMoreLoadBtn);

function handleSubmitInput(evt) {
  evt.preventDefault();
  galleryContainer.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  services.resetPage();
  services.resetSearchValue();

  const inputValue = evt.currentTarget.elements.searchQuery.value;
  services.setSearchValue(inputValue);

  try {
    services.fetchImages(inputValue).then((response) => {
      if (response.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${response.totalHits} images.`);

      renderGallery(response);
      loadMoreBtn.classList.remove('is-hidden');
    });
  } catch (error) {
    console.log(error);
  }
}

function handleMoreLoadBtn(evt) {
  try {
    services.fetchImages().then((photos) => {
      if (photos.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      renderGallery(photos);
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
        `<a href="${largeImageURL}" class="gallery-item">
          <div class="photo-card">
            
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>&#128151</b>
                  ${likes}
                </p>
                <p class="info-item">
                  <b>👁️‍🗨️</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>&#128172</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>💾</b>
                  ${downloads}
                </p>
              </div>
           </div>
        </a>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function formattedSearchName(searchName) {
  return searchName.trim('').split(' ').join('+');
}
