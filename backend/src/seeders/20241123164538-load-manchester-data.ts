/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, Sequelize } from 'sequelize';
import { loadEnvironmentVariables } from './helpers/env-file';
import { readCSVToArray } from './helpers/read-csv';
import { v4 as uuidv4 } from 'uuid';
import { chunkArray } from './helpers/chunk-array';

loadEnvironmentVariables();

module.exports = {
  async up(queryInterface: QueryInterface) {
    const csv = await readCSVToArray(
      __dirname + process.env.SEED_BUSINESSES_PATH,
    );

    const businesses = csv
      .map(
        ({
          longitude,
          latitude,
          voapropertyaddress,
          voarateablevalue,
          voasubcategory,
          voafloorarea,
        }) => ({
          id: uuidv4(),
          address: voapropertyaddress,
          location: Sequelize.fn(
            'ST_GeomFromText',
            `POINT(${longitude} ${latitude})`,
          ),
          voaRateableValue: voarateablevalue
            ? parseInt(voarateablevalue, 10)
            : 0,
          voaCategory: voasubcategory,
          floorAreaSquareMeters: voafloorarea ? parseInt(voafloorarea, 10) : 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      )
      .filter(
        ({ voaRateableValue, voaCategory, floorAreaSquareMeters }) =>
          voaRateableValue && voaCategory && floorAreaSquareMeters,
      );

    const transaction = await queryInterface.sequelize.transaction();

    const chunks = chunkArray(businesses, 1000);

    try {
      for (const chunk of chunks) {
        await queryInterface.bulkInsert('Business', chunk, { transaction });
      }

      transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('Business', null, {});
  },
};
