import { refs } from './refs';

refs.btnOpenModalTeam.addEventListener('click', openModalTeam);
refs.btnCloseModalTeam.addEventListener('click', closeModalTeam);

function openModalTeam() {
    console.log('hello');
    refs.modalTeam.classList.remove('is-hidden')
    refs.bodyEl.classList.add('modal-open');

    document.addEventListener('keydown', onKeyboardPush);
    document.addEventListener('click', cliskIntoVoid);

    function onKeyboardPush(e) {
        if (e.code === "Escape") {
            closeModalTeam(this);
        }
    };

    function cliskIntoVoid(e) {
        if (e.target === refs.modalTeam) {
            closeModalTeam(this);
        }
    }
}

function closeModalTeam(fn) {
    refs.modalTeam.classList.add('is-hidden');
    refs.bodyEl.classList.remove('modal-open');
    document.removeEventListener('keydown', fn);
}