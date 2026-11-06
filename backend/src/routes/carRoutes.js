// src/routes/workoutRoutes.js

import express from 'express';
import { 
  getAllCars, 
  getLegacyImportStatus,
  getCarById, 
  createCar,
  importLegacyCars,
  updateCar,
  deleteCar
} from '../controllers/carcontroller.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { uploadCarImages } from '../middleware/carImageUpload.js';


const router = express.Router();


// Auto's bekijken is openbaar.
router.get('/', getAllCars);
router.get('/legacy-import-status', getLegacyImportStatus);
router.get('/:id', getCarById);

router.post('/', requireAuth, uploadCarImages, createCar);
router.post('/import-legacy', requireAuth, importLegacyCars);
router.patch('/:id', requireAuth, uploadCarImages, updateCar);
router.delete('/:id', requireAuth, deleteCar);


export default router;