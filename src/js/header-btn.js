const refs = {
  home: document.querySelector('.js-nav-home-btn'),
  library: document.querySelector('.js-nav-library-btn'),
  logo: document.querySelector('.js-logo-btn'),
  watched: document.querySelector('.js-btn-watched'),
  queue: document.querySelector('.js-btn-queue'),
  librarySection: document.querySelector('.library'),
  form: document.querySelector('.form'),
};

const header = document.querySelector('.header');

refs.home.addEventListener('click', onHomeBtnClick);
refs.library.addEventListener('click', onLibraryBtnClick);
refs.logo.addEventListener('click', onHomeBtnClick);

function onHomeBtnClick() {
  refs.home.classList.add('nav__btn--currently');
  refs.library.classList.remove('nav__btn--currently');
  header.classList.remove('header--library');
  refs.form.classList.remove('visually-hidden');
  refs.librarySection.classList.add('visually-hidden');
}

function onLibraryBtnClick() {
  refs.home.classList.remove('nav__btn--currently');
  refs.library.classList.add('nav__btn--currently');
  header.classList.add('header--library');
  refs.librarySection.classList.remove('visually-hidden');
  refs.form.classList.add('visually-hidden');
  refs.watched.classList.add('library__btn--currenly');
   refs.queue.classList.remove('library__btn--currenly');
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

