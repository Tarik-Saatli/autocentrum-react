import { useEffect, useState } from 'react';
import Car from './car';
import EditCarForm from './EditCarForm';
import { useAuth } from '../context/AuthContext';
import vehicleListings from '../data/vehicleListings';

function CarList() {
    const { token, user } = useAuth();
    const isAdmin = token && user?.role === 'admin';
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [actionError, setActionError] = useState(null);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const [response, importStatusResponse] = await Promise.all([
                    fetch('http://localhost:4000/api/cars'),
                    fetch('http://localhost:4000/api/cars/legacy-import-status'),
                ]);
                const [data, importStatus] = await Promise.all([
                    response.json(),
                    importStatusResponse.json(),
                ]);

                if (!response.ok) {
                    throw new Error(data.error || "Auto's ophalen is mislukt.");
                }
                if (!importStatusResponse.ok) {
                    throw new Error(importStatus.error || 'De status van het bestaande aanbod ophalen is mislukt.');
                }

                if (!Array.isArray(data)) {
                    throw new Error("De lijst met auto's heeft een ongeldig formaat.");
                }

                const legacyIds = new Set(vehicleListings.map(car => car.id));
                const legacyFallback = importStatus.imported
                    ? []
                    : vehicleListings.map(car => ({
                        ...car,
                        _id: car.id,
                        name: car.make,
                        milage: car.mileage,
                        isLegacyFallback: true,
                    }));
                const existingLegacyIds = new Set(data.map(car => car.legacyId).filter(Boolean));

                setCars([
                    ...legacyFallback.filter(car => !existingLegacyIds.has(car.id)),
                    ...data,
                ]);
            } catch (error) {
                setLoadError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleUpdated = (updatedCar) => {
        setCars(currentCars =>
            currentCars.map(car => car._id === updatedCar._id ? updatedCar : car)
        );
        setEditing(null);
    };

    const handleDelete = async (id) => {
        if (!isAdmin) {
            setActionError('Alleen een beheerder kan een auto verwijderen.');
            return;
        }

        setActionError(null);
        try {
            const response = await fetch(`http://localhost:4000/api/cars/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Verwijderen is mislukt.');
            }

            setCars(currentCars => currentCars.filter(car => car._id !== id));
        } catch (error) {
            setActionError(error.message);
        }
    };

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (loadError) {
        return <p className="error">Er ging iets mis: {loadError}</p>;
    }

    return (
        <div className="car-list">
            {actionError && <p className="error">{actionError}</p>}
            {isAdmin && editing && (
                <EditCarForm
                    car={editing}
                    onUpdated={handleUpdated}
                    onCancel={() => setEditing(null)}
                />
            )}
            {cars.length === 0
                ? <p>Geen auto's gevonden.</p>
                : cars.map(car => (
                    <Car
                        key={car._id}
                        car={car}
                        onDelete={isAdmin && !car.isLegacyFallback ? handleDelete : undefined}
                        onEdit={isAdmin && !car.isLegacyFallback ? setEditing : undefined}
                    />
                ))}
        </div>
    );
}

export default CarList;
