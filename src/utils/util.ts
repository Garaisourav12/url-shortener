import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { IErrorResponse } from 'src/common/types';

export function nestError(
  error: unknown,
  message = 'Something went wrong',
): HttpException {
  if (error instanceof HttpException) {
    throw error;
  }

  throw new InternalServerErrorException(message);
}

export function handleErrorResponse(error: HttpException): IErrorResponse {
  return {
    success: false,
    message: error.message,
    error: error.message,
    statusCode: error.getStatus(),
  };
}
