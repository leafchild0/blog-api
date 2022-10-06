import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export interface GeneralErrorShape {
  message: string;
  description?: string;
  statusCode?: HttpStatus;
}

export const exceptionFactory = (errors: ValidationError[]): unknown => errors;

export const Errors = {
  UNKNOWN_ERROR: {
    message: 'An unknown error occurred',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};

export function createGeneralExceptionError(
  error: Error | HttpException | GeneralErrorShape,
): GeneralErrorShape {
  if (!error) {
    return Errors.UNKNOWN_ERROR;
  }

  if (error instanceof HttpException) {
    const errorResponse = error.getResponse() as any;
    return {
      message: errorResponse?.message || error.message,
      statusCode: errorResponse?.errorInfo?.statusCode || error.getStatus(),
      ...(errorResponse?.description && {
        description: errorResponse.description,
      }),
    };
  }

  return {
    ...Errors.UNKNOWN_ERROR,
    message: error.message,
  };
}
