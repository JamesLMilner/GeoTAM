import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';
import { User } from './user/user.model';
import { BusinessModule } from './buisness/business.module';
import { Business } from './buisness/business.model';

// Load necessary environment variables locally
const configPath = resolve(__dirname, '../.env');
const checkExists = existsSync(configPath);
if (checkExists) {
  dotenv.config({ path: configPath });
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Business],
      autoLoadModels: true,
    }),
    AuthModule,
    UserModule,
    BusinessModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
