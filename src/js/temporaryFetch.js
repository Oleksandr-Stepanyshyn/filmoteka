import cardMarkup from '../templates/cardMarkup';

const API_KEY = 'c01f14dcdb58e9cec669b1017a4d540c';
const BASE_URL = 'https://api.themoviedb.org/3/';

// !написано для проверки верстки, снести, как только пропишут класс! vv
const refs = {
    btnEl: document.querySelector(".button"),
    galleryEl: document.querySelector(".container"),
}

refs.btnEl.addEventListener("click", onBtnClick);

function onBtnClick() {
    fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(({results})=>(renderMarkup(results)))
        .catch(console.log);
}
 
function renderMarkup(films){
 refs.galleryEl.insertAdjacentHTML('beforeend', cardMarkup(films));
}

export default {};
// !написано для проверки верстки, снести, как только пропишут класс! ^^