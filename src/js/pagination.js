import {renderMarkup,newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';
import { refs } from './refs';
import lsData from './localeStorageServices';
import { options1 } from '../templates/options1';

function makePagination(options,func) {
    if (newFilmsBandle.totalItems < 20){
        return
    }

    options.totalPages = newFilmsBandle.totalPage;
    options.totalItems = newFilmsBandle.totalItems;
    const pagination = new Pagination(refs.paginationContainer,options);
    hidefirstAndLastPages(newFilmsBandle.page, newFilmsBandle.totalPage);

    pagination.on('afterMove', (event) => {
    newFilmsBandle.page = event.page;
    refs.galleryEl.innerHTML = "";
    hidefirstAndLastPages(newFilmsBandle.page, newFilmsBandle.totalPage);
    func()})
}

function makePaginationGenre(options,func) {
    if (newFilmsBandle.totalItems < 20){
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

function renderNewSearchPage(){
    return newFilmsBandle.onFetchKeyWordFilms()
    .then((films) => {
        renderMarkup(films);
        lsData.save('DetailsFilmsCurrentPage', films)
    })
    .catch(console.log);
}

function renderNewGenrePage(){
    return newFilmsBandle.onFetchGenresFilms()
    .then((films) => {
        renderMarkup(films);
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
    options1.totalItems = films.length;
    let filmsOnPage=films.slice(0,options1.itemsPerPage);
    options1.totalPages = Math.ceil(options1.totalItems/options1.itemsPerPage);
    renderMarkup(filmsOnPage);   

    if(options1.totalItems<options1.itemsPerPage){return}
    const pagination = new Pagination(refs.paginationContainer,options1)
    hidefirstAndLastPages(page, options1.totalPages);

    pagination.on('afterMove', (event) => {
        page = event.page;
        refs.galleryEl.innerHTML = "";
        filmsOnPage=films.slice((page-1)*options1.itemsPerPage, page*options1.itemsPerPage)
        renderMarkup(filmsOnPage);
        hidefirstAndLastPages(page, options1.totalPages);
    })
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