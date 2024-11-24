import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BasicHTTPStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    console.log('BasicHTTPStrategy.constructor');
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<any> {
    console.log('BasicHTTPStrategy.validate', email, password);

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('BasicHTTPStrategy.validate', user);
    return user;
  }
}
