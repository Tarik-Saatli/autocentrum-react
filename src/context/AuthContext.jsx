// frontend/src/context/AuthContext.jsx

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedEmail = localStorage.getItem('email');
    const savedRole = localStorage.getItem('role');
    return savedEmail ? { email: savedEmail, role: savedRole } : null;
  });

  const login = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setUser({ email: data.email, role: data.role });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Handige hook
export function useAuth() {
  return useContext(AuthContext);
}