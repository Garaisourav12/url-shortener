import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ISuccessResponse } from './common/types';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Entry endpoint',
    description: 'Returns a welcome or base message for the application.',
  })
  @ApiOkResponse({
    description: 'Base entry message',
    schema: {
      example: {
        success: true,
        message: 'Welcome to the URL Shortener API!',
        data: null,
        statusCode: 200,
      },
    },
  })
  getEntry(): ISuccessResponse {
    return this.appService.getEntry();
  }

  @Get('/check-health')
  @ApiOperation({
    summary: 'Health Check',
    description:
      'Returns health status of the application to ensure it’s up and running.',
  })
  @ApiOkResponse({
    description: 'Application health status',
    schema: {
      example: {
        success: true,
        message: 'Application is healthy',
        data: { uptime: '123.456s', timestamp: '2021-01-01T00:00:00.000Z' },
        statusCode: 200,
      },
    },
  })
  checkHealth(): ISuccessResponse {
    return this.appService.getHealth();
  }
}
