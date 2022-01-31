import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';


const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
    errorEl: document.querySelector(".search-error"),
}

const newFilmsBandle = new FilmsApiService();

refs.formEl.addEventListener("submit", onFormElSubmit);

// Функция для отрисовки главной страницы, возвращает популярные фильмы дня
function renderDaylyTopFilms() {
    return newFilmsBandle.onFetchTopDayFilms()
        .then((films) => {
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films)
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
            console.log(films);
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films)
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

export default {};