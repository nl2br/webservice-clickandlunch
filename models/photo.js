
/**
 * @module Models/Photo
 */

module.exports = (sequelize, DataTypes) => {

  let Photo = sequelize.define('Photo', {
    photoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'photo_id'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'shop_id'
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'product_id'
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'photo',
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.Shop, { // add shop_id to Photo
      foreignKey: 'shop_id',
      onDelete: 'CASCADE' // when deleting a shop, delete all his photo
    });
    Photo.belongsTo(models.Product, { // add shop_id to Photo
      foreignKey: 'product_id',
      onDelete: 'CASCADE' // when deleting a shop, delete all his photo
    });
  };

  return Photo;

};


/**
 * @swagger
 * definition:
 *  Photo:
 *    properties:
 *      shopId:
 *        type: number
 *      url:
 *        type: string
 *      deleted:
 *        type: boolean
 *      createdAt:
 *        type: date
 *      updatedAt:
 *        type: date
 */
