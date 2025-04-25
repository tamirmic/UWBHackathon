import SearchBar from './components/SearchBar';
import './App.css'; // Import the App styles!

function App() {
  const handleSearch = (url) => {
    console.log('Searching for:', url);
    // later: send url to backend
  };

  return (
    <div className="app-container">
      <h1>Yelp Review Analyzer</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;