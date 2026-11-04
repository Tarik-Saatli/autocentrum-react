// frontend/src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login({ onSwitchToRegister }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/cars');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Inloggen</h2>

      <label htmlFor="login-email">E-mailadres</label>
      <input
        id="login-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <label htmlFor="login-password">Wachtwoord</label>
      <input
        id="login-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      <button type="submit">Inloggen</button>

      {error && <p className="error">{error}</p>}
      {onSwitchToRegister && (
        <p className="auth-switch">
          Nog geen account?{' '}
          <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}>
            Registreren
          </button>
        </p>
      )}
    </form>
  );
}

export default Login;