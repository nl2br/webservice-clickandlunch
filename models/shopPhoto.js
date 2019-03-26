
/**
 * @module Models/ShopPhoto
 */

module.exports = (sequelize, DataTypes) => {

  let ShopPhoto = sequelize.define('ShopPhoto', {
    shopPhotoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'shop_photo_id'
    },
    url: {
      type: DataTypes.STRING
    },
    shopId: {
      type: DataTypes.INTEGER,
      field: 'shop_id'
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'shop_photo',
  });

  ShopPhoto.associate = function(models) {
    ShopPhoto.belongsTo(models.Shop, { // add shop_id to ShopPhoto
      foreignKey: 'shop_id',
      onDelete: 'CASCADE' // when deleting a shop, delete all his photo
    });
  };

  return ShopPhoto;

};


/**
 * @swagger
 * definition:
 *  ShopPhoto:
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
