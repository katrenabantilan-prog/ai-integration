import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getToken, setToken } from './api.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// 🚀 UPDATE THIS EVERY WEEK FOR YOUR INSTRUCTOR
const APP_VERSION = "v1.0.0 (Authentication Module)"; 

function Dashboard({ onLogout }) {
  return (
    <div className="auth-wrapper page-transition">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)' }}>Welcome!</h2>
        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Welcome! You are securely logged in. AI features are coming in the next update.
        </p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default function App() {
  const [token, setTokenState] = useState(getToken());
  const nav = useNavigate();

  const logout = () => { 
    setToken(null); 
    setTokenState(null); 
    nav('/login'); 
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login onLogin={setTokenState} />} />
          <Route path="/register" element={<Register onLogin={setTokenState} />} />
          <Route path="/dashboard" element={token ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>
      
      {/* FOOTER */}
      <footer className="app-footer">
        <p>Group 6: AI Integration System</p>
        <span className="version-badge">{APP_VERSION}</span>
      </footer>
    </div>
  );
}