'use strict';
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const password = '123456';
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
const hashedPassword = bcryptjs.hashSync(password, salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('partners', [
      {
        email: 'first@gmail.com',
        password: hashedPassword,
        company_name: 'Fitness First',
        company_type: 'Fitness',
        phone: '0991112222',
        closeDate: ['Sat'],
        openTime: '07:00',
        closeTime: '21:00',
        status: 'Availability',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('partners', null, {});
  },
};
