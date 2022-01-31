import FilmsApiService from './apiService';
// функція яка записує в локалсторедж
const save = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
<<<<<<< HEAD
  console.log(data);


=======
  // console.log(data);
>>>>>>> ce5e046a1559bee09c6ba07bcedf85e592cee400
};
// функція яка грузить з локалстореджу
const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
//функція яка видаляє з локалстореджу
const remove = key => {
  return localStorage.removeItem(key);
};

export default {
  save,
  load,
  remove,
};
//--------------------------------------------//
const filmsDetails = new FilmsApiService();

<<<<<<< HEAD
const WATCHED_KEY = 'Watched';
const QUENE_KEY = 'Quene';

//________________________________________
const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  queneBtn: document.querySelector('.btn-quene'),
};

refs.watchedBtn.addEventListener('click', addToWatched);

refs.queneBtn.addEventListener('click', addToQuene);



// refs.queneBtn.removeEventListener('click', addToQuene);
// console.log('add to quene');
//____________________
function addToWatched() {
  if (refs.watchedBtn.textContent === 'ADD TO WATCHED') {
    save(WATCHED_KEY, 'filmId');
    refs.watchedBtn.textContent = 'REMOVE TO WATCHED';
  }
  refs.watchedBtn.removeEventListener('click', addToWatched);
  console.log('clickW');
=======
function addTolocaleStorageFilmsOnPage() {
  filmsDetails
    .onFetchTopDayFilms()
    .then(filmsDetails => {
      save('DetailsFilmsCurrentPage', filmsDetails);
    })
    .catch(error => console.log(error));
>>>>>>> ce5e046a1559bee09c6ba07bcedf85e592cee400
}
addTolocaleStorageFilmsOnPage();

// const refs = { form: document.querySelector('.form') };
// refs.form.addEventListener('submit', qwer);
// function qwer(event) {
//   console.log(event);
//   filmsDetails
//     .onFetchKeyWordFilms()
//     .then(films => {})
//     .catch(error => console.log(error));
// }
