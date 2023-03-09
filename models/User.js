const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
   },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[8]
        },
    }
},{
    sequelize,
    hooks:{
        beforeCreate: (userObj) =>{
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports = User;