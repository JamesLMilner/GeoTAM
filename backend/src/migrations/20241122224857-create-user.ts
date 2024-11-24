'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('User', {
      id: {
        type: DataTypes.UUID, // UUID type
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID (version 4)
        primaryKey: true, // Set as the primary key
        allowNull: false,
      },
      firstName: {
        allowNull: false,
        type: DataType.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataType.STRING,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('User');
  },
};
