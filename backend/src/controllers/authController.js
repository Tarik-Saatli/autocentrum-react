import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper functie om token te maken
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// LOGIN - bestaande gebruiker inloggen
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check of velden ingevuld zijn
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        // Zoek gebruiker
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                error: 'Email of wachtwoord incorrect' 
            });
        }

        // Check wachtwoord
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ 
                error: 'Email of wachtwoord incorrect' 
            });
        }

        // Maak token
        const token = createToken(user._id);

        // Stuur token terug
        res.status(200).json({ email: user.email, role: user.role || 'user', token });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};