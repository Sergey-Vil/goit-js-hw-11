import axios from 'axios';
import Notiflix from 'notiflix';
import { getGallery } from '../js/getGalleryAPI';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  btnLoadEl: document.querySelector('.load-more'),
};

refs.galleryEl.style.display = 'flex';
refs.galleryEl.style.flexWrap = 'wrap';
refs.searchForm.style.background = '#0f20ad';
refs.searchForm.style.display = 'flex';
refs.searchForm.style.justifyContent = 'center';
refs.searchForm.style.padding = '20px 0';
refs.searchForm.style.gap = '20px';
// refs.btnLoadEl.style.visibility = 'hidden';

const perPage = 100;
let page = 1;
let total;
let data = '';

refs.searchForm.addEventListener('submit', onSerch);

function onSerch(e) {
  e.preventDefault();
  refs.btnLoadEl.style.visibility = 'visibility';

  refs.galleryEl.innerHTML = '';
  data = e.target.elements.searchQuery.value.trim();
  // console.log(page);
  // console.log(totalPages);
  // console.log(total);
  // console.log(perPage);
  getList(data);
  // if (totalPages > 0) {
  //   refs.btnLoadEl.style.visibility = 'visibility ';
  // }
  if (!data) {
    refs.btnLoadEl.style.visibility = 'hidden';
  }
}
async function getList(data, page) {
  const res = await getGallery(data, page);
  total = res.data.totalHits;
  const currentData = res.data.hits;
  const totalPages = total / perPage;
  console.log(page);
  console.log(total);
  console.log(perPage);
  console.log(totalPages);

  console.log(res);

  if (currentData.length > 0) {
    createFotoCard(currentData, page);
  }
}

function createFotoCard(arr) {
  const markup = arr
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
  <div class="photo-card">
  <img src="${webformatURL} " alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:<br> ${downloads}</b>
    </p>
  </div>
</div>
  `;
    })
    .join();

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

refs.btnLoadEl.addEventListener('click', onBtnLoadClick);

function onBtnLoadClick(e) {
  refs.btnLoadEl.style.visibility = 'visibility';
  page += 1;
  getList(data, page);
  console.log(page);
  console.log(total);
  console.log(perPage);
  console.log(totalPages);
}
