require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_targo_key';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.userId = decoded.id;
        next();
    });
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        const [existing] = await db.query('SELECT * FROM targo_users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ error: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO targo_users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM targo_users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'Invalid email or password' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// --- REQUESTS ROUTES ---

app.post('/api/requests', verifyToken, async (req, res) => {
    try {
        const { service_type, location, vehicle } = req.body;
        await db.query('INSERT INTO targo_requests (user_id, service_type, location, vehicle) VALUES (?, ?, ?, ?)', [req.userId, service_type, location, vehicle]);
        res.status(201).json({ message: 'Request created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create request' });
    }
});

app.get('/api/requests', verifyToken, async (req, res) => {
    try {
        const [requests] = await db.query('SELECT * FROM targo_requests WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

const path = require('path');

// --- SERVE FRONTEND (PRODUCTION) ---
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all handler for any request that doesn't match an API route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
