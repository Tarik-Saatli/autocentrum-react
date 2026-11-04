import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', (req, res) => {
    res.status(403).json({ error: 'Registratie is uitgeschakeld.' });
});

// POST /api/auth/login
router.post('/login', login);

export default router;