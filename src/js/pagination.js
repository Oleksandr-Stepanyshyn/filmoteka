// import FilmsApiService from './apiService';
import {renderMarkup, newFilmsBandle} from './galleryFetch';
import Pagination from 'tui-pagination';

const refs= {
    pagesList: document.querySelector('.pagination'),
    btnBack: document.querySelector('.arrow-back'),
    btnForward: document.querySelector('.tui-next'),
    gallery: document.querySelector(".gallery__container"),
    container: document.getElementById('tui-pagination-container'),
}
const options =  { 
        totalItems:2000,
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

const instance = new Pagination(refs.container,options);
// refs.btnForward.textContent = '<svg class="pagination__icon" width="16" height="16"><use href="./images/sprite.svg#icon-arrow-next"></use></svg>'
instance.on('afterMove', (event) => {
    newFilmsBandle.page = event.page;
    refs.gallery.innerHTML = "";
    return newFilmsBandle.onFetchTopDayFilms()
        .then((films) => {
            renderMarkup(films);
        })
        .catch(console.log);

});

