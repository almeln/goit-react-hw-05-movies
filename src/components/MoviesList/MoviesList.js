import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import css from 'components/MoviesList/MoviesList.module.css';

const makeSlug = string => slugify(string, { lower: true });

export default function MoviesList({ movies, location, backTo }) {
  return (
    <ul className={css.moviesList}>
      {movies &&
        movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
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
              className={css.link}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                  width="300"
                  className={css.image}
                />
              ) : (
                <img
                  src="https://i.ibb.co/s9cXZV0/poster.jpg"
                  alt={movie.name}
                  width="300"
                  className={css.image}
                />
              )}
              <div className={css.movieTitle}>{movie.original_title}</div>
            </Link>
          </li>
        ))}
    </ul>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  backTo: PropTypes.string.isRequired,
};
