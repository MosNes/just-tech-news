const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

//default route, loads homepage and all posts from the DB
router.get('/', (req, res) => {

    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            //include comments associated with post
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    //include the user who authored the comment
                    model: User,
                    attributes: ['username']
                }
            },
            //include the user who authored the post
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //must use .get({ plain: true }) to return a serialized version of the requested object instead of entire sequelize object
            const posts = dbPostData.map(post => post.get({ plain: true }));

            //pass array of formatted post objects into the homepage template
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//login page route
router.get('/login', (req, res) => {

    //if user is logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//view single post route
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this ID' });
                return;
            }

            //serialize the data
            const post = dbPostData.get({ plain: true });

            //pass data to template
            res.render('single-post', { post });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;