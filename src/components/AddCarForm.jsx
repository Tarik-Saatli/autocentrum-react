import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AddCarForm({ onCarAdded }) {
  const [form, setForm] = useState({
    name: '',
    model: '',
    trim: '',
    bodyType: '',
    doors: '',
    fuel: '',
    transmission: '',
    price: '',
    milage: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError('Je moet ingelogd zijn om een auto toe te voegen.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:4000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          doors: Number(form.doors),
          price: Number(form.price),
          milage: Number(form.milage),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Auto toevoegen is mislukt.');
      }

      setForm({
        name: '',
        model: '',
        trim: '',
        bodyType: '',
        doors: '',
        fuel: '',
        transmission: '',
        price: '',
        milage: '',
      });
      onCarAdded?.(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className="car-form-heading">
        <span className="car-form-eyebrow">VOERTUIGBEHEER</span>
        <h2>Nieuwe auto toevoegen</h2>
        <p>Vul de gegevens in om de auto aan het aanbod toe te voegen.</p>
      </div>

      <div className="car-form-grid">
        <label className="car-form-field">
          <span>Merk / naam</span>
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label className="car-form-field">
          <span>Model</span>
          <input name="model" value={form.model} onChange={handleChange} required />
        </label>
        <label className="car-form-field">
          <span>Uitvoering</span>
          <input name="trim" value={form.trim} onChange={handleChange} required />
        </label>
        <label className="car-form-field">
          <span>Carrosserie</span>
          <select name="bodyType" value={form.bodyType} onChange={handleChange} required>
            <option value="">Selecteer carrosserie</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="Stationwagon">Stationwagon</option>
            <option value="SUV">SUV</option>
            <option value="Coupé">Coupé</option>
            <option value="Cabriolet">Cabriolet</option>
            <option value="MPV">MPV</option>
            <option value="Bestelwagen">Bestelwagen</option>
          </select>
        </label>
        <label className="car-form-field">
          <span>Aantal deuren</span>
          <select name="doors" value={form.doors} onChange={handleChange} required>
            <option value="">Selecteer aantal</option>
            {[2, 3, 4, 5].map(doors => (
              <option key={doors} value={doors}>{doors} deuren</option>
            ))}
          </select>
        </label>
        <label className="car-form-field">
          <span>Brandstof</span>
          <select name="fuel" value={form.fuel} onChange={handleChange} required>
            <option value="">Selecteer brandstof</option>
            <option value="Benzine">Benzine</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride">Hybride</option>
            <option value="Plug-in hybride">Plug-in hybride</option>
            <option value="Elektrisch">Elektrisch</option>
            <option value="LPG">LPG</option>
          </select>
        </label>
        <label className="car-form-field">
          <span>Transmissie</span>
          <select name="transmission" value={form.transmission} onChange={handleChange} required>
            <option value="">Selecteer transmissie</option>
            <option value="Handgeschakeld">Handgeschakeld</option>
            <option value="Automaat">Automaat</option>
          </select>
        </label>
        <label className="car-form-field">
          <span>Prijs (€)</span>
          <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
        </label>
        <label className="car-form-field">
          <span>Kilometerstand</span>
          <input name="milage" type="number" min="0" value={form.milage} onChange={handleChange} required />
        </label>
      </div>

      <div className="car-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Auto opslaan...' : 'Auto toevoegen'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AddCarForm;
