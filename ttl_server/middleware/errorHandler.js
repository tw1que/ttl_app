const { AuthError } = require('../services/authService');
const { OrderError } = require('../services/orderService');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the full error stack for debugging

    if (err.name === 'AuthError' || err.name === 'OrderError') {
        return res.status(err.statusCode || 400).json({ message: err.message });
    }

    // Fallback for any other errors
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
