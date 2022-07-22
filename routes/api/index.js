const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');

// use userRoutes endpoints for all /users/ requests
router.use('/users', userRoutes);

//use postRoutes for all /posts/ requests
router.use('/posts', postRoutes);

module.exports = router;