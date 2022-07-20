const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {});

//GET /api/users by ID
router.get('/:id', (req, res) => {});

//POST /api/users
router.post('/', (req, res) => {});

//PUT /api/users
router.put('/:id', (req, res) => {});

//DELETE /api/users
router.delete('/:id', (req, res) => {});

module.exports = router;