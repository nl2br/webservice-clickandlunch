const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

// let logConsoleSequelize = process.env.NODE_ENV === 'test' ? true : false;
let logConsoleSequelize = process.env.NODE_ENV === 'test' ? false : false;

let sequelize;
// on initialize sequelize avec postgres si ENV = herokuprod sinon avec MySQL
if(config.use_env_variable){
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    {
      dialect: postgres,
      define: { 
        timestamps: true, 
        freezeTableName: true, 
        underscored: false
      },
      timezone: 'Europe/Paris',
      logging: logConsoleSequelize
    }
  );
}else{
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      dialect: config.dialect,
      host: config.host,
      port: config.port,
      define: { 
        timestamps: true, 
        freezeTableName: true, 
        underscored: false
      },
      timezone: 'Europe/Paris',
      logging: logConsoleSequelize
    }
  );
  
  console.log(`Connected to "${config.database}" database`);
}

console.log(`ENV to "${process.env.NODE_ENV}"`);
  


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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
