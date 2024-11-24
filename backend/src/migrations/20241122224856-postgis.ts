'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS postgis',
    );
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS postgis');
  },
};
