import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';
import { Reviews } from './Reviews'
import { CardGrid } from './Card';

function App() {
  const [reviews, setReviews] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [shake, setShake] = useState(false);

  

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      setReviews('');
      const res = await axios.post('http://localhost:5050/search', { restaurant: searchTerm });
      console.log(res);
      setRestaurantName(res.data.name);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error('Failed to search restaurant:', error);
      setRestaurantName('');
      setReviews('');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Analyze Reviews, Optimize Your Restaurant</h1>
        <p>Get valuable insights and actionable feedback to help your restaurant improve and grow.</p>

        <div className={`search-container ${shake ? 'shake' : ''}`}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {restaurantName && <h2>Summary for {restaurantName}</h2>}
      </header>

      <div className='cards-container'>
      <Reviews reviews={reviews}/>

      </div>

    </div>
  );
}

export default App;
