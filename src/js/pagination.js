import {renderMarkup,newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';
import { refs } from './refs';
import lsData from './localeStorageServices';
import { options } from './options/options';
import Notiflix from 'notiflix';

function makePagination(func) {
    if (newFilmsBandle.totalItems <= 20){
        return;
    }
    options.totalPages = newFilmsBandle.totalPage;
    options.totalItems = newFilmsBandle.totalItems;
    const pagination = new Pagination(refs.paginationContainer,options);
    hidefirstAndLastPages(newFilmsBandle.page, newFilmsBandle.totalPage);
    pagination.on('afterMove', (event) => {
        Notiflix.Loading.init({ svgColor: '#ff6b08' });
        Notiflix.Loading.dots('Loading...');
        newFilmsBandle.page = event.page;
        refs.galleryEl.innerHTML = "";
        Notiflix.Loading.remove(350);
        hidefirstAndLastPages(newFilmsBandle.page, newFilmsBandle.totalPage);
        func()
    })
}



function renderNewSearchPage(){
    return newFilmsBandle.onFetchKeyWordFilms()
    .then((films) => {
        renderMarkup(films);
        lsData.save('DetailsFilmsCurrentPage', films)
    })
    .catch(console.log);
}

function renderNewGenrePage(){
    Notiflix.Loading.init({ svgColor: '#ff6b08' });
    Notiflix.Loading.dots('Loading...');
    return newFilmsBandle.onFetchGenresFilms()
    .then((films) => {
        renderMarkup(films);
        Notiflix.Loading.remove(350);
        lsData.save('DetailsFilmsCurrentPage', films)
    })
    .catch(console.log);
}


function renderNewDayPage(){
    return newFilmsBandle.onFetchTopDayFilms()
    .then((films) => {
        renderMarkup(films);
        lsData.save('DetailsFilmsCurrentPage', films)
    })
    .catch(console.log);
}

function renderNewWeekPage(){
    return newFilmsBandle.onFetchTopWeekFilms()
    .then((films) => {
        renderMarkup(films);
        lsData.save('DetailsFilmsCurrentPage', films)
    })
    .catch(console.log);
}

function hidefirstAndLastPages(page,totalPage) {
    document.querySelector('.tui-first').classList.remove('visually-hidden')
    document.querySelector('.tui-last').classList.remove('visually-hidden')
    if(page<4){
        document.querySelector('.tui-first').classList.add('visually-hidden')
    }
    if(page>totalPage-3){
        document.querySelector('.tui-last').classList.add('visually-hidden')
    }
    if(totalPage<6){
        document.querySelector('.tui-first').classList.add('visually-hidden');
        document.querySelector('.tui-last').classList.add('visually-hidden');
}
};

function libraryPagination(films){

    let page=1;
    options.totalItems = films.length;
    let filmsOnPage=films.slice(0,options.itemsPerPage);
    options.totalPages = Math.ceil(options.totalItems/options.itemsPerPage);
    renderMarkup(filmsOnPage);   

    if(options.totalItems<=options.itemsPerPage){return}
    const pagination = new Pagination(refs.paginationContainer,options)
    hidefirstAndLastPages(page, options.totalPages);

    pagination.on('afterMove', (event) => {
        page = event.page;
        refs.galleryEl.innerHTML = "";
        filmsOnPage=films.slice((page-1)*options.itemsPerPage, page*options.itemsPerPage)
        renderMarkup(filmsOnPage);
        window.scrollTo({
            top: 0
          });
        hidefirstAndLastPages(page, options.totalPages);
    })
}
    
function makePaginationGenre(func) {
    if (newFilmsBandle.totalItems <= 20){
        return
    }
    options.totalPages=500;
    options.totalItems = 10000;
    const pagination = new Pagination(refs.paginationContainer,options);
    hidefirstAndLastPages(newFilmsBandle.page, newFilmsBandle.totalPage);

    pagination.on('afterMove', (event) => {
    newFilmsBandle.page = event.page;
    refs.galleryEl.innerHTML = "";
    hidefirstAndLastPages(newFilmsBandle.page, options.totalPages);
    func()})
}
    
export default{
    makePaginationGenre,
    renderNewSearchPage,
    makePagination,
    renderNewGenrePage,
    renderNewDayPage,
    renderNewWeekPage,
    libraryPagination,
};