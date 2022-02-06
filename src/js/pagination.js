import {renderMarkup,newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';
import { refs } from './refs';

import lsData from './localeStorageServices';

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
export default{
    renderNewSearchPage,
    makePagination,
    renderNewGenrePage,
    renderNewDayPage
};