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
// Перевіряє чи є фільм в черзі чи в переглянутих коли відкрили модалку і міняє текс кнопки
// function btnTextChange(currentFilmId) {
//   // console.log(currentFilmId);
//   //-----шукаємо кнопки--------------------------------------------------
//   const watchedBtn = document.querySelector('.modal-film__button-watched');
//   const queueBtn = document.querySelector('.modal-film__button-queue');
//   //---Перевіряємо чи є цей фільм в ЛС в масиві Watched------------------
//   // load('watchedKey').forEach(element => {
//   //   console.log(element.id);
//   //   if (element.id === currentFilmId) {
//   //     console.log('Такий фільм є');
//   //     watchedBtn.textContent = 'Remove from watched';
//   //   }
//   // });
// }
//______________Для роботи з ЛС_____________________________________________________
let watchedKey = [];
let queueKey = [];

// Функция адд в переглянуті

function addToWatched(e) {
  if (localStorage.getItem('watchedKey') !== null) {
    watchedKey = load('watchedKey');
    // watchedKey = JSON.parse('Watched');
  }
  const clickedFilm = load('DetailsFilmsCurrentPage').find(
    film => film.id === Number(e.target.dataset.id),
  );
  if (watchedKey.find(film => film.id === clickedFilm.id)) {
    watchedKey = watchedKey.filter(film => film.id !== clickedFilm.id);
    save('watchedKey', watchedKey);
    const btNwatch = e.target;
    // console.log(watchedKey);
    btNwatch.textContent = 'Add to watched';
  } else {
    watchedKey.push(clickedFilm);
    save('watchedKey', watchedKey);
    const btNwatch = e.target;
    btNwatch.textContent = 'Remove from watched';
  }
}

// Функция адд в чергу
function addToQueue(e) {
  if (localStorage.getItem('queueKey') !== null) {
    queueKey = load('queueKey');
    // queueKey = JSON.parse('Queue');
  }
  const clickedFilm = load('DetailsFilmsCurrentPage').find(
    film => film.id === Number(e.target.dataset.id),
  );
  if (queueKey.find(film => film.id === clickedFilm.id)) {
    queueKey = queueKey.filter(film => film.id !== clickedFilm.id);

    save('queueKey', queueKey);
    const btNwatch = e.target;
    // console.log(queueKey);
    btNwatch.textContent = 'Add to queue';
  } else {
    queueKey.push(clickedFilm);
    save('queueKey', queueKey);
    const btNwatch = e.target;
    btNwatch.textContent = 'Remove from queue';
  }
}
//____________________________________________________________________________________
export default {
  save,
  load,
  remove,
  addToQueue,
  addToWatched,
  // btnTextChange,
};
