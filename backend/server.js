// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import carRoutes from './src/routes/carRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Voeg deze regel toe


const app = express();
const PORT = process.env.PORT || 4000;

// CORS toestaan voor frontend — VOOR alle andere middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes); // Voeg deze regel toe


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend draait!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');

    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });