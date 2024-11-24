import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicHTTPStrategy } from './basic-http.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, BasicHTTPStrategy, SessionSerializer],
})
export class AuthModule {}
