import cardMarkup from '../templates/cardMarkup';
import FilmsApiService from './apiService';
import Pagination from 'tui-pagination';
// import instance from './pagination'
// console.log(instance)

const refs = {
    formEl: document.querySelector(".form"),
    galleryEl: document.querySelector(".gallery__container"),
    errorEl: document.querySelector(".search-error"),
    container: document.getElementById('tui-pagination-container')
}
let test ='';
const newFilmsBandle = new FilmsApiService();
const options =  { 
    totalItems: test,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
        '<a href="#" class=" tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
    '</a>',
        disabledMoveButton:
            '<span class=" visually-hidden tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'      
    }
}


refs.formEl.addEventListener("submit", onFormElSubmit);

// Функция для отрисовки главной страницы, возвращает популярные фильмы дня
function renderDaylyTopFilms() {
    return newFilmsBandle.onFetchTopDayFilms()
        .then((films) => {
            console.log(newFilmsBandle.totalitems)
            test =  newFilmsBandle.totalitems;
            newFilmsBandle.incrementPageNumber();
            renderMarkup(films);
            const instance = new Pagination(refs.container,options);
            instance.on('afterMove', (event) => {
        newFilmsBandle.page = event.page;
        refs.galleryEl.innerHTML = "";
        return newFilmsBandle.onFetchTopDayFilms()
            .then((films) => {
                renderMarkup(films);
                console.log(newFilmsBandle.totalItems)
            })
            .catch(console.log);

});
        })
        .catch(console.log);
}

renderDaylyTopFilms();

console.log(newFilmsBandle.totalitems)


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

 export {newFilmsBandle, renderMarkup};