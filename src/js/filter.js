
import FilmsApiService from './apiService';
import {renderMarkup, renderDaylyTopFilms } from './galleryFetch';

// const addFilterBtn = document.querySelector('.header .container');

//функція розмітка кнопок фільтру(без функціоналу тому закоментував)

// function markupFilterBtn() {
//     return addFilterBtn.insertAdjacentHTML(
//      'beforeend', 
//         `<div class="filter-container">
//             <button class="filter-btn_up">
//                 <span>&#129045;</span>
//             </button>
//             <button class="filter-btn_down">
//                 <span>&#129047;</span>
//             </button>
//         </div>`);
    
// };

const filmsApiServise = new FilmsApiService();

// markupFilterBtn();
ascendingSortFilms();
descendingSortFilms();
renderDaylyTopFilms();
//фільтруєм по рейтингу
function ascendingSortFilms() {
    return filmsApiServise.onFetchTopDayFilms()
        .then(response => {
            // console.log(response);
            // const filter = response.map(film => film.vote_average);
            // const descendingSort = filter.sort((a, b) => b - a);
            // console.log(descendingSort);
            // const ascendingSort = filter.sort((a, b) => a - b);
            // console.log(ascendingSort);
            const ascendingSort = [...response].sort((firstFilm, secondFilm) => firstFilm.vote_average - secondFilm.vote_average);
            console.log(ascendingSort);
            // renderAscendingFilms();
        })
        .catch(err => {
            console.log(err);
        });
};
function descendingSortFilms() {
    return filmsApiServise.onFetchTopDayFilms()
        .then(response => {
          const descendingSort = [...response].sort((firstFilm, secondFilm) => secondFilm.vote_average - firstFilm.vote_average);
            console.log(descendingSort);
        })
        .catch(err => {
            console.log(err);
        })
};
// renderAscendingFilms();
// function renderAscendingFilms() {
//     return renderDaylyTopFilms()
//         .then(film => {
//             ascendingSortFilms();
//         console.log(film);
//         })
//         .catch(err => {
//             console.log(err);
//         })