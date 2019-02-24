/**
 * @function truncate
 * Vider toutes les tables de la BDD pour les tests
 */
const map = require('lodash/map');
const models = require('../models');

module.exports = async function truncate() {
  console.log('truncate');
  return await Promise.all([
    models['Customer'].destroy({ where: {}, force: true }),
    // models['Menu'].destroy({ where: {}, force: true }),
    // models['OrderDetail'].destroy({ where: {}, force: true }),
    models['Product'].destroy({ where: {}, force: true }),
    models['Order'].destroy({ where: {}, force: true }),
    models['Shop'].destroy({ where: {}, force: true }),
    models['User'].destroy({ where: {}, force: true }),
  ]);

};
// module.exports = async function truncate() {
//   return await Promise.all(
//     map(Object.keys(models), (key) => {
//       if (['sequelize', 'Sequelize'].includes(key)) return null;
//       return models[key].destroy({ where: {}, force: true });
//     })
//   );
// };