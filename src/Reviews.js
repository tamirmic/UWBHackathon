import React from 'react';
import './Reviews.css';

export function Reviews({ reviews }) {
  if (!reviews) {
    return null;
  }

  const lines = reviews.split('\n');
  
  const cards = [];
  let currentCard = null;

  // Process the reviews text into cards
  lines.forEach((line, index) => {
    line = line.trim();
    if (line.startsWith('**')) {
      // New card
      if (currentCard) {
        cards.push(currentCard);
      }
      
      // Extract impact level from title if available
      let title = line.replace(/\*\*/g, '');
      let impactLevel = 'medium';
      
      // Check for impact level tags
      if (title.includes('[HIGH IMPACT]')) {
        impactLevel = 'high';
        title = title.replace('[HIGH IMPACT]', '').trim();
      } else if (title.includes('[MEDIUM IMPACT]')) {
        impactLevel = 'medium';
        title = title.replace('[MEDIUM IMPACT]', '').trim();
      } else if (title.includes('[LOW IMPACT]')) {
        impactLevel = 'low';
        title = title.replace('[LOW IMPACT]', '').trim();
      }
      
      currentCard = {
        title: title,
        content: [],
        icon: getIconForTitle(line),
        impactLevel: impactLevel
      };
    } else if (line === '') {
      // Optionally, add a <br /> or ignore
      currentCard?.content.push(<br key={`br-${index}`} />);
    } else if (line.startsWith('*Issue:*')) {
      currentCard?.content.push(
        <div key={`issue-${index}`} className="review-issue">
          <strong>Issue:</strong> {line.replace(/\*Issue:\*/, '').trim()}
        </div>
      );
    } else if (line.startsWith('*Actionable Items:*')) {
      currentCard?.content.push(
        <div key={`action-${index}`} className="review-action">
          <strong>Actionable Items:</strong>
        </div>
      );
    } else if (line.startsWith('*')) {
      currentCard?.content.push(
        <li key={`li-${index}`} className="review-list-item">
          {line.replace(/\*/g, '')}
        </li>
      );
    } else {
      currentCard?.content.push(
        <p key={`p-${index}`} className="review-paragraph">
          {line}
        </p>
      );
    }
  });

  if (currentCard) {
    cards.push(currentCard);
  }

  // If we have no reviews yet, show a placeholder
  if (cards.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews to display. Try searching for a restaurant.</p>
      </div>
    );
  }

  return (
    <div className="reviews-grid">
      {cards.map((card, index) => (
        <div key={index} className={`review-card impact-${card.impactLevel}`}>
          <div className="review-header">
            <div className="review-icon">{card.icon}</div>
            <h3 className="review-title">{card.title}</h3>
            <div className={`impact-badge ${card.impactLevel}`}>
              {card.impactLevel.charAt(0).toUpperCase() + card.impactLevel.slice(1)}
            </div>
          </div>
          <div className="review-content">
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to assign an icon based on the title
function getIconForTitle(title) {
  const lowercaseTitle = title.toLowerCase();
  
  if (lowercaseTitle.includes('positive') || lowercaseTitle.includes('strength')) {
    return '✅';
  } else if (lowercaseTitle.includes('negative') || lowercaseTitle.includes('weakness')) {
    return '⚠️';
  } else if (lowercaseTitle.includes('suggestion') || lowercaseTitle.includes('recommend')) {
    return '💡';
  } else if (lowercaseTitle.includes('summary')) {
    return '📝';
  } else {
    return '📊';
  }
}

