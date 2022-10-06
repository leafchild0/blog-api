import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { createGeneralExceptionError } from './errors';
import { GeneralErrorShape } from './errors';
import { Request, Response } from 'express';

/**
 * Catch all-errors-filter
 */

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(
    err: Error | GeneralErrorShape | HttpException,
    host: ArgumentsHost,
  ): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const error = createGeneralExceptionError(err);

    this.logger.log({ request, response, error });

    response.status(error.statusCode).json(error);
  }
}
