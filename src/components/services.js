const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=24742243-f1ccb4b554382da08302fd92e';

class Api {
  constructor() {
    this.page = 1;
    this.searchValue = '';
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}?${API_KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );

    this.page += 1;
    return await response.json();
  }

  resetPage() {
    this.page = 1;
  }

  setSearchValue(inputtedValue) {
    this.searchValue = inputtedValue;
  }

  resetSearchValue() {
    this.searchValue = '';
  }
}

export default Api;
