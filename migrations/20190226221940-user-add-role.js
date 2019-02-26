'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'user',
      'role',
      { type: Sequelize.ENUM('ADMIN', 'VENDOR', 'CUSTOMER') }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'user',
      'role'
    );
  }
};
