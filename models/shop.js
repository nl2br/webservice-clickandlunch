module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
  });

  Shop.associate = function (models) {
    Shop.hasMany(models.Product, {
      foreignKey: 'shop_id',
      as: { singular: 'product', plural: 'products' }
    });
  };

  return Shop;
};

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


