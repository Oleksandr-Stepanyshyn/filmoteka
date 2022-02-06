import localeStorageServices from "./localeStorageServices";
import { refs } from "./refs";

// refs.watchedBtn.addEventListener('click', addFilmsInWatched);
// const watchedBtn = document.querySelector('.modal-film__button-watched');
// const queueBtn = document.querySelector('.modal-film__button-queue');
// console.log(watchedBtn);

// const watchedFilms = [];

// // =================================

let watchedFilms = [];
let queueFilms = [];

// if (localStorage.getItem('WatchedFilms') !== null) {
//   watchedFilms =localeStorageServices.load('WatchedFilms');
//   // watchedKey = JSON.parse('Watched');
// };

// if (localStorage.getItem('QueueFilms') !== null) {
//   queueFilms =localeStorageServices.load('QueueFilms');
//   // queueKey = JSON.parse('Queue');
// };

// // ====================================

function addFilmsInWatched(e) {
  let filmId = e.target.dataset.id;

  // =================================

if (localStorage.getItem('WatchedFilms') !== null) {
  watchedFilms = localeStorageServices.load('WatchedFilms');
  // watchedKey = JSON.parse('Watched');
};

// if (localStorage.getItem('QueueFilms') !== null) {
//   queueFilms =localeStorageServices.load('QueueFilms');
//   // queueKey = JSON.parse('Queue');
// };

// ====================================
    
  // console.log('hello');
  // console.log(filmId);
  // localeStorageServices.load('WatchedFilms', );  загружаем в лс
  
  // console.log(localeStorageServices.load('DetailsFilmsCurrentPage'))

  // получить 1 фильм
  const arr = localeStorageServices.load('DetailsFilmsCurrentPage');
  arr.map((film,ind) => {
    if ( Number(filmId) !== film.id) return;
    // загружаем в лс
    watchedFilms.push(film);
    // console.log(watchedFilms);
    localeStorageServices.save('WatchedFilms', watchedFilms); 

  });

}

function addFilmsInQueue(e) {
  let filmId = e.target.dataset.id;

  // =================================

// if (localStorage.getItem('WatchedFilms') !== null) {
//   watchedFilms = localeStorageServices.load('WatchedFilms');
//   // watchedKey = JSON.parse('Watched');
// };

if (localStorage.getItem('QueueFilms') !== null) {
  queueFilms =localeStorageServices.load('QueueFilms');
  // queueKey = JSON.parse('Queue');
};

// ====================================
    
  // console.log('hello');
  // console.log(filmId);
  // localeStorageServices.load('WatchedFilms', );  загружаем в лс
  
  // console.log(localeStorageServices.load('DetailsFilmsCurrentPage'))

  // получить 1 фильм
  const arr = localeStorageServices.load('DetailsFilmsCurrentPage');
  arr.map((film,ind) => {
    if ( Number(filmId) !== film.id) return;
    // загружаем в лс
    queueFilms.push(film);
    // console.log(watchedFilms);
    localeStorageServices.save('QueueFilms', queueFilms); 

  });

}

export default {addFilmsInWatched, addFilmsInQueue};