import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, setToken } from '../api.js';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(''); 
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setErr('');
    try {
      const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setToken(data.token); 
      onLogin(data.token); 
      nav('/dashboard');
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="auth-wrapper page-transition">
      <h1 className="auth-title">AI Integration System</h1>
      <p className="auth-subtitle">Welcome back! Please log in to continue.</p>
      
      <div className="auth-card">
        <div className="auth-orb-container">
          <div className="auth-orb">
            <div className="auth-orb-face"><div className="auth-eye"></div><div className="auth-eye"></div></div>
          </div>
        </div>

        <form onSubmit={submit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {err && <p className="err" style={{ marginBottom: '16px' }}>{err}</p>}
          <button type="submit">Login</button>
        </form>
        
        <div className="auth-toggle">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}