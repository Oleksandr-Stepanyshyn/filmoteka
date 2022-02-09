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
    console.log('ночная тема');
    iconDay.classList.remove('is-hidden');
    iconNight.classList.add('is-hidden');
    document.body.style.backgroundColor = '#000000';
    // document.body.style.color = '#ffffff';
    refs.galleryEl.style.color = '#ffffff';
    refs.iconGitHub.style.fill = '#F7F7F7';
    // refs.header.style.borderBottom = '2px solid $accent-color';
    // refs.footer.style.borderTop = '2px solid $accent-color';
    console.log(refs.header)
}

function lightTheme () {
    console.log('дневная тема');
    iconDay.classList.add('is-hidden');
    iconNight.classList.remove('is-hidden');
    document.body.style.backgroundColor = '#ffffff';
    // document.body.style.color = '#000000'; 
    refs.galleryEl.style.color = '#000000';
    refs.iconGitHub.style.fill = '#000000';
    refs.header.style.borderBottom = 'none';
    refs.footer.style.borderTop = 'none';
}

// class Switch {
//     // constructor({key, id}) {
//     //     this.LOCALSTORAGE_KEY = key,
//     //     this.switch = document.querySelector(id),
//     // }

//     // get switch () {
//     //     return this.switch;
//     // }

//     // set switch (newId) {
//     //     this.switch = document.querySelector(newId);
//     // }

//     switchTest() {
//         if(localStorage.load(LOCALSTORAGE_KEY)) {
//             console.log('ночная тема');
//             iconDay.classList.toggle('is-hidden');
//             iconNight.classList.toggle('is-hidden');
//         }
//         console.log('дневная тема');
//     }

//     click(e) {
//         if(e.target.checked) {
//             console.log('ночная тема');
//             iconDay.classList.toggle('is-hidden');
//             iconNight.classList.toggle('is-hidden');
//             nightThemeOn = e.target.checked;
//             localStorage.save(LOCALSTORAGE_KEY, nightThemeOn)
//             return;
//         }
//         console.log('дневная тема');
//         iconDay.classList.toggle('is-hidden');
//         iconNight.classList.toggle('is-hidden');
//         nightThemeOn = e.target.checked;
//         localStorage.save(LOCALSTORAGE_KEY, nightThemeOn)
//     }
    
// }