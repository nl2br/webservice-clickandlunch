'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ShopCategory', [
      {
        name: 'Japonais',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Français',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italien',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BIO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ShopCategory', null, {});
  }
};