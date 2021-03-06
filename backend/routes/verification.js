const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

module.exports = function (req, res) {
    const token = req.header('auth-token');
    if (!token) 
        return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        return verified;
        
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}