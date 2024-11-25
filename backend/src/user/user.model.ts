import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model {
  @Column({
    type: DataTypes.UUID, // UUID type
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID (version 4)
    primaryKey: true, // Set as the primary key
    allowNull: false,
  })
  id: number;

  @Column({
    field: 'firstName',
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    field: 'lastName',
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: string;
}
