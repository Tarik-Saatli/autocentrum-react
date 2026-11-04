// src/models/Workout.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor workout
const carSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  milage: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  trim: {
    type: String,
    required: true,
    trim: true
  },
  bodyType: {
    type: String,
    required: true
  },
  doors: {
    type: Number,
    required: true,
    min: 2,
    max: 5
  },
  fuel: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Model = object voor maken/ophalen/aanpassen/verwijderen
export const Car = mongoose.model('Car', carSchema);
