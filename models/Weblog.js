const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Weblog extends Model {}

Weblog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
         type: DataTypes.STRING,
         allowNull: false,
    }
},{
    sequelize
});

module.exports = Weblog;