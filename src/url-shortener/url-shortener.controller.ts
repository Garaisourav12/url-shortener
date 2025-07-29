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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ISuccessResponse } from 'src/common/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api')
export class UrlShortenerController {
  constructor(private readonly urlService: UrlShortenerService) {}

  @Post('shorten')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shorten a new URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiCreatedResponse({
    description: 'URL shortened successfully',
    schema: {
      example: {
        success: true,
        message: 'URL shortened successfully',
        data: {
          originalUrl: 'https://www.example.com/very-long-url',
          shortUrl: 'http://localhost:3000/r/custom-alias',
          maxClicks: 10,
          expireAt: '2025-08-15T00:00:00.000Z',
        },
        statusCode: 201,
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get statistics of a shortened URL' })
  @ApiParam({
    name: 'shortCode',
    description: 'Short code or custom alias of the URL',
    example: 'short-code / custom-alias',
  })
  @ApiOkResponse({
    description: 'URL analytics fetched successfully',
    schema: {
      example: {
        success: true,
        message: 'URL analytics fetched successfully',
        data: {
          originalUrl: 'https://www.example.com/very-long-url',
          shortCode: 'custom-alias',
          shortUrl: 'http://localhost:3000/r/custom-alias',
          clicks: 5,
          maxClicks: 10,
          expireAt: '2025-08-15T00:00:00.000Z',
          active: true,
        },
        statusCode: 200,
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
