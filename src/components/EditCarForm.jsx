import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function EditCarForm({ car, onUpdated, onCancel }) {
    const [name, setName] = useState(car.name);
    const [price, setPrice] = useState(car.price);
    const [milage, setMilage] = useState(car.milage);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/api/cars/${car._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    price: Number(price),
                    milage: Number(milage),
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Auto aanpassen is mislukt.');
            }

            onUpdated(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <h3>Auto bewerken</h3>

            <label htmlFor="edit-car-name">Naam:</label>
            <input id="edit-car-name" value={name} onChange={(event) => setName(event.target.value)} required />

            <label htmlFor="edit-car-price">Prijs:</label>
            <input id="edit-car-price" type="number" value={price} onChange={(event) => setPrice(event.target.value)} required />

            <label htmlFor="edit-car-milage">Kilometerstand:</label>
            <input id="edit-car-milage" type="number" value={milage} onChange={(event) => setMilage(event.target.value)} required />

            <button type="submit">Opslaan</button>
            <button type="button" onClick={onCancel}>Annuleren</button>

            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default EditCarForm;
