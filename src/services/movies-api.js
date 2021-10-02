import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '168de4daa09e8aedc04b00bd66a14f21';

async function fetchMovies(parametersURL) {
  const url = `${BASE_URL}${parametersURL}api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
}

export function fetchPopularMovies() {
  const popularURL = 'trending/movie/week?';
  return fetchMovies(popularURL);
}

export function fetchMovieById(movieId) {
  const movieIdURL = `movie/${movieId}?`;
  return fetchMovies(movieIdURL);
}

export function fetchMoviesCast(movieId) {
  const movieIdURL = `movie/${movieId}/credits?`;
  return fetchMovies(movieIdURL);
}

export function fetchMoviesReviews(movieId) {
  const movieIdURL = `movie/${movieId}/reviews?`;
  return fetchMovies(movieIdURL);
}

export async function fetchMovieByName(searchName) {
  const movieNameURL = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchName}`;
  const response = await axios.get(movieNameURL);
  return response.data;
}
