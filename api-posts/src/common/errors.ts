import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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
  GENERAL_VALIDATION_EXCEPTION: {
    message: 'Validation error',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};

export function createGeneralExceptionError(
  error: Error | HttpException | GeneralErrorShape,
): GeneralErrorShape {
  if (!error) {
    return Errors.UNKNOWN_ERROR;
  }

  // Validation errors, will return all issues at once
  if (Array.isArray(error) && error[0] instanceof ValidationError) {
    return {
      ...Errors.GENERAL_VALIDATION_EXCEPTION,
      description: error.map((e) => Object.values(e.constraints)).toString(),
    };
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
