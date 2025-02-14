const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const auth = require('../middleware/authMiddleware'); // Import JWT Middleware

// Protected Route: Get Faculty by ID (Only accessible with JWT)
router.get('/getFacultyById/:id', auth, (req, res) => {
    connection.query('SELECT * FROM Faculty WHERE facultyId = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

module.exports = router;
