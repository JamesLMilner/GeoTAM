import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Business' })
export class Business extends Model {
  @Column({
    type: DataTypes.UUID, // UUID type
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID (version 4)
    primaryKey: true, // Set as the primary key
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // postcode: string;

  // @Column({
  //   type: DataType.STRING,
  // })
  // ratesPaid: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  voaRateableValue: number;

  // The broadest classification, such as "Retail."
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  voaCategory: string;

  // // VOA Subcategory: Groups similar property uses within a category.
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // voaSubCategory: string;

  // // VOA Name:  Specific property descriptions fall under the subcategory.
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // voaName: string;

  // // VOA SCAT Code: A unique identifier assigned to each SCAT Name. Example: Code 101 for "Clothing Stores."
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // voaCode: string;

  // // SIC Code: A four-digit code used to classify business establishments by their primary activity.
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // sicCode: string;

  // // Company Number: Companies House identifier assigned to each company.
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // companyNumber: string;

  // // Rental valuation: The estimated rental value of the property.
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // rentalValuation: string;

  // Floor area in square meters.
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  floorAreaSquareMeters: number;

  @Column({
    type: DataType.GEOMETRY('POINT'),
    allowNull: false,
  })
  location: { type: string; coordinates: [number, number] };

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
