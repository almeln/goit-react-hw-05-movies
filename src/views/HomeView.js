import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPopularMovies } from 'services/movies-api';
import MoviesList from 'components/MoviesList';

export default function HomeView() {
  // const { url } = useRouteMatch();
  // console.log(url);
  const location = useLocation();
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    try {
      fetchPopularMovies().then(data => {
        setPopularMovies(data.results);
      });
    } catch {
      console.log('ERROR');
    }
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <MoviesList
        movies={popularMovies}
        location={location}
        backTo={'popular movies'}
      />
      {/* <ul>
        {popularMovies &&
          popularMovies.map(popularMovie => (
            <li key={popularMovie.id}>
              <Link
                to={{
                  pathname: `/movies/${popularMovie.id}`,
                  state: { from: location },
                }}
              >
                {popularMovie.original_title}
              </Link>
            </li>
          ))}
      </ul> */}
    </>
  );
}
