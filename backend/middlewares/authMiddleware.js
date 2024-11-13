const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ error: 'Unauthorized' });
        }
        if (decoded != null) {
            req.userid = decoded.userid;
            next();
        }
    });
}

module.exports = authMiddleware;