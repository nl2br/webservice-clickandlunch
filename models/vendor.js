module.exports = (sequelize, DataTypes) => {

  let Vendor = sequelize.define('Vendor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'vendor'
  });

  Vendor.associate = function (models) {

    Vendor.belongsTo(models.User, {
      foreignKey: 'id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });

    Vendor.belongsTo(models.Shop, { // add shop_id to vendor
      foreignKey: 'shop_id'
    });

  };

  Vendor.removeAttribute('id');

  return Vendor;

};

/**
 * @swagger
 * definition:
 *   Vendor:
 *     properties:
 *       vendorId:
 *         type: integer
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 */