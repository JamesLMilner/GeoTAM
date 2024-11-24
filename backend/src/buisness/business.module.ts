import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Business } from './business.model';
import { BusinessController } from './buisness.controller';

@Module({
  imports: [SequelizeModule.forFeature([Business])],
  providers: [BusinessService],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule {}
