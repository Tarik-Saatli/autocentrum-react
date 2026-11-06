import { Car } from '../models/Car.js';
import { LegacyImport } from '../models/LegacyImport.js';
import mongoose from 'mongoose';
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import uploadsDirectory from '../middleware/carImageUpload.js';

const getUploadedImagePaths = req => (req.files ?? []).map(file => `/uploads/${file.filename}`);

const removeUploadedFiles = async files => {
  await Promise.all(files.map(file => unlink(file.path)));
};

const removeStoredImages = async imagePaths => {
  await Promise.all(imagePaths.map(imagePath => {
    const filename = path.basename(imagePath);
    return unlink(path.join(uploadsDirectory, filename));
  }));
};

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

export const getLegacyImportStatus = async (req, res) => {
  try {
    const legacyImport = await LegacyImport.findOne({ key: 'vehicle-listings-v1' });
    res.status(200).json({
      imported: Boolean(legacyImport),
      importedCount: legacyImport?.importedCount ?? 0
    });
  } catch (error) {
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
  const { name, model, trim, bodyType, doors, fuel, transmission, price, milage, year, groups } = req.body;

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
      year,
      groups,
      images: getUploadedImagePaths(req),
      userId: req.user._id
    });

    res.status(201).json(car);
  } catch (error) {
    try {
      await removeUploadedFiles(req.files ?? []);
    } catch (cleanupError) {
      console.error('Geüploade autofoto opruimen mislukt:', cleanupError.message);
    }
    res.status(400).json({ error: error.message });
  }
};

export const importLegacyCars = async (req, res) => {
  const migrationKey = 'vehicle-listings-v1';
  const listings = req.body?.listings;

  if (!Array.isArray(listings) || listings.length === 0 || listings.some(listing =>
    !listing?.id || !listing.make || !listing.model || !listing.trim
  )) {
    return res.status(400).json({ error: 'De bestaande advertenties zijn ongeldig.' });
  }

  try {
    const previousImport = await LegacyImport.findOne({ key: migrationKey });
    if (previousImport) {
      return res.status(200).json({
        alreadyImported: true,
        imported: previousImport.importedCount
      });
    }

    const cars = await Promise.all(listings.map(listing => Car.findOneAndUpdate(
      { legacyId: listing.id },
      {
        $setOnInsert: {
          name: listing.make,
          model: listing.model,
          trim: listing.trim,
          year: listing.year ?? null,
          milage: listing.mileage ?? null,
          fuel: listing.fuel,
          transmission: listing.transmission,
          price: listing.price,
          legacyId: listing.id,
          groups: listing.groups ?? [],
          userId: req.user._id
        }
      },
      { new: true, upsert: true, runValidators: true }
    )));

    try {
      await LegacyImport.create({ key: migrationKey, importedCount: cars.length });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }

    const completedImport = await LegacyImport.findOne({ key: migrationKey });
    res.status(200).json({
      alreadyImported: cars.length === 0,
      imported: completedImport.importedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { name, model, trim, bodyType, doors, fuel, transmission, price, milage, year } = req.body;
    let removedImages = [];
    if (req.body.removeImages) {
      removedImages = JSON.parse(req.body.removeImages);
      if (!Array.isArray(removedImages) || removedImages.some(image => typeof image !== 'string')) {
        await removeUploadedFiles(req.files ?? []);
        return res.status(400).json({ error: 'De lijst met te verwijderen foto’s is ongeldig.' });
      }
    }

    const existingCar = await Car.findById(id);
    if (!existingCar) {
      await removeUploadedFiles(req.files ?? []);
      return res.status(404).json({ error: 'Car niet gevonden' });
    }

    const imagesToRemove = existingCar.images.filter(image => removedImages.includes(image));
    const images = [
      ...existingCar.images.filter(image => !imagesToRemove.includes(image)),
      ...getUploadedImagePaths(req),
    ];
    if (images.length > 8) {
      await removeUploadedFiles(req.files ?? []);
      return res.status(400).json({ error: 'Je kunt maximaal 8 foto’s per auto bewaren.' });
    }

    const car = await Car.findByIdAndUpdate(
      id,
      { name, model, trim, bodyType, doors, fuel, transmission, price, milage, year, images },
      { new: true, runValidators: true }
    );

    if (!car) {
      await removeUploadedFiles(req.files ?? []);
      return res.status(404).json({ error: 'Car niet gevonden' });
    }

    try {
      await removeStoredImages(imagesToRemove);
    } catch (error) {
      console.error('Verwijderde autofoto opruimen mislukt:', error.message);
    }

    res.status(200).json(car);
  } catch (error) {
    if (error instanceof SyntaxError) {
      await removeUploadedFiles(req.files ?? []);
      return res.status(400).json({ error: 'De lijst met te verwijderen foto’s is ongeldig.' });
    }
    try {
      await removeUploadedFiles(req.files ?? []);
    } catch (cleanupError) {
      console.error('Geüploade autofoto opruimen mislukt:', cleanupError.message);
    }
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

    try {
      await removeStoredImages(car.images);
    } catch (error) {
      console.error('Autofoto opruimen mislukt:', error.message);
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default Car;
