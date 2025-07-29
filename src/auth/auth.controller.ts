import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDtoTs } from './dto/register.dto.ts';
import { LoginDtoTs } from './dto/login.dto.ts';
import { IErrorResponse, ISuccessResponse } from 'src/common/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CookieOptions } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDtoTs,
  ): Promise<ISuccessResponse | IErrorResponse> {
    const data = await this.authService.register(dto);
    return {
      success: true,
      message: 'User registered successfully',
      data,
      statusCode: 201,
    };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true })
    res: Response & {
      cookie: (key: string, value: string, options?: CookieOptions) => void;
    },
    @Body() dto: LoginDtoTs,
  ): Promise<ISuccessResponse | IErrorResponse> {
    const data = await this.authService.login(dto);

    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      success: true,
      message: 'User logged in successfully',
      data,
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verifyToken')
  async verifyToken(
    @Req() req: Request & { user: { userId: string } },
  ): Promise<ISuccessResponse | IErrorResponse> {
    const userId = req.user.userId;
    const data = await this.authService.getProfile(userId);
    return {
      success: true,
      message: 'Token verified successfully',
      data,
      statusCode: 200,
    };
  }
}
