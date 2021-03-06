import 'animate.css';
import { refs } from './refs';
import { galleryReset } from './galleryFetch';
import { onLoadSite } from './togglerDayOrWeek';
import { onWatchedClick } from './library';

refs.home.addEventListener('click', onHomeBtnClick);
refs.library.addEventListener('click', onLibraryBtnClick);
refs.logo.addEventListener('click', onHomeBtnClick);

function onHomeBtnClick() {
  galleryReset();
  refs.formEl.reset();
  refs.toggler.classList.remove('visually-hidden');
  onLoadSite();

  refs.home.classList.add('nav__btn--currently');
  refs.library.classList.remove('nav__btn--currently');
  refs.header.classList.remove('header--library');
  refs.formEl.classList.remove('visually-hidden');
  refs.librarySection.classList.add('visually-hidden');
}

function onLibraryBtnClick() {
  onWatchedClick();
  refs.home.classList.remove('nav__btn--currently');
  refs.library.classList.add('nav__btn--currently');
  refs.header.classList.add('header--library');
  refs.librarySection.classList.remove('visually-hidden');
  refs.formEl.classList.add('visually-hidden');
  refs.watched.classList.add('library__btn--currenly');
  refs.queue.classList.remove('library__btn--currenly');
  refs.toggler.classList.add('visually-hidden');
}

refs.watched.addEventListener('click', toggleClassWatched);
refs.queue.addEventListener('click', toggleClassQueue);

function toggleClassQueue() {
  refs.queue.classList.add('library__btn--currenly');
  refs.watched.classList.remove('library__btn--currenly');
}
function toggleClassWatched() {
  refs.watched.classList.add('library__btn--currenly');
  refs.queue.classList.remove('library__btn--currenly');
}
