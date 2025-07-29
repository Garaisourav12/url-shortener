// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      status = exception.getStatus();
      if (typeof res === 'string') {
        message = error = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as any;
        message = r.message || message;
        error = r.error || message;
      }
    }

    response.status(status).json({
      success: false,
      message,
      error,
      statusCode: status,
    });
  }
}
