'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bookings', [
      {
        reserve_date: new Date(),
        status: 'pending',
        user_id: 1,
        room_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  },
};
