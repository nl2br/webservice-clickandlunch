'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product', [
      {
        name: 'salade chevre',
        description: 'description salade chèvre',
        price: '4.90',
        productType: 'DISH',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'salade papaye',
        description: 'description salade papaye',
        price: '4.90',
        productType: 'DISH',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'menu salades',
        description: 'description salade papaye et salade chèvre',
        price: '7.90',
        productType: 'MENU',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'soupe de biche',
        description: 'description soupe de biche',
        price: '4.90',
        productType: 'DISH',
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'charcuterie de saison',
        description: 'description charcuterie de saison',
        price: '12.90',
        productType: 'DISH',
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pizza du chef',
        description: 'description pizza du chef',
        price: '9.90',
        productType: 'DISH',
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'assiette gothique',
        description: 'description assiette gothique',
        price: '8.90',
        productType: 'DISH',
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product', null, {});
  }
};