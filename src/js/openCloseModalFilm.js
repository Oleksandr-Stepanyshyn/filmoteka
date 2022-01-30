const refs = {
  openModal: document.querySelector('.gallery__container'),
  // backdrop: document.querySelector('.backdrop')
}
refs.openModal.addEventListener("click", onOpenModal)
// refs.backdrop.addEventListener("click", onBackdrop);


function onOpenModal() {
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('open-modal')
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress)
  document.body.classList.remove('open-modal')
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