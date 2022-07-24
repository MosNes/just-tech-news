const router = require('express').Router();
const { Post, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');

//get all posts
router.get('/', (req, res) => {
    console.log('===================');
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            //user raw MySQL aggregate function query to get a count of how many votes
            //the post has and return it under the name 'vote_count'
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                'vote_count'
            ]
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get single post by id
router.get('/:id', (req, res) => {
    console.log('========================');
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            //user raw MySQL aggregate function query to get a count of how many votes
            //the post has and return it under the name 'vote_count'
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                'vote_count'
            ]
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
       })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create a post
router.post('/', (req, res) => {
    //expects {title: 'This is a title', post_url: 'https://domain.com/stuff', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

//add vote to post, has to come before PUT /:id route or else Express will think 'upvote' is the ID
router.put('/upvote', (req, res) => {
    //custom static method created in models/Post.js

    Post.upvote(req.body, { Vote })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//update post title
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(400).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;