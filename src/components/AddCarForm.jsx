import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AddCarForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [milage, setMilage] = useState('');
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/cars', {
        method: 'POST',
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
        throw new Error(data.error || 'Auto toevoegen is mislukt.');
      }

      navigate('/cars');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Nieuwe auto</h3>

      <label htmlFor="car-name">Naam:</label>
      <input
        id="car-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="car-price">Prijs:</label>
      <input
        id="car-price"
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <label htmlFor="car-milage">Kilometerstand:</label>
      <input
        id="car-milage"
        type="number"
        value={milage}
        onChange={(event) => setMilage(event.target.value)}
        required
      />

      <button type="submit">Toevoegen</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AddCarForm;
