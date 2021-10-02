import { lazy, Suspense } from 'react';

import Container from 'components/Container';
import Navigation from 'components/Navigation';
import { Route, Switch } from 'react-router';
// import HomeView from 'views/HomeView';
// import MovieDetailsView from 'views/MovieDetailsView';
// import MoviesView from 'views/MoviesView';
// import NotFoundView from 'views/NotFoundView';
import './App.css';
import { withQuicklink } from 'quicklink/dist/react/hoc.js';

const HomeView = lazy(() =>
  import('../../views/HomeView' /* webpackChunkName: "home-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    '../../views/MovieDetailsView.js' /* webpackChunkName: "movie-details-view" */
  ),
);
const MoviesView = lazy(() =>
  import('../../views/MoviesView.js' /* webpackChunkName: "movies-view" */),
);
const NotFoundView = lazy(() =>
  import(
    '../../views/NotFoundView.js' /* webpackChunkName: "not-found-view" */
  ),
);

const options = {
  origins: [],
};

function App() {
  return (
    <Container>
      <Navigation></Navigation>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          {/* <Route path="/" exact>
            <HomeView />
          </Route> */}
          <Route path="/" exact component={withQuicklink(HomeView, options)} />
          {/* Путь с динамическим параметром ставится выше или exact*/}
          {/* <Route path="/movies" exact>
            <MoviesView />
          </Route> */}
          <Route
            path="/movies"
            exact
            component={withQuicklink(MoviesView, options)}
          />
          {/* <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route> */}
          <Route
            path="/movies/:slug"
            component={withQuicklink(MovieDetailsView, options)}
          />
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
