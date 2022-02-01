import {renderMarkup} from './galleryFetch';
import Pagination from 'tui-pagination';

const refs= {
    gallery: document.querySelector(".gallery__container"),
    container: document.getElementById('tui-pagination-container'),
}

function makePaginationDay(options,instance) {
            const pagination = new Pagination(refs.container,options);
            
            pagination.on('afterMove', (event) => {
            instance.page = event.page;
            refs.gallery.innerHTML = "";
            return instance.onFetchTopDayFilms()
            .then((films) => {
                renderMarkup(films);
            })
            .catch(console.log);})
    }


function makePaginationSearch(options,instance) {
        const pagination = new Pagination(refs.container,options);
        
        pagination.on('afterMove', (event) => {
        instance.page = event.page;
        refs.gallery.innerHTML = "";
        return instance.onFetchKeyWordFilms()
        .then((films) => {
            renderMarkup(films);
        })
        .catch(console.log);})
}



// function hidefirstAndLastPages() {
    
// }
export {makePaginationSearch,makePaginationDay}