const router = require('express').Router();
const authService = require('../services/authService');
const authenticateToken = require('../middleware/authenticateToken');
const asyncWrapper = require('../utils/asyncWrapper');

// registering
router.post('/register', asyncWrapper(async (req, res) => {
    const { user_name, user_password } = req.body;
    const result = await authService.registerUser(user_name, user_password);
    res.json(result);
}));

// login
router.post('/login', asyncWrapper(async (req, res) => {
    const { user_name, user_password } = req.body;
    const result = await authService.loginUser(user_name, user_password);
    res.json(result);
}));

router.get('/verify', authenticateToken, (req, res) => {
    // This endpoint is for token verification, logic is in middleware.
    res.json(req.user_id);
});

module.exports = router;