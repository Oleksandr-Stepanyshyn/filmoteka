import { refs } from './refs';
import localeStorageServices from './localeStorageServices';
import Notiflix from 'notiflix';
import pag from './pagination';
import { galleryReset } from './galleryFetch';


refs.watched.addEventListener("click", onWatchedClick);
refs.queue.addEventListener("click", onQueueClick)

function onWatchedClick(e) {
    galleryReset();
    if(localStorage.getItem("watchedKey") === null){
        return
    }
    const watchedFilms = localeStorageServices.load("watchedKey");
    pag.libraryPagination(watchedFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', watchedFilms);
    Notiflix.Loading.remove();

}

function onQueueClick(e) {
    galleryReset();
    if(localStorage.getItem("queueKey") === null){
        return
    }
    const queueFilms = localeStorageServices.load("queueKey")
    pag.libraryPagination(queueFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', queueFilms);
    Notiflix.Loading.remove();
}

export { onWatchedClick, onQueueClick };
