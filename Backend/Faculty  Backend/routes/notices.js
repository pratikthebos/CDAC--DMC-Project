const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/notices', (req, res) => {
    connection.query('SELECT * FROM Notices', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/notices', (req, res) => {
    const { courseId, noticeText, facultyId, roleId } = req.body;
    connection.query('INSERT INTO Notices (courseId, noticeText, facultyId, roleId) VALUES (?, ?, ?, ?)',
        [courseId, noticeText, facultyId, roleId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Notice added successfully' });
        });
});

module.exports = router;
