export interface ISuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
  statusCode?: number;
}

export interface IErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
}
