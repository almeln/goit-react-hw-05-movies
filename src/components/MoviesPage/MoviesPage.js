import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMovieByName } from 'services/movies-api';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from 'components/SearchBar';
import MoviesList from 'components/MoviesList';

export default function MoviesPage() {
  const location = useLocation();
  const [searchName, setSearchName] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = searchInput => {
    if (searchName === searchInput) {
      return;
    }

    setSearchName(searchInput);
    setMovies([]);
  };

  useEffect(() => {
    if (!searchName) {
      return;
    }

    try {
      setStatus('pending');
      fetchMovieByName(searchName).then(data => {
        if (data.results.length === 0) {
          toast.error('Ooops... There are no movies on this result!');
          setStatus('rejected');
          return;
        }

        let newMovies = [...movies, ...data.results];
        setMovies(newMovies);
        setStatus('resolved');
      });
    } catch {
      setError(error);
      setStatus('rejecteed');
    }
  }, [searchName]); // eslint-disable-line react-hooks/exhaustive-deps

  // State-машина
  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        <h2>Loading...</h2>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        <Toaster position="top-right" />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        <MoviesList movies={movies} location={location} backTo={'movies'} />
      </>
    );
  }
}
