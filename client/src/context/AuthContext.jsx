import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, loginUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('shopsphere_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shopsphere_user')) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((data) => {
        setUser(data.user);
        localStorage.setItem('shopsphere_user', JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  async function login(credentials) {
    const data = await loginUser(credentials);
    localStorage.setItem('shopsphere_token', data.token);
    localStorage.setItem('shopsphere_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function register(payload) {
    return registerUser(payload);
  }

  function logout() {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
