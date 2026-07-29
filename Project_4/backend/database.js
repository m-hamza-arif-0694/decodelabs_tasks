const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite Database (creates file if it doesn't exist)
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database Connection Error:', err.message);
    } else {
        console.log('🔗 Connected to the SQLite digital vault.');
    }
});

// Create Schema with Integrity Constraints (Project 3 blueprint)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            age INTEGER CHECK (age >= 18)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating schema:', err.message);
        } else {
            console.log('🛡️ Users table schema verified with integrity constraints.');
        }
    });
});

module.exports = db;