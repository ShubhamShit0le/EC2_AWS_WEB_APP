const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Marvel@1400',
    database: 'testdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Add user route
router.post('/add', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

// Get users route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/users.html'));
});

// API route to get user data in JSON format
router.get('/api', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
