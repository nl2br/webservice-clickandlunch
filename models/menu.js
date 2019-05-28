/**
 * @module Models/Menu
 */

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Menu = sequelize.define('Menu', {
    menuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'menu_id',

    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'product_id',
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
    tableName: 'menu'
  });

  Menu.removeAttribute('id');

  return Menu;
};