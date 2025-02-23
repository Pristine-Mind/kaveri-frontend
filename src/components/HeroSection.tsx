import React, { useEffect, useState } from 'react';
import hero from '../assets/banner.png';
// import offerImage from '../assets/offer-new.jpeg';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return (
    <div style={styles.heroSection}>
      <div style={styles.heroImage}>
        <div style={styles.textCenter}>
          TOP-QUALITY NEPALI PRODUCTS<br />
          IMPORTED FROM NEPAL
          <br />
          <button
            style={styles.shopNowButton}
            onClick={() => navigate('/beers')}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d97706')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fcd34d')}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={closeModal}>&times;</span>
            <img
              src={offerImage}
              alt="Offer"
              style={styles.offerImage}
            />
          </div>
        </div>
      )} */}
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
    marginTop: '80px',
  },
  heroImage: {
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textCenter: {
    textAlign: 'center' as const,
    color: '#ffffff',
    fontWeight: 'bold' as const,
    fontSize: '2.5rem',
    letterSpacing: '2px',
    textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
    lineHeight: '1.2',
    padding: '0 20px',
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

  modal: {
    position: 'fixed' as const,
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '80%',
    maxWidth: '400px',
    animation: 'fadeIn 1s ease-out',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '30px',
    color: '#000',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  offerImage: {
    width: '100%',
    borderRadius: '8px',
  },
  modalTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '15px',
  },
  modalDescription: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  code: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '15px',
    color: '#fcd34d',
  },
  copyCode: {
    fontSize: '1rem',
    marginTop: '10px',
    color: '#555',
  },
  modalButton: {
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
