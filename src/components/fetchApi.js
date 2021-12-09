import Api from './services';

const services = new Api();
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=24742243-f1ccb4b554382da08302fd92e';

export default async function fetchImages(searchName) {
  const response = await fetch(
    `${BASE_URL}?${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${services.getPage}&per_page=40`
  );
  return await response.json();
}
