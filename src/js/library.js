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

    const alert = `<div class="alert"><p class="alert_greet">
       Hello lover movie!<p/>
       <p>You haven't added a movie yet. Please make your choise.
       </p><div/>`;
    if (refs.galleryEl.firstChild === null) {
        refs.galleryEl.innerHTML = alert;
    }

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

    const alert = `<div class="alert"><p class="alert_greet">
       Hello lover movie!<p/>
       <p>You haven't added a movie yet. Please make your choise.
       </p><div/>`;
    if (refs.galleryEl.firstChild === null) {
        refs.galleryEl.innerHTML = alert;
    }
    
}

export { onWatchedClick, onQueueClick };
