import { Injectable } from '@nestjs/common';
import { ISuccessResponse } from './common/types';

@Injectable()
export class AppService {
  getEntry(): ISuccessResponse {
    return {
      success: true,
      message: 'Welcome to the URL Shortener API!',
      data: null,
      statusCode: 200,
    };
  }

  getHealth(): ISuccessResponse {
    return {
      success: true,
      message: 'Application is healthy',
      data: {
        uptime: `${process.uptime().toFixed(2)}s`,
        timestamp: new Date().toISOString(),
      },
      statusCode: 200,
    };
  }
}
