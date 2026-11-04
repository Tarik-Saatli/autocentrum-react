import { useState } from 'react';
import CarList from '../components/carList';
import AddCarForm from '../components/AddCarForm';
import Login from './login';
import { useAuth } from '../context/AuthContext';

const CarsPage = () => {
    const { token, user } = useAuth();
    const [carsRefreshKey, setCarsRefreshKey] = useState(0);

    return (
        <div className="App">
            <h1>Auto's</h1>
            {token && user?.role === 'admin' ? (
                <AddCarForm onCarAdded={() => setCarsRefreshKey(key => key + 1)} />
            ) : token ? (
                <p>Dit account heeft geen beheerdersrechten. Log uit en log in met het adminaccount.</p>
            ) : (
                <section className="carlist-auth">
                    <Login />
                </section>
            )}
            <CarList key={carsRefreshKey} />
        </div>
    );
};

export default CarsPage;
