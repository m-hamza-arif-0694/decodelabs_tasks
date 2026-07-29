const express = require('express');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. CREATE (POST -> SQL INSERT)
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;
    
    // Using Parameterized Query to prevent SQL Injection (The Shield)
    const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, age], function(err) {
        if (err) {
            // This catches constraint failures (UNIQUE email, CHECK age >= 18)
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { id: this.lastID, name, email, age }
        });
    });
});

// 2. READ (GET -> SQL SELECT)
app.get('/api/users', (req, res) => {
    const sql = `SELECT * FROM users`;
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

// 3. UPDATE (PUT -> SQL UPDATE)
app.put('/api/users/:id', (req, res) => {
    const { name, email, age } = req.body;
    const { id } = req.params;
    
    // Parameterized update query
    const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
    db.run(sql, [name, email, age, id], function(err) {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User updated successfully' });
    });
});

// 4. DELETE (DELETE -> SQL DELETE)
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    
    // Parameterized delete query
    const sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`🧠 DecodeLabs Database Integration running on port ${PORT}`);
});
