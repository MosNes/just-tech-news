const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model

class User extends Model { }

User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            //NOT NULL
            allowNull: false,
            //set as primary key
            primaryKey: true,
            //turn on auto-increment
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //do not allow duplicate values
            unique: true,
            // if allowNull is set to false, you can use validators
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //must be at least 8 chars long
                len: [4]
            }
        }
    },
    {
        //table config goes here https://sequelize.org/v5/manual/models-definition.html#configuration

        //pass in imported sequelize connection
        sequelize,
        //don't auto create timestamps
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camelCase
        underscored: true,
        //force model name to stay lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;