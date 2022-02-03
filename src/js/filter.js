
// import FilmsApiService from './apiService';
// import renderDaylyTopFilms from './galleryFetch'

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

// const filmsApiServise = new FilmsApiService();
// console.log(filmsApiServise);
// //
// markupFilterBtn();
// filmsFilter();
//фільтруєм по рейтингу
// function filmsFilter() {
//     return filmsApiServise.onFetchTopDayFilms()
//         .then(response => {
//             console.log(response);
//             const filter = response.map(film => film.vote_average);
//             const descendingSort = filter.sort((a, b) => b - a);
//             console.log(descendingSort);
//             const ascendingSort = filter.sort((a, b) => a - b);
//             console.log(ascendingSort);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
       
     


            
    
