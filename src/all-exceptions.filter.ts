import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      // Optionally, add more details in development
      ...(process.env.NODE_ENV === 'development' && {
        stack: (exception as Error).stack,
        exception: exception,
      }),
    };

    this.logger.error(
      `HTTP Status: ${status} - Message: ${JSON.stringify(message)} - Path: ${request.url}`,
      (exception as Error).stack,
    );

    response.status(status).json(errorResponse);
  }
}
