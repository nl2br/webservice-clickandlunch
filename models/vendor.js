module.exports = (sequelize, DataTypes) => {

  let Vendor = sequelize.define('Vendor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'shop_id',
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
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
      foreignKey: models.Shop.id
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
 *       id:
 *         type: integer
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 */