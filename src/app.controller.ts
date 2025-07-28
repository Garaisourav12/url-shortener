import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ISuccessResponse } from './common/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEntry(): ISuccessResponse {
    return this.appService.getEntry();
  }

  @Get('/check-health')
  checkHealth(): ISuccessResponse {
    return this.appService.getHealth();
  }
}
