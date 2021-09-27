import { NavLink } from 'react-router-dom';
import css from 'components/Navigation/Navigation.module.css';

const Navigation = () => (
  <header className={css.header}>
    <nav>
      <NavLink
        exact
        to="/"
        className={css.link}
        activeClassName={css.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={css.link}
        activeClassName={css.activeLink}
      >
        Movies
      </NavLink>
    </nav>
  </header>
);

export default Navigation;
