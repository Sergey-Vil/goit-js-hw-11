import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32799764-75091cc806dab77fae6a325d0';

export async function getGallery(value, page) {
  const config = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 100,
  };
  const response = axios.get(`${BASE_URL}`, { params: config });

  return response;
}
// function getGallery() {
//   return fetch(
//     `https://pixabay.com/api/?key=32799764-75091cc806dab77fae6a325d0&q=yellow+flowers&image_type=photo`
//   ).then(response => console.log(response.json()));
// }
