import mongoose from 'mongoose';

const legacyImportSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  importedCount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const LegacyImport = mongoose.model('LegacyImport', legacyImportSchema);
