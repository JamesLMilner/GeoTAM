'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Business', {
      id: {
        type: DataTypes.UUID, // UUID type
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID (version 4)
        primaryKey: true, // Set as the primary key
        allowNull: false,
      },
      address: {
        allowNull: false,
        type: DataType.STRING,
      },
      voaRateableValue: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      voaCategory: {
        allowNull: false,
        type: DataType.STRING,
      },
      floorAreaSquareMeters: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      location: {
        allowNull: false,
        type: DataType.GEOMETRY('POINT', 4326),
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Business');
  },
};
