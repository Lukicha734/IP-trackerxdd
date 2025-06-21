import { useState } from 'react';

const Header = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
    setInput('');
  };

  return (
    <header className="header">
      <h1 className="header__title">IP Address Tracker</h1>
      <form className="header__form" onSubmit={handleSubmit}>
        <input
          className="header__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for any IP address or domain"
          aria-label="Search IP"
        />
        <button className="header__button" type="submit">
          <img src="images/icon-arrow.svg" alt="icon arrow" />
        </button>
      </form>
    </header>
  );
};

export default Header;
