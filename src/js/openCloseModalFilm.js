import modalMarkup from '../templates/modalMarkup';
import lsData from './localeStorageServices';
import { refs } from './refs';
import { parsGenres } from './galleryFetch';

import ls from './ls';

const filmDetailsKey = 'DetailsFilmsCurrentPage';
const filmIDsKey = 'FilmIDs';
const bodyEl = document.querySelector('body');
refs.galleryEl.addEventListener('click', onOpenModal);
function onOpenModal(e) {
  const films = lsData.load(filmDetailsKey);
  const genres = lsData.load(filmIDsKey);
  
  if (e.target.classList.contains('gallery__container')) return;
  const currentFilmId = Number(e.target.dataset.id);
  const clickedFilm = films.find(film => film.id === currentFilmId);
  const clickedFilmParams = {
    popularity: Math.round(clickedFilm.popularity),
    poster_path: clickedFilm.poster_path,
    original_title: clickedFilm.original_title,
    vote_average: clickedFilm.vote_average,
    vote_count: clickedFilm.vote_count,
    original_title: clickedFilm.original_title,
    genre_ids: (parsGenres(clickedFilm.genre_ids, genres)).join(', '),
    overview: clickedFilm.overview,
    id: clickedFilm.id,
  }
  bodyEl.insertAdjacentHTML('beforeend', modalMarkup(clickedFilmParams));
  bodyEl.classList.add('modal-open');
  const btnCloseModalFilm = document.querySelector('.modal-film__button-close');
  const backdropModalFilm = document.querySelector('.backdrop-modal-film');
  //---------------для роботи з локал сторедж------------------------
  let filmId = e.target.dataset.id;
  lsData.btnTextChange(filmId);
  const watchedBtn = document.querySelector('.modal-film__button-watched');
  const queueBtn = document.querySelector('.modal-film__button-queue');
  watchedBtn.addEventListener('click', e => {
    lsData.addToWatched(e);
  });
  queueBtn.addEventListener('click', e => {
    lsData.addToQueue(e);
  });
// =====================================================

  watchedBtn.addEventListener('click', ls.addFilmsInWatched);
  queueBtn.addEventListener('click', ls.addFilmsInQueue);


// =====================================================
  //-------------------------------------------------------------------
  if (!backdropModalFilm) {
    return;
  } else {
    const clearModal = () => {
      backdropModalFilm.remove();
      bodyEl.classList.remove('modal-open');
    };
    btnCloseModalFilm.addEventListener('click', () => {
      clearModal();
    });
    backdropModalFilm.addEventListener('click', e => {
      if (!e.target.classList.contains('backdrop-modal-film')) return;
      clearModal();
    });
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        clearModal();
      }
    });
  }
}