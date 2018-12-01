module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Dishe = sequelize.define('Dishe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    id_shop: DataTypes.INTEGER
  });

  // Class Method
  Dishe.associate = function(models) {

    Dishe.belongsTo(models.Shop, {
      foreignKey: 'id_shop',
      onDelete: "CASCADE"
    });

  };


  return Dishe;

}



// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Dishe = sequelize.define('dishe', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   name: Sequelize.STRING,
//   id_shop: Sequelize.INTEGER
// });

// module.exports = Dishe;





// const { Model } = require('sequelize');
// const sequelize = require('../utils/database');

// class Dishe extends Model {

//     get fullName() {
//         return `Dishe ${this.name} from Shop ${this.id}`;
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

// module.exports = Dishe;
