import cardMarkup from '../templates/cardMarkup';
import errorsOnSearch from '../templates/errorsOnSearch';
import errorOnEmptySearch from '../templates/errorOnEmptySearch';
import FilmsApiService from './apiService';


const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
    errorEl: document.querySelector(".search-error")
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

    const name = e.target.elements.searchQuery.value.trim();

    newFilmsBandle.query = name;

    if (!newFilmsBandle.query) { 
        return onEmptySearchError();
    }

    galleryReset();
    
    newFilmsBandle.onFetchKeyWordFilms(name)
        .then((films) => {
            if (films.length === 0) {
                console.log(name)
                return onFilmsSearchError(name);
            }
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films)
        })
        .catch(console.log);
}

//рендер разметки галлереи фильмов
function renderMarkup(films) {
    const markup = films.map(
        ({ poster_path, title, genre_ids, release_date, vote_average }) => {
            const date = new Date(Date.parse(release_date));
            const year = date.getFullYear();
            const vote = Number(vote_average).toFixed(1);
            let posterTmpl = '';
            if (!poster_path) {
                posterTmpl = "../images/template-poster.jpg";
            }

            let filmsInfo = {
                poster_path,
                title,
                genre_ids,
                year,
                vote,
                posterTmpl
            }
            return filmsInfo;
        }
    );

 refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(markup));
}

// перезагрузка галлереи
function galleryReset() {
    newFilmsBandle.resetPageNumber();
    refs.galleryEl.innerHTML = '';
    refs.errorEl.innerHTML = '';
    refs.errorEl.classList.add('visually-hidden');
}

// функция-ошибка, если фильма с таким названием не найдено
function onFilmsSearchError(name) {
    galleryReset()
    refs.errorEl.insertAdjacentHTML('beforeend', errorsOnSearch({ name: name }));
    refs.errorEl.classList.remove('visually-hidden');
}

// функция-ошибка, если поисковый запрос пустой
function onEmptySearchError() {
    galleryReset()
    refs.errorEl.classList.remove('visually-hidden');
    refs.errorEl.insertAdjacentHTML('beforeend', errorOnEmptySearch());
}

export default {};