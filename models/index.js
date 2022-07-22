//this index collects all models into a single file to be easily imported into another file

const User = require('./User');
const Post = require('./Post');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };