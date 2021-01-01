'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms', [
      {
        name: 'Fitness First',
        type: 'fitness',
        phone: '0901112222',
        status: 'availability',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  },
};
