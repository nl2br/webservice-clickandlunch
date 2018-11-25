const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'clickandlunch', 
    'root', 
    'groot', 
    {
        dialect: "mysql",
        host: "127.0.0.1",
        port: 3306,
        define: {timestamps: false, freezeTableName: true}
    }
);

module.exports = sequelize;