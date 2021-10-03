import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { fetchPopularMovies } from 'services/movies-api';
import MoviesList from 'components/MoviesList';

export default function HomePage() {
  // const { url } = useRouteMatch();
  // console.log(url);
  const location = useLocation();
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    try {
      setStatus('pending');
      fetchPopularMovies().then(data => {
        if (data.results.length === 0) {
          toast.error('Ooops... There are no movies on this result!');
          setStatus('rejected');
          return;
        }
        setPopularMovies(data.results);
        setStatus('resolved');
      });
    } catch {
      setError(error);
      setStatus('rejecteed');
    }
  }, [error]);

  if (status === 'idle') {
    return <></>;
  }

  if (status === 'pending') {
    return <h2>Loading...</h2>;
  }

  if (status === 'rejected') {
    return <Toaster position="top-right" />;
  }

  if (status === 'resolved') {
    return (
      <>
        <h2>Trending today</h2>
        <MoviesList
          movies={popularMovies}
          location={location}
          backTo={'popular movies'}
        />
      </>
    );
  }
}
