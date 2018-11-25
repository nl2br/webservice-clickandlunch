const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Dishe = sequelize.define('dishe', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    shop_id: Sequelize.INTEGER
});

module.exports = Dishe;
