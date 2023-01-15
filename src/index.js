import '../css/style.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { getGallery } from '../js/getGalleryAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  btnLoadEl: document.querySelector('.load-more'),
};

refs.searchForm.style.background = '#0f20ad';
refs.searchForm.style.display = 'flex';
refs.searchForm.style.justifyContent = 'center';
refs.searchForm.style.padding = '20px 0';
refs.searchForm.style.gap = '20px';
refs.btnLoadEl.style.display = 'none';

const perPage = 40;
let page = 1;
let total;
let data = '';
let totalPages = 0;
let res = {};

refs.searchForm.addEventListener('submit', onSerch);

function onSerch(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  data = e.target.elements.searchQuery.value.trim();
  page = 1;
  e.target.reset();
  if (data == '' || data.length === 0) {
    // refs.galleryEl.innerHTML = '';
    refs.btnLoadEl.style.display = 'none';
    return;
  }

  if (data.length > 0) {
    getList(data);
  }

  return;
}
async function getList(data, page) {
  res = await getGallery(data, page);
  console.log(res.data.hits);

  if (res.data.total === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  if (res.data.hits.length > 0) {
    createFotoCard(res.data.hits, page);
  }

  if (page === undefined && res.data.total > 0) {
    Notiflix.Notify.success(`Hooray! We found ${res.data.total} images.`);
  }

  if (page >= totalPages || res.data.hits.length < 40) {
    refs.btnLoadEl.style.display = 'none';
  }
  data = '';
}

function createFotoCard(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}"   data-source="${largeImageURL}"alt="${tags}" loading="lazy" width = "390px" height = "250px"/></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes:<br> ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:<br> ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:<br> ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:<br> ${downloads}</b>
    </p>
  </div>
</div>
  `;
      }
    )
    .join();
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  refs.btnLoadEl.style.display = 'block';
  let gallery = new SimpleLightbox('.gallery a');
}

refs.btnLoadEl.addEventListener('click', onBtnLoadClick);

function onBtnLoadClick(e) {
  page += 1;
  total = res.data.totalHits;
  totalPages = total / perPage;
  getList(data, page);
}
