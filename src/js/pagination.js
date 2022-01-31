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
// export {options}

// const newFilmsService = new FilmsApiService();

// function makePaginagesList (totalPages,page ){
//     // refs.pagesList.innerHTML= "";
//     let markup = '';
    
//     console.log(newFilmsBandle.page)
//     let minPage = newFilmsBandle.page-4;
//     let maxPage = newFilmsBandle.page+4;
//     console.log(minPage)
//     for (let i = minPage; i <= maxPage; i+=1) {
//         let isActive = '';
//         if(newFilmsBandle.page===i){
//            isActive = "active";
//         }
//         markup += `<li class="pagination-item ${isActive} number"><span>${i}</span></li>`
//     }
//     console.log(markup)
// //     `<li class="pagination-item number"><span>${page-2}</span></li>
// //     <li class="pagination-item number"><span>${page-1}</span></li>
// //     <li class="pagination-item active number"><span>${page}</span></li>
// //     <li class="pagination-item number"><span>${page+1}</span></li>
// //     <li class="pagination-item number"><span>${page+2}</span></li>
// // `
// refs.pagesList.innerHTML= markup;
//  }
// makePaginagesList (20,newFilmsBandle.page)

// refs.btnBack.addEventListener('click', onBtnBack)
// refs.btnForward.addEventListener('click', onBtnForward)

// function onBtnBack(){
//     onBtn(-1);
// }

// function onBtnForward(){
//     onBtn(+1)
// }

// function onBtn(num){
//     newFilmsBandle.page +=num;
//     
//     makePaginagesList (20,newFilmsBandle.page)
    //  return newFilmsBandle.onFetchTopDayFilms()
    //     .then((films) => {
    //         renderMarkup(films)
    //     })
    //     .catch(console.log);

// }

