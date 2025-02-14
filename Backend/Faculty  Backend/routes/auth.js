const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const connection = require('../db/connection');

// Faculty login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if faculty exists
    connection.query('SELECT * FROM Faculty WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const faculty = results[0];
        console.log(results[0]);
        

        // Compare passwords
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            facultyId: faculty.facultyId,
            name: faculty.firstName+faculty.lastName,
            email: faculty.email,
            roleId: faculty.roleId
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, faculty: payload });
        });
    });
});

module.exports = router;
