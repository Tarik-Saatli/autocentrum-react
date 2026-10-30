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

