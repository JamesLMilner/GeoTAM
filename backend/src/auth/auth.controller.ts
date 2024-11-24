import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { BasicHTTPAuthGuard } from './basic-http.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller()
export class AuthController {
  @UseGuards(AuthenticatedGuard)
  @Get('auth/check')
  checkAuth() {
    return {
      message: 'Authenticated',
    };
  }

  @UseGuards(BasicHTTPAuthGuard)
  @Post('auth/login')
  async login() {
    console.log('AuthController.login');
    return;
  }

  @Post('auth/logout')
  async logout(@Request() req) {
    await req.session.destroy();
  }
}
