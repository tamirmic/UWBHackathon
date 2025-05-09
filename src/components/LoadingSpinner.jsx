import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <p className="loading-text">Loading results...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner; 