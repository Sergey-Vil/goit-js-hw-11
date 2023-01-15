import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32799764-75091cc806dab77fae6a325d0';

export async function getGallery(value, page = 1) {
  const config = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 40,
  };
  const response = axios.get(`${BASE_URL}`, { params: config });

  return response;
}
