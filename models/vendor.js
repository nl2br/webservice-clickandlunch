module.exports = (sequelize, DataTypes) => {

  let Vendor = sequelize.define('Vendor', {
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });

  Vendor.associate = function (models) {

    Vendor.belongsTo(models.User, {
      foreignKey: 'vendorId',
      targetKey: 'userId',
      onDelete: 'CASCADE'
    });

    Vendor.belongsTo(models.Shop, { // add shop_id to vendor
      foreignKey: 'shopId'
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