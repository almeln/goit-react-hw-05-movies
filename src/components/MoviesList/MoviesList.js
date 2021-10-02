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
              {movie.original_title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
