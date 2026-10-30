// frontend/src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

useEffect(() => {
  const savedToken = localStorage.getItem('token');
  const savedEmail = localStorage.getItem('email');

  if (savedToken && savedEmail) {
    setToken(savedToken);
    setUser({ email: savedEmail });
  }
}, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setUser({ email: data.email });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
  };

  const register = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setUser({ email: data.email });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Handige hook
export function useAuth() {
  return useContext(AuthContext);
}