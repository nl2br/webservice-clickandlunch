'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shop', [
      {
        name: 'Les grands gamins',    
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'atesdsqt@test5.com',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-1.689636 48.109745)'),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'oh ma biche',    
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'atesdsqt@test4.com',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-1.687571 48.110186)'),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'del arte',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'atesfdst@test3.com',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-1.675866 48.083555)'),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'les gauthetik',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'atefdssdsqt@test3.com',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-1.684577 48.152134)'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shop', null, {});
  }
};