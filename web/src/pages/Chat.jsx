import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await api('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input })
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper page-transition">
      <div className="auth-card" style={{ maxWidth: '600px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '16px' }}>AI Assistant</h2>
        
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'var(--primary)' : '#fff', color: m.role === 'user' ? '#fff' : 'var(--text-main)', padding: '12px', borderRadius: '12px', maxWidth: '80%' }}>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ alignSelf: 'flex-start', padding: '12px' }}>Thinking...</div>}
        </div>

        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '8px' }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ marginBottom: 0, flex: 1 }} />
          <button type="submit" disabled={loading} style={{ width: 'auto', padding: '0 20px' }}>Send</button>
        </form>
        
        <button onClick={() => nav('/dashboard')} style={{ marginTop: '16px', background: 'transparent', color: 'var(--text-muted)', boxShadow: 'none' }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}