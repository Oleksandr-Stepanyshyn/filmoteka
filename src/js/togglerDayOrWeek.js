import localStorage from './localeStorageServices';
import { refs } from './refs';
import { renderDaylyTopFilms, renderWeeklyTopFilms, galleryReset } from './galleryFetch';

const LOCALSTORAGE_KEY = 'switchState';

refs.checkbox.addEventListener('change', onTogglerClick);

function onLoadSite() {
  if (!localStorage.load(LOCALSTORAGE_KEY)) {
    galleryReset();
    return renderDaylyTopFilms();
  }

  refs.checkbox.checked = true;
  galleryReset();
  return renderWeeklyTopFilms();
}

function onTogglerClick(e) {
  const toggler = e.target;
  localStorage.save(LOCALSTORAGE_KEY, toggler.checked);

  if (toggler.checked) {
    galleryReset();
    return renderWeeklyTopFilms();
  }

  galleryReset();
  return renderDaylyTopFilms();
}

export { onLoadSite, onTogglerClick };
