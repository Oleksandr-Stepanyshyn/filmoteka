import { refs } from './refs';
import localeStorageServices from './localeStorageServices';
import FilmsApiService from './apiService';
import Notiflix from 'notiflix';
import pag from './pagination';
import { options } from '../templates/options';
import { renderMarkup, galleryReset } from './galleryFetch';

const filmsBandle = new FilmsApiService();
let filmsList = [];

refs.watched.addEventListener("click", onWatchedClick);
refs.queue.addEventListener("click", onQueueClick)

function onWatchedClick(e) {
    galleryReset();
    const watchedFilms = localeStorageServices.load("WatchedFilms")
    renderMarkup(watchedFilms);
    console.log(localeStorageServices.load("WatchedFilms"))
   localeStorageServices.save('DetailsFilmsCurrentPage', watchedFilms);
      Notiflix.Loading.remove();
      pag.makePagination(options, pag.renderNewDayPage);
      newFilmsBandle.incrementPageNumber();
}

function onQueueClick(e) {
    galleryReset();
    renderMarkup(localeStorageServices.load("QueueFilms"));
    localeStorageServices.save('DetailsFilmsCurrentPage', films);
      Notiflix.Loading.remove();
      pag.makePagination(options, pag.renderNewDayPage);
      newFilmsBandle.incrementPageNumber();
}

