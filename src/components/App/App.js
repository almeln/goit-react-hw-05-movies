import Container from 'components/Container';
import Navigation from 'components/Navigation';
import { Route, Switch } from 'react-router';
import HomeView from 'views/HomeView';
import MoviesView from 'views/MoviesView';
import NotFoundView from 'views/NotFoundView';

import './App.css';

function App() {
  return (
    <Container>
      <Navigation></Navigation>
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies">
          <MoviesView />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
