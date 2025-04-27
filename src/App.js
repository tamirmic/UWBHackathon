import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (restaurantName) => {
    try {
      setError('');
      setReviews([]);
      const res = await axios.post('http://localhost:5050/search', { restaurant: restaurantName });

      setRestaurantName(res.data.name);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error('Failed to search restaurant:', error);
      setError('Restaurant not found or server error');
      setRestaurantName('');
      setReviews([]);  
    }
  };

  return (
    <div className="app-container">
      <h1>Yelp Review Analyzer</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {restaurantName && <h2>Reviews for {restaurantName}</h2>}

      <ul>
        {reviews.map((review, idx) => (
          <li key={idx}>{review}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
