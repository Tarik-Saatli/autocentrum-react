// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import User from './src/models/User.js';
import uploadsDirectory from './src/middleware/carImageUpload.js';
import carRoutes from './src/routes/carRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Voeg deze regel toe


const app = express();
const PORT = process.env.PORT || 4000;
const frontendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

// CORS toestaan voor frontend — VOOR alle andere middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(uploadsDirectory));
app.use(express.static(frontendDirectory));

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes); // Voeg deze regel toe


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend draait!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Verbonden met MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword || adminPassword.length < 6) {
      throw new Error('Stel ADMIN_EMAIL en ADMIN_PASSWORD (minimaal 6 tekens) in backend/.env in.');
    }

    await User.updateMany(
      { role: 'admin', email: { $ne: adminEmail } },
      { $set: { role: 'user' } }
    );

    const admin = await User.findOne({ email: adminEmail });
    if (admin) {
      admin.role = 'admin';
      await admin.save();
    } else {
      await User.create({ email: adminEmail, password: adminPassword, role: 'admin' });
    }

    console.log(`Adminaccount ingesteld voor ${adminEmail}`);

    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Backend starten mislukt:', error.message);
  });