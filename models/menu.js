/**
 * @module Models/Menu
 */

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Menu = sequelize.define('Menu', {
    menuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  },{
    tableName: 'menu'
  });

  Menu.removeAttribute('id');

  // Class Method
  Menu.associate = function (models) {

    Menu.belongsTo(models.Product, { // add product_id to menu
      foreignKey: 'productId',
      onDelete: 'CASCADE' // when deleting a product, delete all menu
    });

  };

  return Menu;
};