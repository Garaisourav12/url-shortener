import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDtoTs } from './dto/register.dto.ts';
import { LoginDtoTs } from './dto/login.dto.ts';
import { ISuccessResponse } from 'src/common/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  configService: ConfigService;
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    this.configService = configService;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: RegisterDtoTs): Promise<ISuccessResponse> {
    const data = await this.authService.register(dto);
    return {
      success: true,
      message: 'User registered successfully',
      data,
      statusCode: 201,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true })
    res: Response & {
      cookie: (key: string, value: string, options?: CookieOptions) => void;
    },
    @Body() dto: LoginDtoTs,
  ): Promise<ISuccessResponse> {
    const data = await this.authService.login(dto);

    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: nodeEnv !== 'development',
      sameSite: nodeEnv === 'development' ? 'none' : 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      success: true,
      message: 'User logged in successfully',
      data,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response & any,
  ): Promise<ISuccessResponse> {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: nodeEnv !== 'development',
      sameSite: nodeEnv === 'development' ? 'none' : 'strict',
    });

    return {
      success: true,
      message: 'User logged out successfully',
      data: null,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verifyToken')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Req() req: Request & { user: { userId: string } },
  ): Promise<ISuccessResponse> {
    const userId = req.user.userId;
    const data = await this.authService.getProfile(userId);
    return {
      success: true,
      message: 'Token verified successfully',
      data,
      statusCode: HttpStatus.OK,
    };
  }
}
