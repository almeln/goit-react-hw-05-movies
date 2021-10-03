import { Link } from 'react-router-dom';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

export default function MoviesList({ movies, location, backTo }) {
  return (
    <ul>
      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${makeSlug(
                  `${movie.original_title} ${movie.id}`,
                )}`,
                state: {
                  from: {
                    location,
                    label: `Go back to ${backTo}`,
                  },
                },
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                  width="200"
                />
              ) : (
                <img
                  src="https://i.ibb.co/s9cXZV0/poster.jpg"
                  alt={movie.name}
                  width="200"
                />
              )}
              {movie.original_title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
