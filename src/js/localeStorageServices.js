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
// let Watched = [];
// let Queue = [];

// if (localStorage.getItem('Watched') !== null) {
//   Watched = localStorage.getItem('Watched');
//   Watched = JSON.parse(Watched);
// }

// if (localStorage.getItem('Queue') !== null) {
//   Queue = localStorage.getItem('Queue');
//   Queue = JSON.parse(Queue);
// }

// // Перевіряє чи є фільм в черзі чи в переглянутих коли відкрили модалку і міняє кнопки
// function btnTextChange(айді фільму) {
//   const кнопка в переглянуті = modalka.querySelector('клас кнопки переглянуті');
//   const кнопка в чергу = modalka.querySelector('клас кнопки черга');

//   if (Watched.includes(айді фільму)) {
//     console.log('Такий фільм є');
//     кнопка в переглянуті.textContent = 'Remove from watched';
//   } else {
//     console.log('Такого фільму немає');
//     кнопка в переглянуті.textContent = 'Add to watched';
//   }

//   if (Queue.includes(айді фільму)) {
//      console.log('Такий фільм є в черзі');
//     кнопка в чергу.textContent = 'Remove from queue';
//   } else {
//      console.log('Такий фільм екмає в черзі');
//     кнопка в чергу.textContent = 'Add to queue';
//   }
// }

// // Функция адд в переглянуті
// function addToWatched(event) {
//   let filmId = event.target.dataset.id;
//   if (event.target.textContent === 'Add to watched') {
//     if (!Watched.includes(filmId)) {
//       Watched.push(filmId);
//     }
//     save('Watched', Watched);
//     event.target.textContent = 'Remove from watched';
//   } else if (Watched.includes(filmId) && event.target.textContent === 'Remove from watched') {
//     const filteredDataArray = load('Watched').filter(element => element !== filmId,);
//     save('Watched', filteredDataArray);
//     event.target.textContent = 'Add to watched';
//   }
// }

// // Функция адд в чергу
// function addToQueue(event) {
//   let filmId = event.target.dataset.id;
//   if (event.target.textContent === 'Add to queue') {
//     if (!Queue.includes(filmId)) {
//       Queue.push(filmId);
//     }
//     save('Queue', Queue);
//     event.target.textContent = 'Remove from queue';
//   } else if (Queue.includes(filmId) && event.target.textContent === 'Remove from queue') {
//     const filteredDataArray = load('Queue').filter(element => element !== filmId,);
//     save('Queue', filteredDataArray);
//     e.target.textContent = 'Add to queue';
//   }
// }
//____________________________________________________________________________________
