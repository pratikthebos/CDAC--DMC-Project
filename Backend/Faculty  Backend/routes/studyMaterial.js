const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/study-material', (req, res) => {
    connection.query('SELECT * FROM StudyMaterial', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/study-material', (req, res) => {
    const { fileName, subjectId, courseId, facultyId } = req.body;
    connection.query('INSERT INTO StudyMaterial (fimeName, subjectId, courseId, facultyId) VALUES (?, ?, ?, ?)',
        [fileName, subjectId, courseId, facultyId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Study material added successfully' });
        });
});

module.exports = router;
