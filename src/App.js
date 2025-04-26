import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';

function App() {
  const handleSearch = async (restaurantName) => {
    try {
      const res = await axios.post('http://localhost:5000/search', { restaurant: restaurantName });
      const restaurantUrl = res.data.url;
      
      window.open(restaurantUrl, '_blank');
    } catch (error) {
      console.error('Failed to search restaurant:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Yelp Review Analyzer</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;