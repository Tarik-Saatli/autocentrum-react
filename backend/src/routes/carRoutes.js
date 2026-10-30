// src/routes/workoutRoutes.js

import express from 'express';
import { 
  getAllCars, 
  getCarById, 
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carcontroller.js';
import { requireAuth } from '../middleware/requireAuth.js';


const router = express.Router();


// Auto's bekijken is openbaar.
router.get('/', getAllCars);
router.get('/:id', getCarById);

router.post('/', requireAuth, createCar);
router.patch('/:id', requireAuth, updateCar);
router.delete('/:id', requireAuth, deleteCar);


export default router;