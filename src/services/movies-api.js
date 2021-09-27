import axios from 'axios';

const BASE_URL = 'https://developers.themoviedb.org/3/';
const API_KEY = '168de4daa09e8aedc04b00bd66a14f21';

export async function fetchMovies(parametersURL) {
  const url = `${BASE_URL}${parametersURL}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
}

export function fetchPopularMovies() {
  const popularURL = 'trending/movie/week?';
  return fetchMovies(popularURL);
}
