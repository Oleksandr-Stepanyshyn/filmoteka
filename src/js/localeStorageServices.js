import FilmsApiService from './apiService';
// функція яка записує в локалсторедж
const save = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
  // console.log(data);
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

function addTolocaleStorageFilmsOnPage() {
  filmsDetails
    .onFetchTopDayFilms()
    .then(filmsDetails => {
      save('DetailsFilmsCurrentPage', filmsDetails);
    })
    .catch(error => console.log(error));
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
