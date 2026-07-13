import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      api.get('/admin/verify')
        .then(res => setAdmin(res.data.admin))
        .catch(() => localStorage.removeItem('portfolio_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post('/admin/login', { username, password });
    localStorage.setItem('portfolio_token', res.data.token);
    setAdmin({ username: res.data.username });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
