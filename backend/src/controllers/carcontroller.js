import { Car } from '../models/Car.js';
import mongoose from 'mongoose';

// GET alle workouts
export const getAllCars = async (req, res) => {
  try {
    // 1. Haal alle workouts op
    // 2. Sorteer: nieuwste eerst
    const cars = await Car.find({}).sort({ createdAt: -1 });

    // 3. Stuur terug
    res.status(200).json(cars);
  } catch (error) {
    // 4. Als fout, stuur error
    res.status(500).json({ error: error.message });
  }
};

// GET één workout op basis van ID
export const getCarById = async (req, res) => {
  // 1. Haal ID uit URL
  const { id } = req.params;

  // 2. Check of ID geldig is (24 tekens, juiste format)
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige car ID' });
  }

  try {
    // 3. Zoek workout met dit ID
    const car = await Car.findById(id);

    // 4. Bestaat niet? Stuur 404
    if (!car) {
      return res.status(404).json({ error: 'Car niet gevonden' });
    }

    // 5. Gevonden? Stuur terug!
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST nieuwe workout
export const createCar = async (req, res) => {
  const { name, model, trim, bodyType, doors, fuel, transmission, price, milage } = req.body;

  try {
    const car = await Car.create({
      name,
      model,
      trim,
      bodyType,
      doors,
      fuel,
      transmission,
      price,
      milage,
      userId: req.user._id
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH workout (aanpassen)
export const updateCar = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige car ID' });
  }

  try {
    const { name, model, trim, bodyType, doors, fuel, transmission, price, milage } = req.body;
    const car = await Car.findByIdAndUpdate(
      id,
      { name, model, trim, bodyType, doors, fuel, transmission, price, milage },
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ error: 'Car niet gevonden' });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE workout (verwijderen)
export const deleteCar = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige car ID' });
  }

  try {
    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ error: 'Car niet gevonden' });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default Car;
