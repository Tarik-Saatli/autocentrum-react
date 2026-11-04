import { useState } from 'react';
import CarList from '../components/carList';
import AddCarForm from '../components/AddCarForm';
import Login from './login';
import Register from './Register';
import { useAuth } from '../context/AuthContext';

const CarsPage = () => {
    const { token } = useAuth();
    const [authMode, setAuthMode] = useState('login');
    const [carsRefreshKey, setCarsRefreshKey] = useState(0);

    return (
        <div className="App">
            <h1>Auto's</h1>
            {token ? (
                <AddCarForm onCarAdded={() => setCarsRefreshKey(key => key + 1)} />
            ) : (
                <section className="carlist-auth">
                    <div className="carlist-auth-tabs">
                        <button
                            type="button"
                            className={authMode === 'login' ? 'active' : ''}
                            onClick={() => setAuthMode('login')}
                        >
                            Inloggen
                        </button>
                        <button
                            type="button"
                            className={authMode === 'register' ? 'active' : ''}
                            onClick={() => setAuthMode('register')}
                        >
                            Registreren
                        </button>
                    </div>
                    {authMode === 'login'
                        ? <Login onSwitchToRegister={() => setAuthMode('register')} />
                        : <Register onSwitchToLogin={() => setAuthMode('login')} />}
                </section>
            )}
            <CarList key={carsRefreshKey} />
        </div>
    );
};

export default CarsPage;
