
import modalMarkup from '../templates/modalMarkup';
import { load } from './localeStorageServices';

const key = 'DetailsFilmsCurrentPage';
const bodyEl = document.querySelector('body');

const films = load(key);
console.log(films);

function renderModal(films) {

  console.log(films);
  const filmMarkup = films.map(({ poster_path, vote_average, popularity, original_title, genre_ids, overview }) => {
    const data = {
      poster: poster_path,
      title: original_title,
      vote: vote_average,
      votes: vote_count,
      popularity: popularity,
      genres: genre_ids,
      overview: overview,
    }
    console.log(data.poster);
    return data;
  });

  return filmMarkup;

  bodyEl.insertAdjacentHTML('beforeend', modalMarkup(filmMarkup));
};

//________________________yulia

const refs = {
  openModal: document.querySelector('.gallery__container'),
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]'),
}

refs.openModal.addEventListener("click", onOpenModal);
refs.backdrop.addEventListener("click", onBackdrop);
refs.closeBtn.addEventListener("click", onCloseModal);



function onOpenModal(e) {
  // console.log(e.target);
  if (e.target.classList.contains('gallery__container'))
    return;
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('modal-open');

  renderModal(films);

}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('modal-open');
}
function onBackdrop(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

const refs = {
  openModal: document.querySelector('.gallery__container'),
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]')
}
refs.openModal.addEventListener("click", onOpenModal)
refs.backdrop.addEventListener("click", onBackdrop);
refs.closeBtn.addEventListener("click", onCloseModal)

function onOpenModal(event) {
  if (event.target.classList.contains('gallery__container')) {
    return;
  }

  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('modal-open')
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress)
  document.body.classList.remove('modal-open')
}
function onBackdrop(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

