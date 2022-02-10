import { refs } from './refs';
import localStorage from './localeStorageServices';

const LOCALSTORAGE_KEY = 'nightThemeOn';

refs.switchTheme.addEventListener('change', onSwitchThemeClick);

const iconNight = refs.iconTheme.firstElementChild;
const iconDay = refs.iconTheme.lastElementChild;
switchTest();

function onSwitchThemeClick (e) {
    let nightThemeOn = e.target.checked;
    if(nightThemeOn) {
        nightTheme();
        localStorage.save(LOCALSTORAGE_KEY, nightThemeOn);
        return;
    }
    lightTheme()
    localStorage.save(LOCALSTORAGE_KEY, nightThemeOn);
};

function switchTest () {
    let nightThemeOn = localStorage.load(LOCALSTORAGE_KEY);
    if(nightThemeOn) {
        refs.switchTheme.checked = true;
        nightTheme();
        return;
    }
    lightTheme();
}

function nightTheme() {
    iconDay.classList.remove('is-hidden');
    iconNight.classList.add('is-hidden');
    document.body.style.backgroundColor = '#212121';
    refs.galleryEl.style.color = '#ffffff';
    refs.iconGitHub.style.fill = '#F7F7F7';
    refs.header.classList.add('dark-header');
    refs.footer.classList.add('dark-footer');
    refs.paginationContainer.classList.add('dark-theme');
    refs.emptyLibEl.classList.add('dark-theme-error');
}

function lightTheme () {
    iconDay.classList.add('is-hidden');
    iconNight.classList.remove('is-hidden');
    document.body.style.backgroundColor = '#ffffff';
    refs.galleryEl.style.color = '#000000';
    refs.iconGitHub.style.fill = '#000000';
    refs.header.classList.remove('dark-header');
    refs.footer.classList.remove('dark-footer');
    refs.paginationContainer.classList.remove('dark-theme');
    refs.emptyLibEl.classList.remove('dark-theme-error');
}