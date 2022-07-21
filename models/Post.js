const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create post model
class Post extends Model {}

// create fields and columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
    }
)