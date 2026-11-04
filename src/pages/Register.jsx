// frontend/src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register({ onSwitchToLogin }) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(email, password);
      navigate('/cars');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Account aanmaken</h2>
      <label htmlFor="register-email">E-mailadres</label>
      <input
        id="register-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <label htmlFor="register-password">Wachtwoord (minimaal 6 tekens)</label>
      <input
        id="register-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        minLength={6}
        required
      />
      <button type="submit">Registreren</button>
      {error && <p className="error">{error}</p>}
      {onSwitchToLogin && (
        <p className="auth-switch">
          Heb je al een account?{' '}
          <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}>
            Inloggen
          </button>
        </p>
      )}
    </form>
  );
}

export default Register;