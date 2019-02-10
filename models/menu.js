/**
 * @module Models/Menu
 */

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Menu = sequelize.define('Menu', {
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    // Timestamps
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  Menu.removeAttribute('id');

  // Class Method
  Menu.associate = function (models) {

    Menu.belongsTo(models.Product, { // add product_id to menu
      foreignKey: 'product_id',
      onDelete: 'CASCADE' // when deleting a product, delete all menu
    });

  };

  return Menu;
};