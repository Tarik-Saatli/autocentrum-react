import { useEffect, useState } from 'react';
import CarList from '../components/carList';
import AddCarForm from '../components/AddCarForm';
import Login from './login';
import { useAuth } from '../context/AuthContext';
import vehicleListings from '../data/vehicleListings';

const CarsPage = () => {
    const { token, user, logout } = useAuth();
    const [carsRefreshKey, setCarsRefreshKey] = useState(0);
    const [isImporting, setIsImporting] = useState(false);
    const [importMessage, setImportMessage] = useState('');
    const [importError, setImportError] = useState('');

    const importLegacyListings = async () => {
        setIsImporting(true);
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

            setImportMessage(data.alreadyImported
                ? 'De bestaande advertenties zijn gesynchroniseerd.'
                : `${data.imported} bestaande advertenties zijn toegevoegd aan CarList.`);
            setCarsRefreshKey(key => key + 1);
        } catch (error) {
            setImportError(error.message);
        } finally {
            setIsImporting(false);
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
                    <section className="car-form">
                        <div className="car-form-heading">
                            <span className="car-form-eyebrow">BESTAAND AANBOD</span>
                            <h2>Advertenties synchroniseren</h2>
                            <p>Het bestaande aanbod wordt automatisch aan CarList toegevoegd.</p>
                        </div>
                        <div className="car-form-actions">
                            <button type="button" onClick={importLegacyListings} disabled={isImporting}>
                                {isImporting ? 'Advertenties synchroniseren...' : 'Opnieuw synchroniseren'}
                            </button>
                        </div>
                        {importMessage && <p>{importMessage}</p>}
                        {importError && <p className="error">{importError}</p>}
                    </section>
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
