const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS Barrier Handling (Enables cross-origin requests & preflight OPTIONS checks)
app.use(cors());

// 2. Middleware for Parsing JSON Request Payloads (Deserialization)[cite: 6]
app.use(express.json());

/* --- RESTful API ENDPOINTS FOR USERS --- */

// GET /api/users - Read all users (Idempotent)
app.get('/api/users', (req, res) => {
    const sql = `SELECT * FROM users ORDER BY id DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(200).json({
            success: true,
            data: rows
        });
    });
});

// GET /api/users/:id - Read single user record[cite: 11]
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!row) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: row });
    });
});

// POST /api/users - Create user with validation and parameterized insert[cite: 6, 11]
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    // Gatekeeper Validation (Project 2 Pattern)[cite: 6]
    if (!name || !email || age === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Missing required fields (name, email, age).'
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Invalid email format.'
        });
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 18) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Age must be a number and at least 18.'
        });
    }

    // Parameterized Insert (Project 3 "The Shield" against SQL Injection)[cite: 11]
    const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, parsedAge], function (err) {
        if (err) {
            // Catches constraint failures (UNIQUE email, CHECK age >= 18)[cite: 11]
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { id: this.lastID, name, email, age: parsedAge }
        });
    });
});

// DELETE /api/users/:id - Delete user record[cite: 11]
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(204).send(); // 204 No Content
    });
});

// Catch-all 404 handler[cite: 6]
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Global Error Handler (500)[cite: 6]
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🧠 DecodeLabs Full-Stack System running on http://localhost:${PORT}`);
});