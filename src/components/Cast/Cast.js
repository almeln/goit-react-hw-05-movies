import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { fetchMoviesCast } from 'services/movies-api';

export default function Cast() {
  // const { movieId } = useParams();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    try {
      setStatus('pending');
      fetchMoviesCast(movieId).then(data => {
        setCast(data.cast);
        setStatus('resolved');
      });
    } catch {
      console.log('ERROR');
    }
  }, [movieId]);

  if (status === 'idle') {
    return <></>;
  }

  if (status === 'pending') {
    return <h2>Loading...</h2>;
  }

  if (status === 'resolved') {
    return (
      <>
        {/* MovieCastView {movieId} */}
        <ul>
          {cast &&
            cast.map(({ name, character, id, profile_path }) => (
              <li key={id}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                    width="150"
                  />
                ) : (
                  <img
                    src="https://i.ibb.co/s9cXZV0/poster.jpg"
                    alt={name}
                    width="150"
                  />
                )}
                <h3>{name}</h3>
                <p>
                  Character: <span>{character}</span>
                </p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

Cast.propTypes = {
  slug: PropTypes.number,
};
