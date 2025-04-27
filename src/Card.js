import React from 'react';

const cardStyle = {
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  width: '50vh',         // fixed width for nice grid layout
};

const cardHoverStyle = {
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-4px)',
};

const cardContentStyle = {
  padding: '24px',
};

const cardGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

export function CardGrid({ children }) {
  return <div style={cardGridStyle}>{children}</div>;
}

export function Card({ children, className = '' }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={className}
      style={{ ...cardStyle, ...(isHovered ? cardHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={className} style={cardContentStyle}>
      {children}
    </div>
  );
}
