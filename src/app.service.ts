import { Injectable } from '@nestjs/common';
import { ISuccessResponse } from './common/types';

@Injectable()
export class AppService {
  getEntry(): ISuccessResponse {
    return {
      success: true,
      message: 'Service is running',
      statusCode: 200,
    };
  }

  getHealth(): ISuccessResponse {
    return {
      success: true,
      message: 'Service is healthy',
      statusCode: 200,
    };
  }
}
