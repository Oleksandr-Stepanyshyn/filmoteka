


const refs = {
  openModal: document.querySelector('.gallery__container'),
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]')
}
refs.openModal.addEventListener("click", onOpenModal)
refs.backdrop.addEventListener("click", onBackdrop);
refs.closeBtn.addEventListener("click", onCloseModal)

function onOpenModal(event) {
  if (event.target.classList.contains('gallery__container')) {
    return;
  }

  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('modal-open')
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress)
  document.body.classList.remove('modal-open')
}
function onBackdrop(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

