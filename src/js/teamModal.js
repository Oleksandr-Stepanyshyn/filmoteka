import { refs } from './refs';

refs.btnOpenModalTeam.addEventListener('click', openModalTeam);
refs.btnCloseModalTeam.addEventListener('click', closeModalTeam);

function openModalTeam() {
    console.log('hello');
    refs.modalTeam.classList.remove('is-hidden')

    document.addEventListener('keydown', onKeyboardPush);
    document.addEventListener('click', cliskIntoVoid);

    function onKeyboardPush(e) {
    if (e.code === "Escape") {
        refs.modalTeam.classList.add('is-hidden');
        document.removeEventListener('keydown', onKeyboardPush);
    }
    };

    function cliskIntoVoid(e) {
        if (e.target === refs.modalTeam) {
            refs.modalTeam.classList.add('is-hidden');
            document.removeEventListener('keydown', cliskIntoVoid);
        }
    }
}

function closeModalTeam(e) {
    refs.modalTeam.classList.add('is-hidden');
}
