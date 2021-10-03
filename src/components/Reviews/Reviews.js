import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Toaster, toast } from 'react-hot-toast';
import { fetchMoviesReviews } from 'services/movies-api';

export default function Reviews() {
  // const { movieId } = useParams();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    try {
      setStatus('pending');
      fetchMoviesReviews(movieId).then(data => {
        if (data.results.length === 0) {
          toast.error('Ooops... There are no reviews yet!');
          setStatus('rejected');
          return;
        }
        setReviews(data.results);
        setStatus('resolved');
      });
    } catch {
      console.log('ERROR');
      setStatus('rejecteed');
    }
  }, [movieId]);

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
        <ul>
          {reviews &&
            reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
