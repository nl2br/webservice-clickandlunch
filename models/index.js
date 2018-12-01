const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config.json')[env];
const db        = {};

// TODO faire un bon fichier de config avec les var_ENV

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
    console.log('model',model)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log('assoc !!!!!!!!!!!!!')
    db[modelName].associate(db);
  }
});
Object.keys(db).forEach(item=>{console.log(item)})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
