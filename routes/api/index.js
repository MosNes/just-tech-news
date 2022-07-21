const router = require('express').Router();

const userRoutes = require('./user-routes.js');

// use userRoutes endpoints for all /users/ requests
router.use('/users', userRoutes);

module.exports = router;