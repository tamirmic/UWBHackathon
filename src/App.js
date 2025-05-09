import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';
import { Reviews } from './Reviews';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [reviews, setReviews] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      setIsLoading(true);
      setReviews('');
      setRestaurantName('');
      
      const res = await axios.post('http://localhost:5050/search', { restaurant: searchTerm });
      setRestaurantName(res.data.name);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error('Failed to search restaurant:', error);
      setRestaurantName('');
      setReviews('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {isLoading && <LoadingSpinner />}
      
      <header>
        <h1>Analyze Reviews, Optimize Your Restaurant</h1>
        <p>Get valuable insights and actionable feedback to help your restaurant improve and grow.</p>

        <div className={`search-container ${shake ? 'shake' : ''}`}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {restaurantName && <h2>Summary for {restaurantName}</h2>}

      <div className='cards-container'>
        <Reviews reviews={reviews}/>
      </div>
    </div>
  );
}

export default App;
