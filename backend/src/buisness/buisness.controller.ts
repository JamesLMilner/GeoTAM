import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { BusinessService } from './business.service';
import { Feature, Polygon } from 'geojson';
import { calculateEstimateTurnover } from './calculate-estimate-turnover';

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
