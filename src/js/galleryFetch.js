import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';

const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
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
        return newFilmsBandle.emptySearchQueryFilm();
    }

    galleryReset();
    
    newFilmsBandle.onFetchKeyWordFilms()
        .then((films) => {
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films)
        })
        .catch(console.log);
}
 
function renderMarkup(films){
 refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(films));
}

function galleryReset() {
    newFilmsBandle.resetPageNumber();
    refs.galleryEl.innerHTML = '';
}

export default {};