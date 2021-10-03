import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchMoviesCast } from 'services/movies-api';

export default function Cast() {
  // const { movieId } = useParams();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  console.log(movieId);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    try {
      fetchMoviesCast(movieId).then(data => {
        setCast(data.cast);
      });
    } catch {
      console.log('ERROR');
    }
  }, [movieId]);

  return (
    <>
      {/* MovieCastView {movieId} */}
      <ul>
        {cast &&
          cast.map(({ name, profile_path, character, id }) => (
            <li key={id}>
              {/* <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} width="150" /> */}
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
