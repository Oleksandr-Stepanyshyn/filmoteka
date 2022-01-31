const refs = {
  openModal: document.querySelector('.gallery__container'),
<<<<<<< HEAD
  // backdrop: document.querySelector('.backdrop')
}
refs.openModal.addEventListener("click", onOpenModal)
// refs.backdrop.addEventListener("click", onBackdrop);

=======
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]')
}
refs.openModal.addEventListener("click", onOpenModal)
refs.backdrop.addEventListener("click", onBackdrop);
refs.closeBtn.addEventListener("click", onCloseModal)
>>>>>>> ce5e046a1559bee09c6ba07bcedf85e592cee400

function onOpenModal() {
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

