import localStorage from './localeStorageServices';
import { refs } from './refs';
import { renderDaylyTopFilms, renderWeeklyTopFilms, galleryReset } from './galleryFetch';

const LOCALSTORAGE_KEY = 'switchState';

refs.checkbox.addEventListener('change', onTogglerClick);

function onLoadSite() {
  if (!localStorage.load(LOCALSTORAGE_KEY)) {
    galleryReset();
    return onTogglerRenderDayFilms();
  }

  refs.checkbox.checked = true;
  galleryReset();
  return onTogglerRenderWeekFilms();
}

function onTogglerClick(e) {
  const toggler = e.target;
  localStorage.save(LOCALSTORAGE_KEY, toggler.checked);

  if (toggler.checked) {
    galleryReset();
    return onTogglerRenderWeekFilms();
  }

  galleryReset();
  return onTogglerRenderDayFilms();
}

function onTogglerRenderDayFilms() {
  refs.textToggler.textContent = 'Day';
  refs.textToggler.style.color = '#f46a0d';
  refs.textToggler.style.background = '#dddddd';
  renderDaylyTopFilms();
}

function onTogglerRenderWeekFilms() {
  refs.textToggler.textContent = 'Week';
  refs.textToggler.style.color = '#ffffff';
  refs.textToggler.style.background = '#f46a0d';
  renderWeeklyTopFilms();
}

export { onLoadSite };
