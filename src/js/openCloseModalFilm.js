import modalMarkup from '../templates/modalMarkup';
import lsData from './localeStorageServices';
import { refs } from './refs';
import { parsGenres } from './galleryFetch';
import { onWatchedClick, onQueueClick } from './library';

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
    ...clickedFilm,
    popularity: Math.round(clickedFilm.popularity),
    genre_ids: parsGenres(clickedFilm.genre_ids, genres).join(', '),
  };

  bodyEl.insertAdjacentHTML('beforeend', modalMarkup(clickedFilmParams));
  bodyEl.classList.add('modal-open');
  const btnCloseModalFilm = document.querySelector('.modal-film__button-close');
  const backdropModalFilm = document.querySelector('.backdrop-modal-film');
  //---------------для роботи з локал сторедж------------------------

  lsData.btnTextChange(currentFilmId);
  const watchedBtn = document.querySelector('.modal-film__button-watched');
  const queueBtn = document.querySelector('.modal-film__button-queue');
  watchedBtn.addEventListener('click', e => {
    lsData.addToWatched(e);
  });
  queueBtn.addEventListener('click', e => {
    lsData.addToQueue(e);
  });
  
  if (!backdropModalFilm) {
    return;
  } else {
    const clearModal = () => {
      backdropModalFilm.remove();
      bodyEl.classList.remove('modal-open');
      document.removeEventListener('keydown', onEscClose);
    };

    btnCloseModalFilm.addEventListener('click', () => {
      clearModal();
    });

    backdropModalFilm.addEventListener('click', e => {
      if (!e.target.classList.contains('backdrop-modal-film')) return;
      clearModal();
    });

    document.addEventListener('keydown', onEscClose);

    function onEscClose(e) {
      if (e.code === 'Escape') clearModal();
    }
  }
}
