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
    }
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



// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   name: Sequelize.STRING,
//   id_shop: Sequelize.INTEGER
// });

// module.exports = product;





// const { Model } = require('sequelize');
// const sequelize = require('../utils/database');

// class product extends Model {

//     get fullName() {
//         return `product ${this.name} from Shop ${this.id}`;
//     }

//     static init(sequelize) {
//         super.init({
//             id: {
//                 type: Sequelize.INTEGER, 
//                 primaryKey: true, 
//                 autoIncrement: true,
//                 allowNull: false
//             },
//             name: Sequelize.STRING,
//             id_shop: Sequelize.INTEGER
//         }, { sequelize })
//     }

//     static associate(models) {
//         this.myAssociation = this.belongsTo(models.OtherModel);
//         // or
//         this.myAssociation = models.MyModel.belongsTo(models.OtherModel);
//       }
// }

// module.exports = product;
