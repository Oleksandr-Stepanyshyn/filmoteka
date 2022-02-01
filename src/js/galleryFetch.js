import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';
import {makePaginationSearch,makePaginationDay} from './pagination';
import {options} from '../templates/options';

const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
    errorEl: document.querySelector(".search-error"),
    paginationContainer: document.getElementById('tui-pagination-container'),
}

const newFilmsBandle = new FilmsApiService();

refs.formEl.addEventListener("submit", onFormElSubmit);

// Функция для отрисовки главной страницы, возвращает популярные фильмы дня
function renderDaylyTopFilms() {
    return newFilmsBandle.onFetchTopDayFilms()
        .then((films) => {
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films);
            makePaginationDay(options,newFilmsBandle);
        })
        .catch(console.log);
}

renderDaylyTopFilms();

// Функция для отрисовки страницы с фильмами по запросу из формы
function onFormElSubmit(e) { 
    e.preventDefault();

    const name = e.target.elements.searchQuery.value.trim();

    newFilmsBandle.query = name;

    if (!newFilmsBandle.query) { 
        return onEmptySearchError();
    }

    galleryReset();
    
    newFilmsBandle.onFetchKeyWordFilms()
        .then((films) => {
            
            if (films.length === 0) {
                return onFilmsSearchError(name);
            }
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films);
            makePaginationSearch(options,newFilmsBandle);
        })
        .catch(console.log);
}


//рендер разметки галлереи фильмов
function renderMarkup(films) {
    const markup = films.map(
        ({ poster_path, original_title, genre_ids, release_date, vote_average, original_name, id }) => {
            const date = new Date(Date.parse(release_date));
            const year = date.getFullYear();
            const vote = Number(vote_average).toFixed(1);
            let filmName = original_title;
            let genres = [];
            if (genre_ids.length > 3) {
                genres = `${genre_ids[0]}, ${genre_ids[1]}, other`
            } else if(genre_ids.length === 0){
                genres = 'other';
            } else {
                genres = genre_ids.join(', ');
            }

            if (!original_title) {
                filmName = original_name;
            }

            let filmsInfo = {
                poster_path,
                filmName,
                genre_ids,
                year,
                vote,
                genres,
                id,
            }

            // console.log(filmsInfo);
            return filmsInfo;
        }
    );

 refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(markup));
}

// перезагрузка галлереи
function galleryReset() {
    newFilmsBandle.resetPageNumber();
    newFilmsBandle.resetTotalItems();
    refs.galleryEl.innerHTML = '';
    refs.errorEl.innerHTML = '';
    refs.paginationContainer.innerHTML = '';
    refs.errorEl.classList.add('visually-hidden');
}

// функция-ошибка, если фильма с таким названием не найдено
function onFilmsSearchError(name) {
    galleryReset();
    refs.errorEl.classList.remove('visually-hidden');
    const error = `<p>Search result <span class="film-name">"${name}"</span> not successful. Enter the correct movie name</p>`
    refs.errorEl.insertAdjacentHTML('beforeend', error);
}

// функция-ошибка, если поисковый запрос пустой
function onEmptySearchError() {
    galleryReset()
    refs.errorEl.classList.remove('visually-hidden');
    const error = `<p>Field of search is empty, enter please keyword or words for begin search</p>`
    refs.errorEl.insertAdjacentHTML('beforeend', error);
    
}

export {renderMarkup};