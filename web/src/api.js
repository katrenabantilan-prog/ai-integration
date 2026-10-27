const API_URL = 'http://localhost:3000';

export const getToken = () => localStorage.getItem('token');
export const setToken = (t) => t ? localStorage.setItem('token', t) : localStorage.removeItem('token');

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}