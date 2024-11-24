/** @type {import('sequelize-cli').Migration} */

import { Sequelize } from 'sequelize';

const fakeBuisnessUUID = 'e4b111c0-b7c5-4775-8f9a-efe454a7ea2e';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Business', [
      {
        id: fakeBuisnessUUID,
        address: 'Fake Business, 123 Fake Street, Fake City',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(-2.244644 53.483959)'),
        rateableValue: 7300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Business', null, {
      where: {
        id: fakeBuisnessUUID,
      },
    });
  },
};
