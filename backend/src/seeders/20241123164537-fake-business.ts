/** @type {import('sequelize-cli').Migration} */

import { Sequelize } from 'sequelize';
import { loadEnvironmentVariables } from './helpers/env-file';

loadEnvironmentVariables();

const fakeBuisnessUUID = 'e4b111c0-b7c5-4775-8f9a-efe454a7ea2e';

module.exports = {
  async up(queryInterface) {
    if (process.env.SEED_FAKE_BUSINESS === 'true') {
      return queryInterface.bulkInsert('Business', [
        {
          id: fakeBuisnessUUID,
          address: 'Fake Business, 123 Fake Street, Fake City',
          location: Sequelize.fn(
            'ST_GeomFromText',
            'POINT(-2.244644 53.483959)',
          ),
          voaRateableValue: 7300,
          voaCategory: 'INDUSTRIAL_GENERAL',
          floorAreaSquareMeters: 124.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    if (process.env.SEED_FAKE_BUSINESS === 'true') {
      return queryInterface.bulkDelete('Business', null, {
        where: {
          id: fakeBuisnessUUID,
        },
      });
    }
  },
};
