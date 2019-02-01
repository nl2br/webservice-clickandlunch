module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    shop_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Shop',
      //   key: 'shop_id'
      // }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  // Class Method
  Product.associate = function (models) {

    /**
     * Ajout d'une contrainte a produit :
     * Lorsqu'on delete un shop, ses produits associées sont supprimés
     */
    Product.belongsTo(models.Shop, { // add shop_id to product
      foreignKey: 'shop_id',
      onDelete: 'CASCADE' // when deleting a shop, delete all his product
    });
  };


  return Product;

}

/**
 * @swagger
 * definition:
 *   Product:
 *     properties:
 *       product_id:
 *         type: integer
 *       name:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 *       shop_id:
 *         type: integer
 */