'use strict';

require('dotenv').config();
const bcryptjs = require('bcryptjs');
const password = '123456';
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
const hashedPassword = bcryptjs.hashSync(password, salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'pom_kab@gmail.com',
        password: hashedPassword,
        name: 'Au',
        phone: '0991112222',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
