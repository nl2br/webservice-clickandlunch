/**
 * @module Models/Product
 */

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$', // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$', // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,250] // only allow values with length between x and y
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        is: '^[0-9]+([.,][0-9]{2})?$',
        notEmpty: true
      }
    },
    product_type: {
      type: DataTypes.ENUM,
      values: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
    },
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
    // Product.hasMany(models.Product, { 
    //   foreignKey: 'menu_id',
    //   as: 'Menu'
    // });
    Product.belongsToMany(models.Product, { 
      as: 'products',
      foreignKey: 'menu_id',
      through: 'menu',
      // otherKey: 'product_id'
    });
  };

  return Product;

}

/**
 * @swagger
 * definition:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: text
 *       price:
 *         type: decimal
 *       productType:
 *         type: string
 *         enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *       shop_id:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   Menu:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: text
 *       price:
 *         type: decimal
 *       productType:
 *         type: string
 *         enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *       shop_id:
 *         type: integer
 *       listProducts:
 *         type: array
 *         items:
 *           type: integer
 */