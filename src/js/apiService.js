const API_KEY = 'c01f14dcdb58e9cec669b1017a4d540c';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class FilmsApiService {
  constructor() {
    this.searchQueryFilms = '';
    this.page = 1;
    this.totalItems= '';
  }

  // Метод для получения популярных фильмов дня.
  onFetchTopDayFilms() {
    const searchParams = new URLSearchParams({
      page: this.page,
    });

    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&${searchParams}`)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
        
      })
      .then(data => {
        this.totalitems = data.total_results;
        return data.results;
      });
  }

  // Метод для получения фильма/фильмов по строке запроса (через метод Сеттер).
  onFetchKeyWordFilms() {
    const searchParams = new URLSearchParams({
      query: this.searchQueryFilms,
      include_adult: false,
      page: this.page,
    });

    return fetch(`${BASE_URL}/search/movie/?api_key=${API_KEY}&${searchParams}`)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        return data.results;
      });
  }

  // Метод Геттер для получения текущего значения строки поиска (нам не нужен:)).
  get query() {
    return this.searchQueryFilms;
  }

  // Метод Сеттер для поиска фильма/фильмов по ключевому слову или словам.
  set query(newSearchQueryFilm) {
    this.searchQueryFilms = newSearchQueryFilm;
  }

  // Метод Геттер для получения текущего значения номера страницы (скорее всего нам не нужен:)).
  get pageNumber() {
    return this.page;
  }

  // Метод Сеттер для установки произвольеого номера страницы (скоре всего нужен для цифровой пагинации:)).
  // К примеру можно его вызвать, если надо сразу с 1 на 4 или 10 или ... страницу сходить.
  set pageNumber(newPageNumber) {
    this.page = newPageNumber;
  }

  // Метод для увеличения номера страницы.
  incrementPageNumber() {
    this.page += 1;
  }

  // Метод для сброса страницы в начальное значение (page=1).
  resetPageNumber() {
    this.page = 1;
  }

  // Пример для вывода информации, если поле поиска пустое и нажать поиск.
  emptySearchQueryFilm() {
    console.log('Field of search is empty, enter please keyword or words for begin search');
  }

  // Пример для вывода информации, если введено некорректное слово для поиска фильма.
  errorFilmSearch() {
    console.log('Search result not successful. Enter the correct movie name and try again');
  }
  // витянує дані для фільма по айдішці
  async onfetchMoviesDetails(id) {
    try {
      const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url);
      const data = response.json();
      return data;
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}
