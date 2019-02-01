module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: 'shop_id'
    });
  };

  return Shop;
};

/**
 * @swagger
 * definition:
 *   Shop:
 *     properties:
 *       shop_id:
 *         type: integer
 *       name:
 *         type: string
 */

// Automatic functions

// addProduct
// addProducts
// countProducts
// createProduct
// getProducts
// hasProduct
// hasProducts
// removeProduct
// removeProducts
// setProducts

// async function test() {
//   const shop = await Models.Shop.create({name: 'Armenian Shop'});
//   const product1 = await Models.Product.create({name: 'kumkuat', shop_id: + shop.get('shop_id') });
//   const product2 = await Models.Product.create({name: 'kumkuat 2', shop_id: + shop.get('shop_id') });
//   shop.setProducts([product1,product2])
//   shop.getProducts().then( products => {
//     products.forEach(product => {
//       console.log(product.dataValues)
//     });
//   })
// }
// test();


