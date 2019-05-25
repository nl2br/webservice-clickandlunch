const ValidationRegexp = require('../utils/validationRegex');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {

  let User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(), // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(), // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.phone()
      },
      field: 'phone_number',
    },
    email: {
      type: DataTypes.STRING,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5,1024]
      }
    },
    role: {
      type: DataTypes.ENUM, 
      values: ['VENDOR', 'CUSTOMER', 'ADMIN'],
      allowNull: false
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },{
    tableName: 'user'
  });

  /**
   * @method generateAuthToken
   * @return {Object} the token and some user informations
   */
  User.prototype.generateAuthToken = function() {

    const payload = {
      id: this.id,
      email: this.email,
      role: this.role
    };
    
    const key = config.jwtPrivateKey;
    const token = jwt.sign(payload, key);

    return token;
  };

  return User;

};

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 *         enum:
 *           - ADMIN
 *           - CUSTOMER
 *           - VENDOR
 *       deleted:
 *        type: boolean
 *        default: false
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 */