const router = require('express').Router();
const User = require('./user.model');

/**
 * GET /list
 * Get a list of all users.
 */
router.get('/', async (req, res, next) => {
    try {
        let result = await User.getAllUsers();
        return res.json(result);
    }
    catch (err) {
        return res.status(400).json({ status: 'Error', msg: err.message });
    }
});

module.exports = router;