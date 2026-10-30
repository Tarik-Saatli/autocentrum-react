// frontend/src/components/Header.jsx

import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Workouts</h1>
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={logout}>Uitloggen</button>
        </div>
      )}
    </header>
  );
}