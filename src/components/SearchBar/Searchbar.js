import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');
  const history = useHistory();
  const location = useLocation();

  // const query = new URLSearchParams(location.search).get('query');
  // console.log(query);

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Проверка на пустоту
    if (searchName.trim() === '') {
      return console.log('ERROR');
    }

    // В форму передали сабмит
    onSubmit(searchName);

    console.log(location);
    console.log(history);
    history.push({
      ...location,
      search: `query=${searchName}`,
    });

    setSearchName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="searchName"
        value={searchName}
        onChange={handleNameChange}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}
