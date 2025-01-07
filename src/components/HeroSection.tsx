import React from 'react';
import hero from '../assets/banner.png';

const HeroSection: React.FC = () => {
  return (
    <div style={styles.heroSection}>
      <div style={styles.heroImage}>
        <div style={styles.textCenter}>
          TOP-QUALITY NEPALI PRODUCTS<br />
          IMPORTED FROM NEPAL
          <br />
          <button 
            style={styles.shopNowButton} 
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d97706')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fcd34d')}
          >
            Shop Now
          </button>
        </div>
      </div>
      <style>
        {`
          html, body, #root {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
            font-family: Helvetica, Arial, sans-serif;
          }
          
          @keyframes zoomIn {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  heroSection: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative' as const,
    marginLeft: '0',
    marginTop: '80px'
  },
  heroImage: {
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    animation: 'zoomIn 10s infinite alternate',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center' as const,
    color: '#ffffff',
    fontWeight: 'bold' as const,
    fontSize: '2.5rem',
    letterSpacing: '2px',
    textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
    lineHeight: '1.2',
    padding: '0 20px'
  },
  shopNowButton: {
    marginTop: '20px',
    backgroundColor: '#fcd34d',
    color: 'black',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default HeroSection;
