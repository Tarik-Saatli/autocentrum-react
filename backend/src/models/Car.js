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
    type: Number
  },
  year: {
    type: Number,
    min: 1886
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
    type: String
  },
  doors: {
    type: Number,
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
  legacyId: {
    type: String,
    unique: true,
    sparse: true
  },
  groups: [{
    title: {
      type: String,
      required: true
    },
    details: {
      type: [String],
      default: []
    }
  }],
  images: {
    type: [String],
    default: []
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
