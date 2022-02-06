import {renderMarkup,newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';
import { refs } from './refs';
import lsData from './localeStorageServices';
import { options1 } from '../templates/options1';

function makePagination(options,func) {
    options.totalPages = newFilmsBandle.totalPage;
    options.totalItems = newFilmsBandle.totalItems;
    const pagination = new Pagination(refs.paginationContainer,options);
    
    pagination.on('afterMove', (event) => {
    newFilmsBandle.page = event.page;
    refs.galleryEl.innerHTML = "";
    hidefirstAndLastPages(newFilmsBandle);
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
function hidefirstAndLastPages(instance) {
    document.querySelector('.tui-first').classList.remove('visually-hidden')
    document.querySelector('.tui-last').classList.remove('visually-hidden')
    if(instance.page<4){
        document.querySelector('.tui-first').classList.add('visually-hidden')
    }
    if(instance.page>instance.totalPage-3){
        document.querySelector('.tui-last').classList.add('visually-hidden')
    }
};

function libraryPagination(films){

    let page=1;
    options1.totalItems = films.length;
    let filmsOnPage=films.slice(0,options1.itemsPerPage);
    const pagination = new Pagination(refs.paginationContainer,options1)
    
    pagination.on('afterMove', (event) => {
        page = event.page;
        refs.galleryEl.innerHTML = "";
        filmsOnPage=films.slice((page-1)*options1.itemsPerPage, page*options1.itemsPerPage)
        renderMarkup(filmsOnPage);
    })
    renderMarkup(filmsOnPage);
    }
    
    
export default{
    renderNewSearchPage,
    makePagination,
    renderNewGenrePage,
    renderNewDayPage,
    libraryPagination
};