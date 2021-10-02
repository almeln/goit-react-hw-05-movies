import { Link } from 'react-router-dom';

export default function MoviesList({ movies, location, backTo }) {
  return (
    <ul>
      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
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
