const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

//default route
router.get('/', (req, res) => {

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

module.exports = router;