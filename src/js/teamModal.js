import { refs } from './refs';
import Swiper, { Navigation, Pagination } from 'swiper';

refs.btnOpenModalTeam.addEventListener('click', openModalTeam);
refs.btnCloseModalTeam.addEventListener('click', closeModalTeam);

function openModalTeam() {
    refs.modalTeam.classList.remove('is-hidden')
    refs.bodyEl.classList.add('modal-open');

    document.addEventListener('keydown', onKeyboardPush);
    refs.modalTeam.addEventListener('click', cliskIntoVoid);

    function onKeyboardPush(e) {
        console.log(e.code);
        if (e.code === "Escape") {
            closeModalTeam();
            document.removeEventListener('keydown', onKeyboardPush);
        }
    }

    function cliskIntoVoid(e) {
        console.log(e.code);
        console.log(e.target);
        if (e.target === refs.modalTeam) {
            closeModalTeam();
            document.removeEventListener('keydown', onKeyboardPush);
        }
    }
}

function closeModalTeam() {
    refs.modalTeam.classList.add('is-hidden');
    refs.bodyEl.classList.remove('modal-open');
}

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
        delay: '2500',
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    speed: 500,
    loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    grabCursor: true,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    centeredSlides: true,
    initialSlide: 0,
    freeMode: true,
  });