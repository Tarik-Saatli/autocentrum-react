import { useEffect, useState } from 'react';
import Car from './car';
import EditCarForm from './EditCarForm';
import { useAuth } from '../context/AuthContext';

function CarList() {
    const { token, user } = useAuth();
    const isAdmin = token && user?.role === 'admin';
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/cars');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Auto's ophalen is mislukt.");
                }

                setCars(data);
            } catch (error) {
                setError(error.message);
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
            setError('Alleen een beheerder kan een auto verwijderen.');
            return;
        }

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
            setError(error.message);
        }
    };

    if (isLoading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return <p className="error">Er ging iets mis: {error}</p>;
    }

    return (
        <div className="car-list">
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
                        onDelete={isAdmin ? handleDelete : undefined}
                        onEdit={isAdmin ? setEditing : undefined}
                    />
                ))}
        </div>
    );
}

export default CarList;
