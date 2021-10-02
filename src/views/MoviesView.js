import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMovieByName } from 'services/movies-api';
import Searchbar from 'components/SearchBar';
import MoviesList from 'components/MoviesList';

export default function MoviesView() {
  const location = useLocation();
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
      <MoviesList movies={movies} location={location} backTo={'movies'} />
    </>
  );
}
