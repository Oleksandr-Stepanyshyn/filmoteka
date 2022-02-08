import { refs } from './refs';
import localeStorageServices from './localeStorageServices';
import Notiflix from 'notiflix';
import pag from './pagination';
import { galleryReset } from './galleryFetch';


refs.watched.addEventListener("click", onWatchedClick);
refs.queue.addEventListener("click", onQueueClick);

function onWatchedClick(e) {
    galleryReset();
    if(localStorage.getItem("watchedKey") === null){
        onEmptyLibraryError();
        return
    }
    const lengthArrWatchedLS = JSON.parse(localStorage.getItem("watchedKey")).length
    if (lengthArrWatchedLS === 0) onEmptyLibraryError();
    const watchedFilms = localeStorageServices.load("watchedKey");
    pag.libraryPagination(watchedFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', watchedFilms);
    Notiflix.Loading.remove();
}

function onQueueClick(e) {
    galleryReset();
    if(localStorage.getItem("queueKey") === null){
        onEmptyLibraryError();
        return
    }
    const lengthArrQueueLS = JSON.parse(localStorage.getItem("queueKey")).length
    if (lengthArrQueueLS === 0) onEmptyLibraryError();
    const queueFilms = localeStorageServices.load("queueKey")
    pag.libraryPagination(queueFilms)
    localeStorageServices.save('DetailsFilmsCurrentPage', queueFilms);
    Notiflix.Loading.remove();
    
}

function onEmptyLibraryError() {
  Notiflix.Loading.remove(350);
  refs.emptyLibEl.classList.remove('visually-hidden');
  refs.galleryEl.classList.add('visually-hidden');
    refs.paginationContainer.classList.add('visually-hidden');
}



export { onWatchedClick, onQueueClick };
