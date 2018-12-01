const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config.json')[env];
const db        = {};

// if (config.use_env_variable) {
//   const sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
  // const sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    define: { timestamps: false, freezeTableName: true }
  }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// Relation definition
// const Dishe = require('../models/disheModel');
// const Shop = require('../models/shopModel');
// Dishe.belongsTo(Shop, {foreignKey: 'id_shop'});
// Shop.hasMany(Dishe, {foreignKey: 'id_shop', as: 'Dishes'} );
