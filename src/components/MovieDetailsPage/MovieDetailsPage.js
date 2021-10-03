import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, useParams } from 'react-router';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMovieById } from 'services/movies-api';
// import MovieCastView from './MovieCastView';
// import MovieReviewsView from './MovieReviewsView';
import { withQuicklink } from 'quicklink/dist/react/hoc.js';

const MovieCastView = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast-view" */),
);
const MovieReviewsView = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews-view" */),
);

const options = {
  origins: [],
};

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    try {
      fetchMovieById(movieId).then(setMovie);
    } catch {
      console.log('ERROR');
    }
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            {location?.state?.from?.label ?? 'Go back'}
          </button>
          <div>
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
            <h2>{movie.original_title}</h2>
            <p>User score: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
              {movie.genres.map(({ name, id }) => (
                <span key={id}>{name}</span>
              ))}
            </p>
          </div>
          <hr />
          <h4>Additional information</h4>
          <ul>
            <li>
              {/* <NavLink to={`${url}/cast`}>Cast</NavLink> */}
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: {
                      location: location?.state?.from.location,
                      label: 'Go back to movies',
                    },
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              {/* <NavLink to={`${url}/reviews`}>Reviews</NavLink> */}
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: {
                      location: location?.state?.from.location,
                      label: 'Go back to movies search',
                    },
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<h2>Loading...</h2>}>
            {/* <Route path="/movies/:movieId/cast">
                    <MovieCastView></MovieCastView>
                </Route> */}
            <Route
              path="/movies/:slug/cast"
              component={withQuicklink(MovieCastView, options)}
            />
            {/* <Route path="/movies/:movieId/reviews">
                    <MovieReviewsView></MovieReviewsView>
                </Route> */}
            <Route
              path="/movies/:slug/reviews"
              component={withQuicklink(MovieReviewsView, options)}
            />
          </Suspense>
        </>
      )}
    </>
  );
}
