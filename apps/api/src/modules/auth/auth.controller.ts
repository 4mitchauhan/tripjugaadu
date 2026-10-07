import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const result = await this.authService.register(body);
    return {
      status: 'success',
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  async login(@Body() body: any) {
    const result = await this.authService.login(body);
    return {
      status: 'success',
      message: 'Login successful',
      data: result,
    };
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader?: string) {
    const result = await this.authService.getMe(authHeader);
    return {
      status: 'success',
      data: result,
    };
  }
}
