'use strict';
const ValidationRegexp = require('../utils/validationRegex');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shop', {
      shopId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: ValidationRegexp.name(),
          notEmpty: true, // don't allow empty strings
          len: [3,25] // only allow values with length between x and y
        }
      },
      siret: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [14,14],
          isNumeric: true
        }
      },
      siren: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [9,9],
          isNumeric: true
        }
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: ValidationRegexp.phone()
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'A user with this email already exists.',
        },
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      location: {
        // OpenStreetMap est basé sur des mesures GPS 
        // et est donc capable de détecter et de lire le système WGS84.
        // Ce système est référencé 4326 en deux dimensions (X,Y) => longitude, latitude
        // mesuré en mètres 
        type: Sequelize.GEOMETRY('POINT', 4326), 
        allowNull: false,
        validate: {
          // is: '[0-9][x][0-9]{50}'
          min: -180,
          max: 180
        }
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE(6),
      updatedAt: Sequelize.DATE(6)
    })
      .then( () => {
        return queryInterface.addConstraint('shop', ['email'], {
          type: 'unique',
          name: 'email'
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shop');
  }
};