import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { Feature, Polygon } from 'geojson';
import { calculateEstimateTurnover } from './calculate-estimate-turnover';
import { AuthenticatedGuard } from '../auth/auth.guard';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('business')
  async checkAuth(@Body() areaOfInterest: Feature<Polygon>) {
    const businesses =
      await this.businessService.findAllWithPolygon(areaOfInterest);

    const geoJsonBusinesses = businesses.map((business) => ({
      type: 'Feature',
      id: business.id,
      geometry: business.location,
      properties: {
        address: business.address,
        estimatedTurnover: calculateEstimateTurnover(business),
      },
    }));

    return {
      type: 'FeatureCollection',
      features: geoJsonBusinesses,
    };
  }
}
