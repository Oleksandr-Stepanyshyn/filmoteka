import { refs } from './refs';
import localStorage from './localeStorageServices';

const LOCALSTORAGE_KEY = 'nightThemeOn';

refs.switchTheme.addEventListener('change', onSwitchThemeClick);

const iconNight = refs.iconTheme.firstElementChild;
const iconDay = refs.iconTheme.lastElementChild;
let nightThemeOn;
// console.log(iconNight);
// console.log(iconDay);

function onSwitchThemeClick (e) {
    console.log(Boolean(localStorage.load(LOCALSTORAGE_KEY)));
    if(localStorage.load(LOCALSTORAGE_KEY)) {
        console.log('ночная тема');
        iconDay.classList.toggle('is-hidden');
        iconNight.classList.toggle('is-hidden');
        nightThemeOn = e.target.checked;
        localStorage.save(LOCALSTORAGE_KEY, nightThemeOn)
        return;
    }
    console.log('дневная тема');
    iconDay.classList.toggle('is-hidden');
    iconNight.classList.toggle('is-hidden');
    nightThemeOn = e.target.checked;
    localStorage.save(LOCALSTORAGE_KEY, nightThemeOn)
};

onSwitchThemeClick();