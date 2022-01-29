// метод який записує в локалсторедж
const save = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};
// метод який грузить з локалстореджу
const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
//метод який видаляє з локалстореджу
const remove = key => {
  return localStorage.removeItem(key);
};

export default {
  save,
  load,
  remove,
};

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
  console.log('click1');
}

function addToQuene() {
  if (refs.queneBtn.textContent === 'ADD TO QUENE') {
    save(QUENE_KEY, 'filmId');
    refs.queneBtn.textContent = 'REMOVE TO QUENE';
  }
  refs.queneBtn.removeEventListener('click', addToQuene);
  console.log('click2');
}
