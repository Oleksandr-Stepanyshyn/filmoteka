import {renderMarkup,newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';

const refs= {
    gallery: document.querySelector(".gallery__container"),
    container: document.getElementById('tui-pagination-container'),
}

function makePagination(options,func) {
    options.totalPages = newFilmsBandle.totalPage;
    options.totalItems = newFilmsBandle.totalItems;
    const pagination = new Pagination(refs.container,options);
    
    pagination.on('afterMove', (event) => {
    newFilmsBandle.page = event.page;
    refs.gallery.innerHTML = "";
    hidefirstAndLastPages(newFilmsBandle);
    func()})
}

function renderNewSearchPage(){
    return newFilmsBandle.onFetchKeyWordFilms()
    .then((films) => {
        renderMarkup(films);
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
}
export {renderNewSearchPage,makePagination}