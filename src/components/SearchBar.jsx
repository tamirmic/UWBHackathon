import { useState } from 'react';
import './SearchBar.css'; // Import the CSS file!

function SearchBar({ onSearch }) {
  const [url, setUrl] = useState('');

  const handleSearch = () => {
    if (url.trim() !== '') {
      onSearch(url);
    }
  };

  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        value={url} 
        onChange={e => setUrl(e.target.value)} 
        placeholder="Enter Yelp or website URL"
        className="search-input"
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
      />

      <button 
        onClick={handleSearch} 
        className="search-button"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;