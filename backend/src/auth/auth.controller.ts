import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('auth/check')
  checkAuth() {
    return {
      message: 'Authenticated',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log({ signInDto });
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('auth/logout')
  async logout(@Request() req) {
    await req.session.destroy();
  }
}
