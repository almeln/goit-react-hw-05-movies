import React, { useState, useEffect } from 'react';
import { fetchMovieByName } from 'services/movies-api';
import Searchbar from 'components/SearchBar';

export default function MoviesView() {
  const [searchName, setSearchName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    try {
      fetchMovieByName(searchName).then(data => {
        if (data.results.length === 0) {
          console.log('Error');
          return;
        }

        let newMovies = [...movies, ...data.results];
        setMovies(newMovies);
      });
    } catch {
      console.log('ERROR');
    }
  }, [searchName]);

  const handleFormSubmit = searchInput => {
    if (searchName === searchInput) {
      return;
    }

    setSearchName(searchInput);
    setMovies([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ul>
        {movies &&
          movies.map(movie => <li key={movie.id}>{movie.original_title}</li>)}
      </ul>
    </>
  );
}
