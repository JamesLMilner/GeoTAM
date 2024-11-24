import { Injectable } from '@nestjs/common';
import { Business } from './business.model';
import { InjectModel } from '@nestjs/sequelize';
import { Feature, Polygon } from 'geojson';
import { QueryTypes } from 'sequelize';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(Business) private businessModel: typeof Business) {}

  async findAll(): Promise<Business[] | undefined> {
    return this.businessModel.findAll();
  }

  async findAllWithPolygon(
    polygon: Feature<Polygon>,
  ): Promise<Business[] | undefined> {
    const polygonString = JSON.stringify(polygon.geometry);

    const businesses = await this.businessModel.sequelize.query<Business>(
      `
      SELECT 
        "id",
        "address",
        "rateableValue",
        ST_AsGeoJSON(location)::JSON as location
      FROM "Business"
      WHERE ST_Within(location, ST_GeomFromGeoJSON('${polygonString}'));
    `,
      {
        type: QueryTypes.SELECT,
      },
    );

    console.log(businesses);

    return businesses;
  }
}
