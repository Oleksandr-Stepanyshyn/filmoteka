import modalMarkup from '../templates/modalMarkup';
import lsData from './localeStorageServices';

const key = 'DetailsFilmsCurrentPage';
const bodyEl = document.querySelector('body');

const films = lsData.load(key);
console.log(films);

const refs = {
  openModal: document.querySelector('.gallery__container'),
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]'),
}

refs.openModal.addEventListener("click", onOpenModal);
refs.backdrop.addEventListener("click", onBackdrop);
refs.closeBtn.addEventListener("click", onCloseModal);


function onOpenModal(e) {

  if (e.target.classList.contains('gallery__container'))
    return;
 
  const currentFilmId = Number(e.target.dataset.id);
  const clickedFilm = films.find((film) => film.id === currentFilmId);

  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('modal-open');  
  bodyEl.insertAdjacentHTML('beforeend', modalMarkup(clickedFilm));
  
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
