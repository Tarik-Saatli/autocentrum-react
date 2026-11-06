import { useState } from 'react';
import CarList from '../components/carList';
import AddCarForm from '../components/AddCarForm';
import Login from './login';
import { useAuth } from '../context/AuthContext';
import vehicleListings from '../data/vehicleListings';

const CarsPage = () => {
    const { token, user } = useAuth();
    const [carsRefreshKey, setCarsRefreshKey] = useState(0);
    const [isImporting, setIsImporting] = useState(false);
    const [importMessage, setImportMessage] = useState('');
    const [importError, setImportError] = useState('');

    const importLegacyListings = async () => {
        setIsImporting(true);
        setImportMessage('');
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
                ? 'De bestaande advertenties waren al overgezet.'
                : `${data.imported} bestaande advertenties staan nu in CarList en Te koop.`);
            setCarsRefreshKey(key => key + 1);
        } catch (error) {
            setImportError(error.message);
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="App">
            <h1>Auto's</h1>
            {token && user?.role === 'admin' ? (
                <>
                    <AddCarForm onCarAdded={() => setCarsRefreshKey(key => key + 1)} />
                    <section className="car-form">
                        <div className="car-form-heading">
                            <span className="car-form-eyebrow">BESTAAND AANBOD</span>
                            <h2>Advertenties overzetten</h2>
                            <p>Voeg de huidige advertenties eenmalig toe aan CarList en Te koop.</p>
                        </div>
                        <div className="car-form-actions">
                            <button type="button" onClick={importLegacyListings} disabled={isImporting}>
                                {isImporting ? 'Advertenties overzetten...' : 'Bestaande advertenties overzetten'}
                            </button>
                        </div>
                        {importMessage && <p>{importMessage}</p>}
                        {importError && <p className="error">{importError}</p>}
                    </section>
                </>
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
