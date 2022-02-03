import FilmsApiService from './apiService';

//-----------------НЕ ВИРІШЕНІ ЗАВДАННЯ!!------------
//-----------1. допиляти коли буде пагінація.
//-----------2. підгрузка інфи в ЛС при пошуку.
//-----------3. допиляти коли буде рендеретись Май лібрарі
//-----------4. вирішити проблему двойного запиту

//---функція яка записує в локалсторедж------------------------//
const save = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
  // console.log(data);
};
//---функція яка грузить з локалстореджу-----------------------//
const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
//---функція яка видаляє з локалстореджу-----------------------//
const remove = key => {
  return localStorage.removeItem(key);
};

export default {
  save,
  load,
  remove,
  addToQueue,
  addToWatched,
  btnTextChange,
};
//------------------------------------------------------------//
const filmsDetails = new FilmsApiService();
//------------Підтягує в ЛС карент сторінку
function addTolocaleStorageFilmsOnPage() {
  filmsDetails
    .onFetchTopDayFilms()
    .then(filmsDetails => {
      save('DetailsFilmsCurrentPage', filmsDetails);
    })
    .catch(error => console.log(error));
}
addTolocaleStorageFilmsOnPage();
//-----------------запис даних в локалку після їх пошуку-------------Криво працює!--
// const refs = { form: document.querySelector('.form') };
// refs.form.addEventListener('submit', qwer);
// function qwer(event) {
//   console.log(event);
//   filmsDetails
//     .onFetchKeyWordFilms()
//     .then(films => {})
//     .catch(error => console.log(error));
// }
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//______________Для роботи з ЛС_____________________________________________________
let watchedKey = [];
let queueKey = [];

if (load('Watched') !== null) {
  watchedKey = load('Watched');
  // watchedKey = JSON.parse(watchedKey);
}

if (load('Queue') !== null) {
  queueKey = load('Queue');
  // Queue = JSON.parse(Queue);
}

// Перевіряє чи є фільм в черзі чи в переглянутих коли відкрили модалку і міняє текс кнопки
function btnTextChange(filmId) {
  //-----шукаємо кнопки--------------------------------------------------
  const watchedBtn = document.querySelector('.modal-film__button-watched');
  const queueBtn = document.querySelector('.modal-film__button-queue');
  //---Перевіряємо чи є цей фільм в ЛС в масиві Watched------------------
  if (watchedKey.includes(filmId)) {
    console.log('Такий фільм є');
    watchedBtn.textContent = 'Remove from watched';
  } else {
    console.log('Такого фільму немає');
    watchedBtn.textContent = 'Add to watched';
  }

  if (queueKey.includes(filmId)) {
    console.log('Такий фільм є в черзі');
    queueBtn.textContent = 'Remove from queue';
  } else {
    console.log('Такий фільм екмає в черзі');
    queueBtn.textContent = 'Add to queue';
  }
}

// Функция адд в переглянуті
function addToWatched(e) {
  let filmId = e.target.dataset.id;
  if (e.target.textContent === 'Add to watched') {
    if (!watchedKey.includes(filmId)) {
      watchedKey.push(filmId);
    }
    save('Watched', watchedKey);
    e.target.textContent = 'Remove from watched';
  } else if (watchedKey.includes(filmId) && e.target.textContent === 'Remove from watched') {
    const filteredDataArray = load('Watched').filter(element => element !== filmId);
    save('Watched', filteredDataArray);
    e.target.textContent = 'Add to watched';
  }
}

// Функция адд в чергу
function addToQueue(e) {
  let filmId = e.target.dataset.id;
  if (e.target.textContent === 'Add to queue') {
    if (!queueKey.includes(filmId)) {
      queueKey.push(filmId);
    }
    save('Queue', Queue);
    e.target.textContent = 'Remove from queue';
  } else if (queueKey.includes(filmId) && e.target.textContent === 'Remove from queue') {
    const filteredDataArray = load('Queue').filter(element => element !== filmId);
    save('Queue', filteredDataArray);
    e.target.textContent = 'Add to queue';
  }
}
//____________________________________________________________________________________

// --------в модалку потом
// let filmId = e.target.dataset.id;
// onOpenModals(e);
// lsData.btnTextChange(filmId);
// const btnW = document.querySelector('.modal-film__button-watched');
// btnW.addEventListener('click', e => {
//   lsData.addToWatched(e);
// });
// console.log(btnW);
