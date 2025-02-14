const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/assignments', (req, res) => {
    connection.query('SELECT * FROM StudentAssignments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/gradeAssignment', (req, res) => {
    const { stdAssignId, grade } = req.body;
    connection.query('UPDATE StudentAssignments SET grade = ? WHERE stdAssignId = ?', [grade, stdAssignId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Assignment graded successfully' });
    });
});

module.exports = router;
