import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlShortenerService } from './url-shortener.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { ISuccessResponse } from 'src/common/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('URL Shortener')
@Controller('api')
export class UrlShortenerController {
  constructor(private readonly urlService: UrlShortenerService) {}

  @Post('shorten')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'URL shortened successfully',
    schema: {
      example: {
        originalUrl: 'https://www.example.com/a-very-long-url-to-shorten',
        shortUrl: 'http://localhost:3000/r/your-unique-code',
      },
    },
  })
  async shortenUrl(
    @Body() dto: CreateUrlDto,
    @Req() req: Request & any,
  ): Promise<ISuccessResponse> {
    const data = await this.urlService.createShortUrl(dto, req);
    return {
      success: true,
      message: 'URL shortened successfully',
      data,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('stat/:shortCode')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'URL analytics fetched successfully',
    schema: {
      example: {
        originalUrl: 'https://www.example.com/a-very-long-url-to-shorten',
        shortUrl: 'http://localhost:3000/r/your-unique-code',
        clicks: 15,
      },
    },
  })
  async getStats(
    @Param('shortCode') shortCode: string,
    @Req() req: Request & any,
  ): Promise<ISuccessResponse> {
    const data = await this.urlService.getStats(shortCode, req);
    console.log(data);
    return {
      success: true,
      message: 'URL analytics fetched successfully',
      data,
      statusCode: HttpStatus.OK,
    };
  }
}
