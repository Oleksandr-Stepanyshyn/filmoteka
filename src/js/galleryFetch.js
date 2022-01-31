import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';
import {makePaginationSearch,makePaginationDay} from './pagination';
import {options} from '../templates/options';

const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
    errorEl: document.querySelector(".search-error"),
    container: document.getElementById('tui-pagination-container')
}
const newFilmsBandle = new FilmsApiService();

refs.formEl.addEventListener("submit", onFormElSubmit);

// Функция для отрисовки главной страницы, возвращает популярные фильмы дня
function renderDaylyTopFilms() {
    return newFilmsBandle.onFetchTopDayFilms()
        .then((films) => {
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films);
            options.totalItems = newFilmsBandle.totalitems;
            makePaginationDay(options,newFilmsBandle);
})
        
        .catch(console.log);
}

renderDaylyTopFilms();

// Функция для отрисовки страницы с фильмами по запросу из формы
function onFormElSubmit(e) { 
    e.preventDefault();

    newFilmsBandle.query = e.target.elements.searchQuery.value.trim();

    if (!newFilmsBandle.query) { 
        return onFilmsSearchError();
    }

    galleryReset();
    
    newFilmsBandle.onFetchKeyWordFilms()
        .then((films) => {
            if (films.length === 0) {
                return onFilmsSearchError();
            }
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films)
            options.totalItems = newFilmsBandle.totalitems;
            makePaginationSearch(options,newFilmsBandle);
        })
        .catch(console.log);
}

//рендер разметки галлереи фильмов
function renderMarkup(films){
 refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(films));
}

// перезагрузка галлереи
function galleryReset() {
    newFilmsBandle.resetPageNumber();
    refs.galleryEl.innerHTML = '';
    refs.errorEl.classList.add('visually-hidden');
}

// функция-ошибка, если поисковый запрос пустой, или фильма с таким названием не найдено
function onFilmsSearchError() {
    refs.errorEl.classList.remove('visually-hidden')
}

export {renderMarkup};