import { useEffect, useState } from 'react';
import CarList from '../components/carList';
import AddCarForm from '../components/AddCarForm';
import Login from './login';
import { useAuth } from '../context/AuthContext';
import vehicleListings from '../data/vehicleListings';

const CarsPage = () => {
    const { token, user, logout } = useAuth();
    const [carsRefreshKey, setCarsRefreshKey] = useState(0);
    const [importError, setImportError] = useState('');

    const importLegacyListings = async () => {
        setImportError('');

        try {
            const response = await fetch('http://localhost:4000/api/cars/import-legacy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ listings: vehicleListings }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Bestaande advertenties overzetten is mislukt.');
            }

            setCarsRefreshKey(key => key + 1);
        } catch (error) {
            setImportError(error.message);
        }
    };

    useEffect(() => {
        if (token && user?.role === 'admin') {
            importLegacyListings();
        }
    }, [token, user?.role]);

    return (
        <div className="App">
            <h1>Auto's</h1>
            {token && user?.role === 'admin' ? (
                <>
                    <AddCarForm onCarAdded={() => setCarsRefreshKey(key => key + 1)} />
                    {importError && <p className="error">{importError}</p>}
                </>
            ) : token ? (
                <section className="carlist-auth">
                    <p>Om auto’s toe te voegen, bewerken of verwijderen moet je ingelogd zijn als beheerder.</p>
                    <button type="button" onClick={logout}>Uitloggen en met een beheeraccount inloggen</button>
                    <Login />
                </section>
            ) : (
                <section className="carlist-auth">
                    <p>Log in als beheerder om auto’s toe te voegen, bewerken of verwijderen. De bestaande advertenties staan hieronder.</p>
                    <Login />
                </section>
            )}
            <CarList key={carsRefreshKey} />
        </div>
    );
};

export default CarsPage;
