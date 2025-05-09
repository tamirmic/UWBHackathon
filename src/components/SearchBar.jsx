import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter restaurant name"
        className="search-input"
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
