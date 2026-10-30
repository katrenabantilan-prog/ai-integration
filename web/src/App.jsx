import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getToken, setToken } from './api.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Chat from './pages/Chat.jsx'; // 1. Added Chat import


const APP_VERSION = "v1.1.0 (AI Chat)"; 

function Dashboard({ onLogout }) {
  const nav = useNavigate(); // 2. Added nav to Dashboard

  return (
    <div className="auth-wrapper page-transition">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)' }}>Welcome!</h2>
        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          You are securely logged in. Try out the new AI Assistant!
        </p>
        
        {/* 3. Added button to navigate to Chat */}
        <button onClick={() => nav('/chat')} style={{ marginBottom: '12px', background: 'var(--primary)' }}>
          Open AI Chat
        </button>
        
        <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--text-muted)', boxShadow: 'none' }}>
          Logout
        </button>
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
          
          {/* 4. Added protected Chat route */}
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
          
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