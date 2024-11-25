/** @type {import('sequelize-cli').Migration} */
import * as bcrypt from 'bcrypt';
import { loadEnvironmentVariables } from 'src/env-file';

loadEnvironmentVariables();

const adminEmail = process.env.ADMIN_EMAIL;
if (!adminEmail) {
  throw new Error('ADMIN_EMAIL environment variable is not defined');
}

module.exports = {
  async up(queryInterface) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD environment variable is not defined');
    }

    const salt = await bcrypt.genSalt(10); // 10 is the cost factor
    const password = await bcrypt.hash(adminPassword, salt);

    return queryInterface.bulkInsert(
      'User',
      [
        {
          id: 'db2746ea-5ffc-49f5-b760-24d530c57e55',
          firstName: 'Geo',
          lastName: 'TAM',
          email: adminEmail,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        ignoreDuplicates: true,
      },
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('User', null, {
      where: {
        email: adminEmail,
      },
    });
  },
};
