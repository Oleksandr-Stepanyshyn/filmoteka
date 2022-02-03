import axios from 'axios';

const API_KEY = 'c01f14dcdb58e9cec669b1017a4d540c';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class FilmsApiService {
  constructor() {
    this.searchQueryFilms = '';
    this.page = 1;
    this.pages = 0;
    this.totalItems = 0;
  }

  // Метод для получения популярных фильмов дня.
  async onFetchTopDayFilms() {
    const searchParams = new URLSearchParams({
      page: this.page,
    });
  
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&${searchParams}`,
    );
    const data = await response.data;
    this.totalPage = data.total_pages;
    this.totalItems = data.total_results;
    return data.results;
  }

  // Метод для получения фильма/фильмов по строке запроса (через метод Сеттер).
  async onFetchKeyWordFilms() {
    const searchParams = new URLSearchParams({
      query: this.searchQueryFilms,
      include_adult: false,
      page: this.page,
    });

    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&${searchParams}`,
    );
    const data = await response.data;
    this.totalPage = data.total_pages;
    this.totalItems = data.total_results;
    return data.results;
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

  // Метод Сеттер для установки произвольного номера страницы (скоре всего нужен для цифровой пагинации:)).
  // К примеру можно его вызвать, если надо сразу с 1 на 4 или 10 или ... страницу сходить.
  set pageNumber(newPageNumber) {
    this.page = newPageNumber;
  }

  // Метод Геттер для получения максимального кол-ва страниц от бэкэнда.
  get totalPage() {
    return this.pages;
  }

  // Метод Сеттер для записи в свойство pages значения приходящего с бэкэнда.
  set totalPage(newTotalPage) {
    this.pages = newTotalPage;
  }

  // Метод для увеличения номера страницы.
  incrementPageNumber() {
    this.page += 1;
  }

  // Метод для сброса страницы в начальное значение (page=1).
  resetPageNumber() {
    this.page = 1;
  }

  resetTotalItems(){
    this.totalItems = 0;
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

// метод для получения id жанров фильмов
  async onFetchId() { 
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
  const data = await response.data;
  const genres = await data.genres;
  return  genres;
  }
}