import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AdminHomePage.css';
import axios from 'axios';
import logo from '../../assets/newlogo.png';  // Import the logo image

const AdminHomePage = () => {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); 
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const text = 'Manage Your Bike Shops Seamlessly';
    const textArray = text.split('');
    setLetters(textArray);
  }, []);

  async function saveAdmin(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8095/admin/save', {
        adminName,
        adminEmail,
        adminPassword,
        adminRole,
      });
      alert('Admin Registration Successful');
      navigate('/admin/dashboard'); 
    } catch (err) {
      alert(err);
    }
  }

  async function loginAdmin(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8095/admin/login', {
        adminEmail,
        adminPassword,
      });
    
      if (response.data.status === true) {
        navigate('/admin/dashboard');
      } else if (response.data.status === false) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="admin-home-page">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Bike Service Platform - Admin Portal</h1>
        </div>
      </nav>
      <h2 className="page-title">
        {letters.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      <div className="container">
        <div className="login-section">
          <h2>{isSignUp ? 'Hi There! Already have an account?' : "Hi There!, Don't have an account?"}</h2>
          <p>{isSignUp ? 'Click the Emoji to Sign In' : "Click the Emoji to Sign Up"}</p>
          <div className="emoji" onClick={() => setIsSignUp(!isSignUp)}>
            <span role="img" aria-label="emoji">{isSignUp ? '😋' : '🔒'}</span>
          </div>
        </div>
        {isSignUp ? (
          <div className="signup-section">
            <h2>Sign Up</h2>
            <form onSubmit={saveAdmin}>
              <input
                type="text"
                placeholder="Username"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Admin Role"
                required
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        ) : (
          <div className="signup-section">
            <h2>Login</h2>
            <form onSubmit={loginAdmin}>
              <input
                type="email"
                placeholder="Email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
