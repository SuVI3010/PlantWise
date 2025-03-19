import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import treesImage from './trees.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/tool'); // Navigate to the tool page
  };

  return (
    <div
      className="homepage d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${treesImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay applied only over the background image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark overlay with 40% opacity
          zIndex: 0, // Ensure it's behind the content
        }}
      ></div>

      {/* Content container */}
      <div className="text-center text-light position-relative z-index-1">
        <h1 style={{ fontWeight: '600' }} className="display-4 mb-4">
            Welcome to the Habitability Tool
           </h1>

        <p style={{ fontWeight: '600' }} className="lead font-weight-bold mb-4">
            This tool predicts the habitability of a location based on various environmental factors.
        </p>
        <button className="btn btn-primary btn-lg mt-4" onClick={handleEnterClick}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default HomePage;
