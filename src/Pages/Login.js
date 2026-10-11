

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import bag from '../assets/images/photo_2026-10-08_14-51-43.jpg';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    navigate('/');
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-image">
          <img src={bag} alt="NORO bag" />
        </div>

        <div className="login-form-side">
          <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="login-sub">
            {isSignUp
              ? 'Sign up to start shopping with Noro'
              : 'Sign in to your Noro account'}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <FiMail />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <FiLock />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye"
                onClick={() => setShowPass(!showPass)}
                aria-label="Show password"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="signin-btn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="switch">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          <div className="or">
            <span>or</span>
          </div>

          <div className="social">
            <button type="button">
              <FcGoogle /> Continue with Google
            </button>
            <button type="button">
              <FaFacebook className="fb" /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;