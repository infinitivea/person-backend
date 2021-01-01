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
        phone: '0991112222',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'first@gmail.com',
        password: hashedPassword,
        phone: '0901112222',
        role: 'PARTNER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '0901234567',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
