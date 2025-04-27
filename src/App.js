import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [shake, setShake] = useState(false); // Define shake state

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setShake(true); // Trigger shake when search term is empty
      setTimeout(() => setShake(false), 500); // Stop shaking after 500ms
      return;
    }

    try {
      setReviews('');

      const res = await axios.post('http://localhost:5050/search', { restaurant: restaurantName });
      console.log(res)
      setRestaurantName(res.data.name);
      setReviews(res.data.reviews);
      console.log(reviews.toString())
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
        
        {/* Apply shake class conditionally */}
        <div className={`search-container ${shake ? 'shake' : ''}`}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {restaurantName && <h2>Summary for {restaurantName}</h2>}
      </header>

      <h4>{ reviews.toString() }</h4>

      

      <section className="feedback-section">
        <h2>Feedback & Suggestions</h2>
        <div className="cards-container">
          <div className="card">
            <i className="fas fa-thumbs-up"></i>
            <h3>Improve Food Quality</h3>
            <p>Several reviews mentioned inconsistent food quality. Focus on ensuring dishes are consistently well-prepared.</p>
          </div>
          <div className="card">
            <i className="fas fa-user"></i>
            <h3>Enhance Service</h3>
            <p>Guests noted slow and inattentive service: Train staff to be more attentive and responsive to customer needs.</p>
          </div>
          <div className="card">
            <i className="fas fa-volume-mute"></i>
            <h3>Reduce Noise Level</h3>
            <p>Customers frequently cited high noise levels. Consider adding sound-absorbing materials to create a more comfortable atmosphere.</p>
          </div>
          <div className="card">
            <i className="fas fa-clock"></i>
            <h3>Shorten Wait Times</h3>
            <p>Long wait times for seating and food were common complaints. Streamline operations to reduce delays.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
