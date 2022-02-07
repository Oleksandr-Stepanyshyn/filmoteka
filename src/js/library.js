import { refs } from './refs';
import localeStorageServices from './localeStorageServices';
import Notiflix from 'notiflix';
import pag from './pagination';
import { galleryReset } from './galleryFetch';


refs.watched.addEventListener("click", onWatchedClick);
refs.queue.addEventListener("click", onQueueClick)

const alert = `<div class="alert">
                    <p class="alert_greet">Hello movie lover!</p>
                    <p class="alert_text">You haven't added a movie yet. Please make your choice.</p>
                </div>`;

function onWatchedClick(e) {
    galleryReset();
    if(localStorage.getItem("watchedKey") === null){
        refs.paginationContainer.innerHTML = alert;
        return
    }
    const lengthArrWatchedLS = JSON.parse(localStorage.getItem("watchedKey")).length
    if (lengthArrWatchedLS === 0) refs.paginationContainer.innerHTML = alert;
    const watchedFilms = localeStorageServices.load("watchedKey");
    pag.libraryPagination(watchedFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', watchedFilms);
    Notiflix.Loading.remove();
}

function onQueueClick(e) {
    galleryReset();
    if(localStorage.getItem("queueKey") === null){
        refs.paginationContainer.innerHTML = alert;
        return
    }
    const lengthArrQueueLS = JSON.parse(localStorage.getItem("queueKey")).length
    if (lengthArrQueueLS === 0) refs.paginationContainer.innerHTML = alert;
    const queueFilms = localeStorageServices.load("queueKey")
    pag.libraryPagination(queueFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', queueFilms);
    Notiflix.Loading.remove();
    
}

export { onWatchedClick, onQueueClick };
