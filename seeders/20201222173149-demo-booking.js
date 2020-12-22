'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bookings', [
      {
        reserve_date: new Date(),
        type: 'Fitness',
        email: 'pom_kab@gmail.com',
        phone: '0991112222',
        user_id: 1,
        partner_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  },
};
