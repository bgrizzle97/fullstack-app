import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Landing.css';

const Landing: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="logo-container">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          <img src="/react.svg" className="logo react" alt="React logo" />
        </div>
        <h1>Welcome to Our Platform</h1>
        <p>
          Discover a world of possibilities with our innovative platform.
          Join thousands of users who are already experiencing the future.
        </p>
        <div className="button-group">
          {user ? (
            <Link to="/dashboard" className="cta-button">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="cta-button">
                Login
              </Link>
              <Link to="/signup" className="cta-button secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing; 