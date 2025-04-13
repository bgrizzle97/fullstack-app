import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to backend
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          firebaseUid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data to backend');
      }

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <p className="login-link">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="link-button"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
} 