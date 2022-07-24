const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    // access user model and run .findAll() method
    User.findAll({
        attribues: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET /api/users by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Post,
                attribues: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'user', email: 'user@user.com', password: 'password'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//user login route
//uses POST to send the PW as part of the request body instead of a plaintext query parameter used by GET
router.post('/login', (req, res) => {

    //expects {email: 'email@domain.com', password: 'userpassword'}

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(async dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with that email address!' });
                return;
            }

            //load hash from your password DB
            const validPassword = await dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: "Incorrect Password!" });
                return;
            }

            res.json({ user: dbUserData, message: 'You are now logged in!' });

            //verify user

        });

});

//PUT /api/users
router.put('/:id', (req, res) => {
    // expects {username: 'user', email: 'user@user.com', password: 'password'}

    //if req.body has exact key/value  pairs to match the model, you can just use 'req.body' instead
    //requires individualHooks: true to activate the beforeUpdate() hook in the User model
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(400).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE /api/users
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;