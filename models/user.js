const ValidationRegexp = require('../utils/validationRegex');

module.exports = (sequelize, DataTypes) => {

  let User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        is: ValidationRegexp.name(), // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    lastname: {
      type: DataTypes.STRING,
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
      }
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
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });

  return User;

};

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       userId:
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
 *       deleted:
 *        type: boolean
 *        default: false
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 */