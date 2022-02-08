import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';
import Notiflix from 'notiflix';
import pag from './pagination';
import { refs } from './refs';
import localeStorageServices from './localeStorageServices';
import { onLoadSite } from './togglerDayOrWeek';
import genresListTemplate from '../templates/genresList';

const newFilmsBandle = new FilmsApiService();
let genresList = [];
refs.formEl.addEventListener('submit', onFormElSubmit);
refs.formSelectGenreEl.addEventListener('change', onSelectChange);

// Функция для отрисовки главной страницы, возвращает популярные фильмы дня.
function renderDaylyTopFilms() {
  Notiflix.Loading.init({ svgColor: '#ff6b08' });
  Notiflix.Loading.dots('Loading...');
  
  galleryReset();

  return newFilmsBandle
    .onFetchTopDayFilms()
    .then(films => {
      renderMarkup(films);
      localeStorageServices.save('DetailsFilmsCurrentPage', films);
      Notiflix.Loading.remove();
      pag.makePagination(pag.renderNewDayPage);
      newFilmsBandle.incrementPageNumber();
    })
    .catch(console.log);
}

// Функция для отрисовки главной страницы, возвращает популярные фильмы недели.
function renderWeeklyTopFilms() {
  Notiflix.Loading.init({ svgColor: '#ff6b08' });
  Notiflix.Loading.dots('Loading...');
  return newFilmsBandle
    .onFetchTopWeekFilms()
    .then(films => {
      renderMarkup(films);
      localeStorageServices.save('DetailsFilmsCurrentPage', films);
      Notiflix.Loading.remove();
      if (newFilmsBandle.page === 1) {
        pag.makePagination(pag.renderNewWeekPage);
      }
      newFilmsBandle.incrementPageNumber();
    })
    .catch(console.log);
}

// Функция, которая запрашивает жанры и возвращет их в выпадающем списке
function fetchIDFilms() {
  return newFilmsBandle
    .onFetchId()
    .then(genres => {
      genresList = genres;
      renderGenresList(genres);
      return genresList;
    })
    .then((genresList) => localeStorageServices.save('FilmIDs', genresList))
    .catch(console.log);
}

fetchIDFilms();
onLoadSite();

// Функция для отрисовки списка жанров
function renderGenresList(genres) {
  refs.formSelectGenreEl.insertAdjacentHTML('beforeend', genresListTemplate(genres))
}

// Функция для отрисовки страницы с фильмами по запросу названия из формы
function onFormElSubmit(e) {
  e.preventDefault();
  Notiflix.Loading.init({ svgColor: '#ff6b08' });
  Notiflix.Loading.dots('Loading...');
  
  const name = e.target.elements.searchQuery.value.trim();
  newFilmsBandle.query = name;

  if (!newFilmsBandle.query) {
    return onEmptySearchError();
  }

  galleryReset();
  refs.formSelectGenreEl.value = "";

  newFilmsBandle
    .onFetchKeyWordFilms()
    .then(films => {
      if (films.length === 0) {
        return onFilmsSearchError(name);
      }
      renderMarkup(films);
      Notiflix.Loading.remove(350);
      pag.makePagination(pag.renderNewSearchPage);
      newFilmsBandle.incrementPageNumber();
      localeStorageServices.save('DetailsFilmsCurrentPage', films);
    })
    .catch(console.log);
}

// Функция для отрисовки страницы с фильмами по запросу из списка жанров
function onSelectChange(e) {
  Notiflix.Loading.init({ svgColor: '#ff6b08' });
  Notiflix.Loading.dots('Loading...');

  const genreId = e.currentTarget.value;
  newFilmsBandle.genre = genreId;

  if (!newFilmsBandle.genre) {
    return renderDaylyTopFilms();
  };

  galleryReset();
  refs.formEl.elements.searchQuery.value = "";

  newFilmsBandle
    .onFetchGenresFilms()
    .then(films => {
      renderMarkup(films);
      Notiflix.Loading.remove(350);
      if(newFilmsBandle.totalPage>500){
        pag.makePaginationGenre(pag.renderNewGenrePage);
      }
      else{
        pag.makePagination(pag.renderNewGenrePage);
      }
      newFilmsBandle.incrementPageNumber();
      localeStorageServices.save('DetailsFilmsCurrentPage', films);
    })
    .catch(console.log);
}

//рендер разметки галлереи фильмов
function renderMarkup(films) {
  const markup = films.map(
    ({ poster_path, original_title, genre_ids, release_date, vote_average, original_name, id }) => {
      const date = new Date(Date.parse(release_date));
      let year = date.getFullYear();
      if (!release_date) { 
        year = 'unknown';
      };

      const vote = Number(vote_average).toFixed(1);

      let filmName = original_title;
      let genresFilm = parsGenres(genre_ids, genresList);

      if (genre_ids.length > 3) {
        genresFilm = `${genresFilm[0]}, ${genresFilm[1]}, other`;
      } else if (genre_ids.length === 0) {
        genresFilm = 'other';
      } else {
        genresFilm = genresFilm.join(', ');
      }

      if (!original_title) {
        filmName = original_name;
      }

      let filmsInfo = {
        poster_path,
        filmName,
        year,
        vote,
        genresFilm,
        id,
      };

      return filmsInfo;
    },
  );
  refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(markup));
}

// функция, которая парсит жанры из их айдишек
function parsGenres(genresId, genresList) {
  const nameGenres = [];
  for (let i = 0; i <= genresId.length; i += 1) {
    genresList.map(({ id, name }) => {
      if (id === genresId[i]) {
        nameGenres.push(name);
      }
    });
  }
  return nameGenres;
}

// перезагрузка галлереи
function galleryReset() {
  newFilmsBandle.resetPageNumber();
  newFilmsBandle.resetTotalItems();
  refs.galleryEl.innerHTML = '';
  refs.errorEl.innerHTML = '';
  refs.paginationContainer.innerHTML = '';
  refs.errorEl.classList.add('search-error--hidden');
  refs.errorImgEl.classList.add('visually-hidden');
  refs.galleryEl.classList.remove('visually-hidden');
  refs.paginationContainer.classList.remove('visually-hidden');
  refs.emptyLibEl.classList.add('visually-hidden');
}

// функция-ошибка, если фильма с таким названием не найдено
function onFilmsSearchError(name) {
  Notiflix.Loading.remove(350);
  const error = `<p>Search result <span class="film-name">"${name}"</span> not successful. Enter the correct movie name</p>`;
  onErrors(error);
}

// функция-ошибка, если поисковый запрос пустой
function onEmptySearchError() {
  Notiflix.Loading.remove(350);
  const error = `<p>Field of search is empty, enter please keyword or words for begin search</p>`;
  onErrors(error);
}

// рендер ошибки
function onErrors(error) {
  galleryReset();
  Notiflix.Loading.remove(250);
  refs.errorEl.classList.remove('search-error--hidden');
  refs.errorImgEl.classList.remove('visually-hidden');
  refs.galleryEl.classList.add('visually-hidden');
  refs.paginationContainer.classList.add('visually-hidden');
  refs.errorEl.insertAdjacentHTML('beforeend', error);

  setTimeout(() => {
    refs.errorEl.classList.add('search-error--hidden');
  }, 3000);
}

export { renderMarkup, renderDaylyTopFilms, renderWeeklyTopFilms, newFilmsBandle, galleryReset, parsGenres };
