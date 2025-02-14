const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.faculty = decoded; // Attach faculty details to request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
