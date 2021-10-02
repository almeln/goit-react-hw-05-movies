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
  import('../views/MovieCastView.js' /* webpackChunkName: "cast-view" */),
);
const MovieReviewsView = lazy(() =>
  import('../views/MovieReviewsView.js' /* webpackChunkName: "reviews-view" */),
);

const options = {
  origins: [],
};

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  console.log('MovieDetailsViewLocation', location);
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    try {
      fetchMovieById(movieId).then(setMovie);
    } catch {
      console.log('ERROR');
    }
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          {/* <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movieId.original_title}/> */}
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <img src={movie.poster_path} alt={movie.original_title} />
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
          <hr />
          <h4>Additional information</h4>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<h2>Loading...</h2>}>
            {/* <Route path="/movies/:movieId/cast">
                    <MovieCastView></MovieCastView>
                </Route> */}
            <Route
              path="/movies/:movieId/cast"
              component={withQuicklink(MovieCastView, options)}
            />
            {/* <Route path="/movies/:movieId/reviews">
                    <MovieReviewsView></MovieReviewsView>
                </Route> */}
            <Route
              path="/movies/:movieId/reviews"
              component={withQuicklink(MovieReviewsView, options)}
            />
          </Suspense>
        </>
      )}
    </>
  );
}
