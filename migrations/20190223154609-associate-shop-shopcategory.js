'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Shop belongsToMany ShopCategory
    return queryInterface.createTable(
      'ShopsCategory',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        shopId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        shopCategoryId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('ShopsCategory');
  }
};
