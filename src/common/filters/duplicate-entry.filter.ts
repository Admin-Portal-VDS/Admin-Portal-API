import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateEntyFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const isTestEnv = process.env.NODE_ENV === 'test';
    if ((exception as any).code === '23505') {
      return response.status(409).json({
        statusCode: 409,
        message: 'Duplicate entry',
        error: isTestEnv
          ? exception
          : (exception as any).driverError?.detail || 'No additional details',
      });
    }
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: isTestEnv && exception,
    });
  }
}
